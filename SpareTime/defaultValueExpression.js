let y = 4,z=3;
function a(i=1+y, j=2+z) {
  console.log(i,j);
  return i+j;
}

console.log(a());

console.log(a(2,2));
