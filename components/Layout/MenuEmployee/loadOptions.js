import { GroupBase, OptionsOrGroups } from "react-select";

const options = [];
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  });
}

// const sleep = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(undefined);
//     }, ms);
//   });
