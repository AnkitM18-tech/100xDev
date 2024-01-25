import { useState, useRef } from "react";
import { memo, useEffect, useCallback } from "react";

function Apps() {
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML = "100000000";
    }, 3000);
  }, []);

  const incomeTax = 20000;

  return (
    <div>
      Your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  );
}

export default Apps;

// take current state => find diff from existing state => reconciling how the DOM should look like and put things inside DOM.
// If the state variable inside the component changes then the component re-renders.
// When we want to add some side effects - setTimeout, setInterval, fetch, DB enquiries - we use useEffect to prevent re-renders by giving some dependencies in the dependency list. If we keep dependencies list blank then it will render once when the component mounts.If we don't use useEffect then when a single state change happens the entire component keeps on re-rendering.
// It's ideal to have separate useEffect for different side effects.
// useMemo & useEffect guard running codes that needs to run on some certain state changes present in the dependency array. useEffect doesn't return anything, so can't put it in a variable, but we can do it with useMemo, since it memoize some value and returns it.
// If you ever want to memoize a function, use useCallback() - it is about not rendering a child, if the function hasn't changed across renders. => not about minimizing the amount of code that is run. ==> const a = (function() {}) => whenever we define a function like this everytime it's reference change with re-render => to prevent this we can use useCallback() instead. => functions are never equal even though their body is the same unlike variables. (const a=3; const b=3; a==b => true)
// In both useMemo and useCallback we can give dependency arrays to let react know when to re-render those portions of code.

// useRef => to manipulate the DOM element. we can get reference to the DOM elements. here => divref.current --> to get the current Reference of the specific element
