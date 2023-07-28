const Factory = function () {
  this.createEmployee = function (type) {
    let employee;

    if (type === "fulltime") {
      employee = new FullTime();
    } else if (type === "parttime") {
      employee = new PartTime();
    } else if (type === "temporary") {
      employee = new Temporary();
    } else if (type === "contractor") {
      employee = new Contractor();
    }

    employee.type = type;

    employee.say = function () {
      console.log(this.type + ": rate " + this.hourly + "/hour");
    };

    return employee;
  };
};

const FullTime = function () {
  this.hourly = "$12";
};

const PartTime = function () {
  this.hourly = "$11";
};

const Temporary = function () {
  this.hourly = "$10";
};

const Contractor = function () {
  this.hourly = "$15";
};

function run() {
  const employees = [];
  const factory = new Factory();

  employees.push(factory.createEmployee("fulltime")); //fulltime: rate $12/hour
  employees.push(factory.createEmployee("parttime")); //parttime: rate $11/hour
  employees.push(factory.createEmployee("temporary")); //temporary: rate $10/hour
  employees.push(factory.createEmployee("contractor")); //contractor: rate $15/hour

  for (let i = 0, len = employees.length; i < len; i++) {
    employees[i].say();
  }
}

run();
