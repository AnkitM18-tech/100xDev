import { useState, useEffect } from "react";
import "./App.css";
import React from "react";

function App() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setRender((r) => !r);
    }, 5000);
  }, []);
  return <div>{render ? <MyFunctionalComponent /> : ""}</div>;
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

export default App;
