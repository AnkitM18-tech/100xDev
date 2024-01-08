// can't make the useEffect's callback async, we can define a function outside and call it inside useEffect.
import { useState } from "react";
import { useEffect } from "react";

function Apps() {
  const [clickedNum, setClickedNum] = useState(1);
  return (
    <div>
      <button onClick={() => setClickedNum(1)}>1</button>
      <button onClick={() => setClickedNum(2)}>2</button>
      <button onClick={() => setClickedNum(3)}>3</button>
      <button onClick={() => setClickedNum(4)}>4</button>
      <Todo id={clickedNum} />
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    fetch("https://sum-server.100xdevs.com/todo?id=" + id).then(async function (
      res
    ) {
      const json = await res.json();
      setTodo(json.todo);
    });
  }, [id]);

  return (
    <div>
      <h1>{todo.title}</h1>
      <h4>{todo.description}</h4>
    </div>
  );
}

export default Apps;
