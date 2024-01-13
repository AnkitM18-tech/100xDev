import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { Dashboard } from "./components/Dashboard";
// Lazy Loading - for optimizing performance. instead of getting entire route and page details at once we can make it on demand.
// const Dashboard = React.lazy(() => import("./components/Dashboard")); -- without default export
// import { Landing } from "./components/Landing";
const Dashboard = lazy(() => import("./components/Dashboard"));
const Landing = lazy(() => import("./components/Landing"));

function App() {
  // Suspense API - async component/ data fetching -- for lazy loading to work as the component is not readily available and it is being fetched on demand, we need to add Suspense API and fallback logic to it and wrap it around the components.
  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"Loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"Loading..."}>
                <Landing />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppBar() {
  const navigate = useNavigate(); // right way of routing, so that to make sure hard refresh is not happening -- can't use outside browser router, so put it inside another component
  return (
    <div
      style={{
        background: "#000",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <p>Hi this is Top Bar Common for All</p>
      <div style={{ paddingTop: "15px" }}>
        <button
          onClick={() => {
            // window.location.href = "/"; -- will make hard refresh and fetch bundles from server everytime. useNavigate is the right way to do client side routing.
            navigate("/");
          }}
        >
          Landing
        </button>
        <button
          onClick={() => {
            // window.location.href = "/dashboard";
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
