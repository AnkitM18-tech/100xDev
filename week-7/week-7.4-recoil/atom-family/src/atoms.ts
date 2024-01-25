import { atomFamily } from "recoil";
import { TODOS } from "./todos";

// default is not a value anymore, it's a function.

// We can create multiple atoms, but that is not the right approach, as the values will be coming from a backend. So atomFamily is better suited for creating dynamic atoms.

/* If we are doing like atom({
  default: TODOS }) --> even if one todo changes, all <Todo /> will be re-rendered, as they all depend on the same atom. If we use atomFamily then only that specific atom will be re-rendered.
*/

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: id => {
    return TODOS.find(x => x.id === id)
  },
});