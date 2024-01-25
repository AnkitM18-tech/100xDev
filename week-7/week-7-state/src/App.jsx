// import { useContext, useState } from "react";
// import { CountContext } from "./context";
// import { Navigate } from "react-router-dom";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";

function App() {
  // const [count, setCount] = useState(0);
  // wrap anyone that wants to use the teleported value inside a provider
  // recoil, redux, Themes in mUI
  return (
    <RecoilRoot>
      {/* <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider> */}
      <Count />
    </RecoilRoot>
  );
}

function Count() {
  console.log("Re-render");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  // const count = useContext(CountContext);
  const count = useRecoilValue(countAtom);
  return (
    <div>
      <b>{count}</b>
      <EvenCountRenderer />
    </div>
  );
}

function EvenCountRenderer() {
  // const count = useRecoilValue(countAtom);
  // more optimal way is to use useMemo so that whenever count changes, then only the operation takes place. The same optimization is provided by selectors in recoil.
  //return <div>{count !== 0 && count % 2 === 0 ? "It is Even" : ""}</div>;
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "It is Even" : ""}</div>;
}

function Buttons() {
  // const count = useContext(CountContext);
  // here we don't want count , we just need to change the count value, and the buttons should not re-render, only the value should be re-rendered.
  // const [count, setCount] = useRecoilState(countAtom);
  const setCount = useSetRecoilState(countAtom);
  // Only fetching the setCount, not count value, it won't re-render.
  console.log("Buttons Re-render");
  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;

// context api use case --> to make syntax cleaner / get rid of prop drilling. --> not to make rendering more performant
// to make rendering more performant use state management tools.

// use Recoil State = similar to useState
// use Recoil value = only use the value, don't care about updating the value
// use Set Recoil State = set the value, don't care about the accessing the value
// Components using states need to be wrapped by RecoilRoot.
// We store states in the Lowest Common Ancestor component to minimize re-renders of components.
// So we need to push it(states) down as much as possible in the component hierarchy.
