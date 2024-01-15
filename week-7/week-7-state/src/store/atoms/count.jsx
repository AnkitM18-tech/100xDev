import { atom, selector } from "recoil";

// don't use conflicting keys for atoms
export const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom);
    return count !== 0 && count % 2 === 0;
  },
});
/* 
    The above code is same as below, we just destructured {get} above

    get: (props) => {
    const count = props.get(countAtom);
    return count !== 0 && count % 2 === 0;
  }
*/
