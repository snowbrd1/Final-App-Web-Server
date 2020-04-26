Notes on ES6
ECMAScript = ESx. ES3...ES6, ESNext

Variables
let a = 'Hello World!';
const b = {};
Functions
function a() {} // 'this' defined whenever function is defined

const b = () => {}; // 'this' defined on own scope
Array & Objects
const arr = [1, 2, 3, 4, 5];
const [first, ...otherNumbers] = arr;

const obj = { name: 'bob' };
const { name } = obj;
Pormises
const p = new Promise((resolve, reject) => {
  if (err) {
    reject(false);
  }
  resolve(true);
});

// old
p.then((val) => console.log(value)).catch((err) => console.log(err));

async function a() {
  return await p;
}