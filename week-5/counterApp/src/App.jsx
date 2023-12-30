import { useState } from "react";
import "./App.css";

// parent re-render => child re-render
function App() {
  // if we don't use useState then it won't re-render when the state changes
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Go to Gym",
      description: "Gym 5-7",
    },
    {
      id: 2,
      title: "Go to Office",
      description: "Office 7-3",
    },
    {
      id: 3,
      title: "Go to Turf",
      description: "Turf 3-5",
    },
  ]);

  function Todo(props) {
    const [isDone, setIsDone] = useState(false);
    return (
      <div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <button
          id={props.id}
          onClick={() => {
            setIsDone(!isDone);
          }}
        >
          {isDone ? "Done" : "Mark as Done"}
        </button>
      </div>
    );
  }

  function Button(props) {
    function onClickHandler() {
      props.setCount(props.count + 1);
    }
    return <button onClick={onClickHandler}>Counter {props.count}</button>;
    /* 
      // transpiled
      return React.createElement(
        "button",
        {onClick: onClickHandler}
        `Counter ${props.count}`
      )
    */
  }

  return (
    <>
      <div className="cardCount">
        <Button count={count} setCount={setCount} />
      </div>
      <div className="cardTodo">
        <button
          onClick={() => {
            setTodos([
              ...todos,
              {
                id: 4,
                title: "Study DSA",
                description: "Study DSA 7-9",
              },
            ]);
          }}
        >
          Add Todo
        </button>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              title={todo.title}
              description={todo.description}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
