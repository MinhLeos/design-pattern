console.log("------------");

//Module - Revealing Module
function createStore(reducer) {
  let state;
  let listSub = [];

  // Singleton
  function getState() {
    if (!state) {
      state = reducer();
    }
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listSub.forEach((sub) => {
      sub(state);
    });
    console.log("state", state);
  }

  function subscribe(fun) {
    if (fun && typeof fun === "function") {
      listSub.push(fun);
    }
  }

  function unsubscribe(fun) {
    listSub = listSub.filter((sub) => sub !== fun);
  }

  return {
    state: getState(),
    dispatch,
    subscribe,
    unsubscribe,
  };
}

const initState = 0;
function reducer(state = initState, action) {
  switch (action?.type) {
    case "increment":
      return state + action?.payload;
    case "decrement":
      return state - action?.payload;
    default:
      return state;
  }
}

const store = createStore(reducer);
document.getElementById("pattern").innerText = store.state;

const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const subscribeBtn = document.getElementById("subscribe");
const unsubscribeBtn = document.getElementById("unsubscribe");

const handleSubscribe = (state) => {
  console.log("Message: counter is ", state);
  const pattern = document.getElementById("pattern");
  pattern.innerText = state;
};

// //Decorator
// const HandleFunction = function (handleFunc) {
//   this.handleFunc = handleFunc;
// };
// const DecoratedHandleFunction = function (instance, message) {
//   this.handleFunc = instance.handleFunc;
//   this.message = message;

//   this.run = function () {
//     console.log(this.message);
//     this.handleFunc();
//   };
// };
// const handleFuncSub = new HandleFunction(() => {
//   store.subscribe(handleSubscribe);
// });
// const decoratedFuncSub = new DecoratedHandleFunction(
//   handleFuncSub,
//   "Suscribe !!!"
// );
// const handleFuncUnsub = new HandleFunction(() => {
//   store.unsubscribe(handleSubscribe);
// });
// const decoratedFuncUnsub = new DecoratedHandleFunction(
//   handleFuncUnsub,
//   "Unsuscribe !!!"
// );

// //observers
// subscribeBtn.addEventListener(
//   "click",
//   decoratedFuncSub.run.bind(decoratedFuncSub)
// );
// unsubscribeBtn.addEventListener(
//   "click",
//   decoratedFuncUnsub.run.bind(decoratedFuncUnsub)
// );

//observers
subscribeBtn.addEventListener("click", () => {
  console.log("Suscribe !!!");
  store.subscribe(handleSubscribe);
});
unsubscribeBtn.addEventListener("click", () => {
  console.log("Unsuscribe !!!");
  store.unsubscribe(handleSubscribe);
});

//Factory
const ActionFactory = function () {
  this.createAction = function (type, value) {
    let action;
    if (type === "increment") {
      action = new ActionIncrement();
    } else {
      action = new ActionDecrement();
    }
    action.payload = value;

    return action;
  };
};
const ActionIncrement = function () {
  this.type = "increment";
};
const ActionDecrement = function () {
  this.type = "decrement";
};
const factory = new ActionFactory();

incrementBtn.addEventListener("click", () => {
  const action = factory.createAction("increment", 100);
  store.dispatch(action);
});
decrementBtn.addEventListener("click", () => {
  const action = factory.createAction("decrement", 50);
  store.dispatch(action);
});
