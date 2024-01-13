import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Count count={count} setCount={setCount} />
    </div>
  );
}

function Count({ count, setCount }) {
  return (
    <div>
      {count}
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
// prop drilling makes the code unappealing as the states increases
// doesn't mean parent re-renders. syntactic uneasiness when writing code.
// Context API fixes prop drilling - passing data deeply with context API - lets you keep all state logic outside core code.
