"use client";
import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { SignalingManager } from "../utils/SignalingManager";

export const MarketBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);
    SignalingManager.getInstance().registerCallback(
      "ticker",
      (data: Partial<Ticker>) =>
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        })),
      `TICKER-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);
  //

  return (
    <div>
      <div className="relative flex flex-row items-center w-full overflow-hidden border-b border-slate-800">
        <div className="flex flex-row items-center justify-between pr-4 overflow-auto no-scrollbar">
          <Ticker market={market} />
          <div className="flex flex-row items-center pl-4 space-x-8">
            <div className="flex flex-col justify-center h-full">
              <p
                className={`font-medium tabular-nums text-greenText text-md text-green-500`}
              >
                ${ticker?.lastPrice}
              </p>
              <p className="text-sm font-medium tabular-nums">
                ${ticker?.lastPrice}
              </p>
            </div>
            <div className="flex flex-col">
              <p className={`font-medium text-xs text-slate-400 text-sm`}>
                24H Change
              </p>
              <p
                className={` text-sm font-medium tabular-nums leading-5 text-sm text-greenText ${
                  Number(ticker?.priceChange) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Number(ticker?.priceChange) > 0 ? "+" : ""}{" "}
                {ticker?.priceChange}{" "}
                {Number(ticker?.priceChangePercent)?.toFixed(2)}%
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-sm font-medium text-slate-400">
                24H High
              </p>
              <p className="text-sm font-medium leading-5 tabular-nums ">
                {ticker?.high}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-sm font-medium text-slate-400">
                24H Low
              </p>
              <p className="text-sm font-medium leading-5 tabular-nums ">
                {ticker?.low}
              </p>
            </div>
            <button
              type="button"
              className="text-base font-medium text-left transition-opacity hover:opacity-80 hover:cursor-pointer"
              data-rac=""
            >
              <div className="flex flex-col">
                <p className="text-xs text-sm font-medium text-slate-400">
                  24H Volume
                </p>
                <p className="mt-1 text-sm font-medium leading-5 tabular-nums ">
                  {ticker?.volume}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Ticker({ market }: { market: string }) {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
      <div className="relative flex flex-row ml-2 -mr-4">
        <img
          alt="SOL Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="z-10 w-6 h-6 mt-4 rounded-full outline-baseBackgroundL1"
          src="/sol.webp"
        />
        <img
          alt="USDC Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="w-6 h-6 mt-4 -ml-2 rounded-full"
          src="/usdc.webp"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex flex-row items-center justify-between p-3 rounded-lg cursor-pointer hover:opacity-80">
          <div className="flex flex-row items-center gap-2 undefined">
            <div className="relative flex flex-row">
              <p className="text-sm font-medium undefined">
                {market.replace("_", " / ")}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
