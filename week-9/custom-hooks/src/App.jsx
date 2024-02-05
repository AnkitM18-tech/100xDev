import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import axios from "axios";

// Data Fetching Custom Hook
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });
  }, []);
  return { todos, loading };
}

// Auto Refresh Hook - Poll the server after a certain amount of time
function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, n * 1000);

    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });
    // In case n changes the previous interval will get cleared and a new interval will be created.
    return () => clearInterval(getData);
  }, [n]);
  return { todos, loading };
}

function App() {
  {
    /* const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, []); */
  }
  const { todos, loading } = useTodos(5);

  return (
    <div>
      {loading ? (
        <div>"Loading..."</div>
      ) : (
        todos.map((todo) => <Track todo={todo} />)
      )}
    </div>
  );
}

/*
// States
// hooks were introduced in React 16.8.
// functional component
function MyFunctionalComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

// class based component
class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
*/

// Lifecycle Events
// Functional Component
function MyFunctionalComponent() {
  useEffect(() => {
    // Perform setup or data fetching here - when component is mounted
    console.log("Component Mounted");

    return () => {
      // Cleanup code (similar to componentWillUnmount)
      console.log("Component Unmounted");
    };
  }, []);
  // when dependency changes and component re-renders then clean up code will run and then the starting thing before return and so on.

  // Render UI
  return (
    <div>
      <div>From Inside My Functional Component</div>
    </div>
  );
}

/*
// class component
class MyClassComponent extends React.Component {
  componentDidMount() {
    // Perform setup or data fetching here
    console.log("Component Mounted");
  }

  componentWillUnmount() {
    // Clean up (e.g., remove event listeners or cancel subscriptions)
    console.log("Component Unmounted");
  }

  render() {
    // Render UI
    return <div>From Class Based Component</div>
  }
}
*/

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default App;

/* 
SWR 

swr - React Hooks for Data Fetching
swr is a popular React library that creates a lot of these hooks for you, and you can use it directly.
For example - 


import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.json());
const fetcher = async function(url) {
  const data = await fetch(url);
  const json = await data.json();
  return json;
};

function Profile() {
  const { data, error, isLoading } = useSWR('https://sum-server.100xdevs.com/todos', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello, you have {data.todos.length} todos!</div>
}

*/
/* 

Browser Functionality Related Hooks

1. useIsOnline hook
function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online",() => setIsOnline(true));
      window.removeEventListener("offline",() => setIsOnline(false));
    }
  },[])

  return isOnline;
}

function App() {
  const isOnline = useIsOnline(5);

  return (
    <>
      {isOnline ? "You are online yay!" : "You are not online"}
    </>
  )
}

2. useMousePointer hook

const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

function App() {
  const mousePointer = useMousePointer();

  return (
    <>
      Your mouse position is {mousePointer.x} {mousePointer.y}
    </>
  )
}

3. useDimensions - current width and height of the screen

*/

/* 

Performance / Timer Based Hooks
1. useInterval

function useInterval(fn,timeout) {
  useEffect(() =>{
    const intervalId = setInterval(() => fn(),timeout);
    return () => {
      clearInterval(intervalId);
    }
  },[fn,timeout]);
}

function App() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(c => c + 1);
  }, 1000)

  return (
    <>
      Timer is at {count}
    </>
  )
}

2. useDebounce

import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

function useDebounce(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), timeout);

    return () => clearTimeout(timerId);
  },[value, timeout])

  return debouncedValue;
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBar;

*/
