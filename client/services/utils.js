export function refill(originalArray, newArray) {
  while(originalArray.length > 0) {
    originalArray.pop();
  }

  newArray.forEach(element => {
    originalArray.push(element);
  });
}
