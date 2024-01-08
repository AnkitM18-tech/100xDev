import React, { useState, useEffect } from "react";

// let counter = 4;
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
    }, 10000);
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );

  /* const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Gym",
      description: "Go to gym 5-7",
    },
    {
      id: 2,
      title: "Food",
      description: "Go to food 5-7",
    },
    {
      id: 3,
      title: "Class",
      description: "Go to class 5-7",
    },
  ]); */

  /* function addTodo() {
    setTodos([
      ...todos,
      { id: counter++, title: Math.random(), description: Math.random() },
    ]);
  } */
  // Parent re-render, all children re-renders
  // return (
  //   <div>
  //     {/* <HeaderWthButton />
  //     <Header title="Nehaa"></Header>
  //     <Header title="Nehaaaa"></Header>
  //     <Header title="Nehaaaa"></Header> */}
  //     {/* <button onClick={addTodo}>Add Todo</button> */}

  //     {/* <CardWrapper innerComponent={<TextComponent />} /> */}
  //     {/* <CardWrapper>Hi There</CardWrapper> */}
  //   </div>
  // );

  // function TextComponent() {
  //   return <div>Hello There</div>;
  // }

  // function CardWrapper({ innerComponent }) {
  //   // {children -> anything inside the CardWrapper}
  //   return (
  //     <div style={{ border: "2px solid black", padding: 20 }}>
  //       {innerComponent} {/* children -> cleaner way to use wrapper component */}
  //     </div>
  //   );
  // }
}
function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

// React.memo memoize to avoid unnecessary re-rendering if props are not changing
/*const Header = React.memo(function Header({ title }) {
  return <div>{title}</div>;
});

// To minimise re-render, push down states.
function HeaderWthButton() {
  const [title, setTitle] = useState("Ankit1");

  function updateTitle() {
    setTitle("My name is Ankit " + Math.random());
  }
  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
      <Header title={title}></Header>
    </div>
  );
}
*/

/*
function Header({ title }) {
  return <div>{title}</div>;
}
*/

export default App;

// Wrapper Component -> Component that takes other components as argument
