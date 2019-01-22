const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log('Before',fruits);
/* splice has 3 arguments
start: start of an index to be remove
deleteCount: number of elements to be removed
items: items be inserted/replaced
*/
//fruits.splice(1, 0, "Lemon", "Kiwi"); // 0 delete count. so it inserted 2 items in the array
//fruits.splice(1, 1, "Lemon", "Kiwi"); // removed 1 item and inserted 2 items
//fruits.splice(1, 2, "Lemon", "Kiwi"); // removed 2 items and inserted 2 items
fruits.splice(1, 1); // removed 1 item and didn't insert any (it wasn't provided)
console.log('After',fruits);
