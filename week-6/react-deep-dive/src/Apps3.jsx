import { useState } from "react";
import { useEffect, useMemo } from "react";

function Apps() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  // if we use useEffect with another state variable, then it will render two times for two state changes. useMemo is used for performing expensive operations and useEffect is for lifecycle events. useMemo for some certain scenarios lets us avoid using extra state variables. ==> memoizing values across re-renders, only recalculate when the dependency changes.(here inputValue)

  // useCallback => returns functions => memoize functions -- memoize function signature
  // useMemo => returns number/string => memoize values -- synchronous ops, async ops we use useEffect -- it can also return functions which is same as useCallback -> return () => {}

  // setCount doesn't set count value synchronously, it sets the value asynchronously. so we don't pass the value instead we pass a function c => c+1 , so that it utilises the previous current value. in case of consecutive changes we want to make.

  let counter = useMemo(() => {
    console.log("memo called");
    let summation = 0;
    for (let i = 0; i <= inputValue; i++) {
      summation += i;
    }
    return summation;
  }, [inputValue]);

  return (
    <div>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <br />
      <br />
      Sum from 1 to {inputValue} is {counter}
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>Counter ({count})</button>
    </div>
  );
}

export default Apps;
