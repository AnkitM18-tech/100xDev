import "./App.css";
import { RecoilRoot, useRecoilStateLoadable } from "recoil";
import { todosAtomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

// state loadable and value loadable => gives us an object with state, contents, errorMaybe and promiseMaybe etc => we can use these to show the loader when the values or states are not yet available to display while using sync calls. => inside contents we have our data.
// so depending upon the state we can display certain things (loader, alert, message etc..)

// If we are only concerned about value we can use useRecoilValueLoadable.
// states can be loading, hasValue, hasError
// Other way we can handle this using Suspense, ErrorBoundary APIs. ErrorBoundary only in class based components.
// If we use stateLoadable / valueLoadable then we don't want Suspense API. Suspense won't trigger, but if we use RecoilState / Recoil Value then Suspense will trigger.

function Todo({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  if (todo.state === "loading") {
    return <div>loading</div>;
  }

  return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  );
}

export default App;
