let a = [1,2,3];
console.log(a); // will print array
console.log(...a); // will print individual values of the array;  see the affect by running it


const test  = (...c) =>  console.log(c);
test(1,2,3,4,5); // Line no. 6 will put all the arguments into a variable 'c'
