import axios from "axios";
import { atom, selector } from "recoil";

// hit the bakckend and store it in atoms as default - we can use asynchronous queries. default value of an atom needs to be synchronous or it can be a selector which can be asynchronous. get function in the selector can be asynchronous.
export const notifications = atom({
  key: "networkAtom",
  default: /* {
    network: 4,
    jobs: 6,
    messaging: 3,
    notifications: 3,
  }, */ selector({
    key: "networkAtomSelector",
    get: async () => {
      //   await new Promise((r) => setTimeout(r, 5000)); // sleeps for 5 secs --> we don't see a flash here because there is white screen before the data comes from backend, it happens very quickly, we can't perceive.
      const res = await axios.get(
        "https://sum-server.100xdevs.com/notifications"
      );
      return res.data;
    },
  }),
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.notifications +
      allNotifications.messaging
    );
  },
});
