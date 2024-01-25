import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { notifications, totalNotificationSelector } from "./atoms";
// import { useEffect } from "react";
// import axios from "axios";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  // while rendering we will see a flash with default values first and then the values from backend will get populated. To resolve this issue, asynchronous queries can help us. because instead of default values, we can't give the axios code as default in atoms.
  /*
  useEffect(() => {
    // fetch
    axios.get("https://sum-server.100xdevs.com/notifications").then((res) => {
      setNetworkCount(res.data);
    });
  }, []);
  */

  return (
    <>
      <button>Home</button>

      <button>
        My network (
        {networkCount.networks >= 100 ? "99+" : networkCount.networks})
      </button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
