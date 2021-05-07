// import "@babel/polyfill";
import 'core-js';
const arr = [
  new Promise(() => {}),
  new Promise(() => {}),
];

arr.map(item => {
  console.log(item);
});
