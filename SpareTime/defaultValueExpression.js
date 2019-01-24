let y = 4,z=3;
function a(i=1+y, j=2+z) {
  console.log(i,j);
  return i+j;
}

console.log(a()); // it use value of y & z and return 10 all the time

console.log(a(2,2)); // it use value of y & Z and returns sum of arguments
