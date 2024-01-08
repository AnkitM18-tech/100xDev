import { useState } from "react";
import { memo, useEffect, useCallback } from "react";

var a = 1;
function Apps() {
  const [counter, setCounter] = useState(0);
  var a = useCallback(() => {}, []);
  const logSomething = useCallback(() => {
    console.log("Hello");
  }, []);
  return (
    <div>
      <Child inputFunction={logSomething} />
      <button onClick={() => setCounter(counter + 1)}>Counter {counter}</button>
    </div>
  );
}

const Child = memo((logSomething) => {
  console.log("child render");

  return (
    <div>
      <button>Button Clicked</button>
    </div>
  );
});

const Demo = memo(function ({ a }) {
  return <div>hi there {a}</div>;
});

export default Apps;
