function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  randomElement: randomElement
};
