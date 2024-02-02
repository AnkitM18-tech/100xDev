import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ backgroundColor: "red", color: "white" }}>
          Hi From Red
        </div>
        <div style={{ backgroundColor: "blue", color: "white" }}>
          Hi From Blue
        </div>
        <div style={{ backgroundColor: "green", color: "white" }}>
          Hi From Green
        </div>
      </div>
      <div className="flex justify-between">
        <div className="bg-red-500">Hi From Red</div>
        <div className="bg-blue-500">Hi From Blue</div>
        <div className="bg-green-500">Hi From Green</div>
      </div> 
      <div className="grid grid-cols-10">
        <div className="col-span-4 text-white bg-red-500">Hi From Red</div>
        <div className="col-span-4 text-white bg-blue-500">Hi From Blue</div>
        <div className="col-span-2 text-white bg-green-500">Hi From Green</div>
      </div>
      <div className="flex">
        <div className="bg-red-500 w-[40%]">Hi From Red</div>
        <div className="bg-blue-500 w-[30%]">Hi From Blue</div>
        <div className="bg-green-500 w-[30%]">Hi From Green</div>
      </div>*/}
      {/* // By default it is red, and beyond md breakpoint it will become blue.
      after 768px -- blue */}
      {/* <div className="text-white bg-red-500 md:bg-blue-500">Hello</div> */}
      <div className="grid grid-cols-1 text-white md:grid-cols-3">
        <div className="bg-red-500">Hi From Red</div>
        <div className="bg-blue-500">Hi From Blue</div>
        <div className="bg-green-500">Hi From Green</div>
      </div>
    </div>
  );
}

export default App;

// Tailwind is Working- Mobile First => By default tailwind uses a mobile-first breakpoint system. Similar to bootstrap.
// What this means is that unprefixed utilities like "uppercase" take effect on all screen sizes, while prefixed utilities like "md:uppercase" only takes effect at the specific breakpoint and above.
// Don't use "sm:" to target mobile devices, instead use unprefixed utilities to target mobile and override them at larger breakpoints.
// MUI is highly opinionated, but good for boot strapping a project quickly. We can overwrite the default styles.
// It provides us default styles up front. Good for hackathons, but if you need more customizations then it's difficult with MUI.
