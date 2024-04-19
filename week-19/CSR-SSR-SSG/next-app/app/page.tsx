// instead of using useEffect, useState like React, we can use async components provided by Next JS. So that we don't have to use client side rendering.

// even though the end point is returning a different set of todos everytime, it is not updating in FE because it is statically generated. By default the page is statically generated.

export default async function Home() {
  const response = await fetch("https://sum-server.100xdevs.com/todos");
  const data = await response.json();
  console.log("Data Found from the BE Server is " + JSON.stringify(data)); // this will run during the build time

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {data.todos.map((todo: any) => (
        <div key={todo.id}>
          {todo.title}
          {todo.description}
        </div>
      ))}
    </main>
  );
}
