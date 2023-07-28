const testModule = (function () {
  let counter = 0;

  return {
    getCounter() {
      return counter;
    },
    increateCounter() {
      counter++;
    },
    resetCounter() {
      counter = 0;
    },
  };
})();

for (let i = 0; i < 10; i++) {
  testModule.increateCounter();
}
console.log(testModule.getCounter()); // 10

testModule.resetCounter();
console.log(testModule.getCounter()); // 0

console.log(testModule.counter); // undefined
