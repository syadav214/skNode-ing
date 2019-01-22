// Changes and return new array object. The original array will not be changed.
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log('Before',fruits);
// const testF = fruits.slice(1); // will start from 1st index till last
const testF = fruits.slice(1,3); // will start from 1st index till 3rd (4-1) index
console.log('After',testF);
