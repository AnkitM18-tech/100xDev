import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

// when we want the default value as async then we need to use selector / selector family for atom / atom family
export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${String(id)}`);
      return res.data.todo;
    },
  })
});