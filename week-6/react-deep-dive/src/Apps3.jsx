import { useState } from "react";
import { useEffect, useMemo } from "react";

function Apps() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

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
