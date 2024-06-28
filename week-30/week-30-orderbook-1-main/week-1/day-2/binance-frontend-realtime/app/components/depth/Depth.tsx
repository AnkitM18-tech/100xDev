"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getKlines,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "@/app/utils/SignalingManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        console.log(data);
        // setBids(data.bids);
        // setAsks(data.asks);
        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];
          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                bidsAfterUpdate[i][1] = data.bids[j][1];
                break;
              }
            }
          }
          return bidsAfterUpdate;
        });
        setAsks((originalAsks) => {
          // before mutating the data, we are making a copy of the original data
          // If we take the original data and mutate it and then again return the same variable, react won't re-render as it still refers to the same object even though its contents are changed.
          // So whenever we are making changes to the original data, we make sure to copy the original data so that its reference changes.
          const asksAfterUpdate = [...(originalAsks || [])];
          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (asksAfterUpdate[i][0] === data.bids[j][0]) {
                asksAfterUpdate[i][1] = data.bids[j][1];
                break;
              }
            }
          }
          return asksAfterUpdate;
        });
      },
      `DEPTH-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.200ms.${market}`],
    });
    getDepth(market).then((d) => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    getTrades(market).then((t) => setPrice(t[0].price));
    // getKlines(market, "1h", 1640099200, 1640100800).then(t => setPrice(t[0].close));
    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
    };
  }, [market]);

  return (
    <div>
      <TableHeader />
      {asks && <AskTable asks={asks} />}
      {price && <div>{price}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}
