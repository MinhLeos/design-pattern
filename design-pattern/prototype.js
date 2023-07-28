function CustomerPrototype(proto) {
  this.proto = proto;

  this.clone = function () {
    var customer = new Customer();

    customer.first = proto.first;
    customer.last = proto.last;
    customer.status = proto.status;

    return customer;
  };
}

function Customer(first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;

  this.say = function () {
    console.log(
      "name: " + this.first + " " + this.last + ", status: " + this.status
    );
  };
}

function run() {
  var proto = new Customer("Minh", "Le", "pending");
  var prototype = new CustomerPrototype(proto);

  var customer = prototype.clone();
  customer.say();
}
run();

//----------------------------------------------------------//
/* Use prototype of JS */
// We declare our prototype object with two methods
const enemy = {
  attack: () => console.log("Attack!"),
  flyAway: () => console.log("Flyyyy like an eagle!"),
};

// We declare another object that will inherit from our prototype
const bug1 = {
  name: "Buggy McFly",
  phrase: "Your debugger doesn't work with me!",
};

// With setPrototypeOf we set the prototype of our object
Object.setPrototypeOf(bug1, enemy);
console.log(bug1);

// With getPrototypeOf we read the prototype and confirm the previous has worked
console.log(Object.getPrototypeOf(bug1)); // { attack: [Function: attack], flyAway: [Function: flyAway] }
console.log(bug1.phrase); // Your debugger doesn't work with me!
console.log(bug1.attack()); // Attack!
console.log(bug1.flyAway()); // Flyyyy like an eagle!
