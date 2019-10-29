// Library code
createStore = reducer => {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  /*
  takes in no arguments
  sets up a local (private) variable to hold the state
  sets up a getState() function
  returns an object that publicly exposes the getState() function
 */

  let state;

  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
};

// App code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Reducer function
todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        todo.id !== action.id
          ? todo
          : Object.assign({}.todo, { complete: !todo.complete });
      });
    default:
      return state;
  }
};

goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.goal);
    default:
      return state;
  }
};

app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
};

// Our next task on the list is to make a way to listen for changes to the state.
const store = createStore(app); // create the store need to pass a reducer here
store.subscribe(() => {
  console.log("The new state is ", store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false
  }
});


store.dispatch({
    type: REMOVE_TODO,
    id: 0
  });

const unsubscribe = store.subscribe(() => {
  console.log("The store changed.");
});

unsubscribe();

// Only an event can change the state of the store.
