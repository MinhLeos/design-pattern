const Exposer = (function () {
  let privateVariable = 10;

  const privateMethod = function () {
    console.log("Inside a private method!");
    privateVariable++;
  };

  const methodToExpose = function () {
    console.log("This is a method I want to expose!");
  };

  const otherMethodIWantToExpose = function () {
    privateMethod();
  };

  return {
    first: methodToExpose,
    second: otherMethodIWantToExpose,
  };
})();

Exposer.first(); // Output: This is a method I want to expose!
Exposer.second(); // Output: Inside a private method!
Exposer.methodToExpose; // undefined
