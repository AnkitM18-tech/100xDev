import "./App.css";
import { RecoilRoot, useRecoilState } from "recoil";
import { todosAtomFamily } from "./atoms";

// Sometimes you need more than one atom for your use case. If you have to create a new dynamic atom for each component.For this we can just subscribe to an atom family instead of creating individual atoms. And here we can give some inputs to the atom family to fetch that particular atom. Atom family can have multiple different atoms depending on the inputs. (ID, Name etc)

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

export default App;
