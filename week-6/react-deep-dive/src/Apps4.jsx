import { useState } from "react";
import { memo, useEffect, useCallback } from "react";

// useCallback used to memoize functions which can help in optimizing the performance of your application, especially in cases involving child components that rely on reference equality to prevent unnecessary renders.

// React.memo is used to optimize re-renders. If only the props passed to the component change then the re-render happens for the memoized component.

// reference equality ==> var a = {} !== var a = {} (object/functions) ==> function a() & var a are not same. so react might be confused. even though the function is not changing but they are referencially changing according to react.

// parent (re-renders) ==> child (re-renders) even though state variables that are inputs to the child didn't change ==> unless it is being wrapped in a memo.

// instead of defining as functions we can define them as variables. (let, const), in that way we can use useCallback to prevent reference unequality => re-rendering.

// two functions defined separately with same body are referencially not equal.

var a = 1;
function Apps() {
  const [counter, setCounter] = useState(0);
  var a = useCallback(() => {
    console.log("Hi World!");
  }, []);
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

const Child = memo(({ inputFunction }) => {
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
