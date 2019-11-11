// Library code
createStore = reducer => {
  // The store should have four parts
  // 1. The state ===> The state itself
  // 2. Get the state ===> accessible by using the getState function
  // 3. Listen to changes on the state ===> We do this using the subscribe function
  // 4. Update the state ===> We do this using the dispatch function which will call the reducer passing it the current state and the action which occured and loops in the listeners to invoke them

  /*
  takes in no arguments
  sets up a local (private) variable to hold the state
  sets up a getState() function
  returns an object that publicly exposes the getState() function
 */

  let state;

  let listeners = [];

  const getState = () => state;

  // subscribing a listener, adding a new listener to that listeners array 
  const subscribe = listener => {
    listeners.push(listener);
    return () => { // the return of the subscribe function is a new function that unsubscribes this listener from the list of listerners 
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // dispatching an action, updating the state using the reducer function which was sent as a parameter to the create store
  // and then will call the listeners that were subscribed to this change
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

// App code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action creators 
const addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  }
}

const removeTodoAction = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  }
}

const toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

const addGoalAction = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  }
}

const removeGoalAction = (id) => {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

// Todo Reducer function
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

// Goals Reducer function
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

// The main reducer function that can compine more that one reducer and then is sent to the store as an argument 
app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
};

// Our next task on the list is to make a way to listen for changes to the state.
const store = createStore(app); // create the store need to pass a reducer here

// subscribing a listener to the store
store.subscribe(() => {
  console.log("The new state is ", store.getState());
});

// Only an event can change the state of the store.
// dispatching an action (Adding a todo) 
store.dispatch(addTodoAction({
  id: 0,
  name: "Learn React",
  complete: false
}));

store.dispatch(addTodoAction({
  id: 1,
  name: "Learn Redux",
  complete: false
}));

store.dispatch(addTodoAction({
  id: 2,
  name: "Learn React native",
  complete: false
}));

store.dispatch(addTodoAction({
  id: 3,
  name: "Learn Swift",
  complete: false
}));

// dispatching another action (Removing a todo)
store.dispatch(removeTodoAction(3));

// dispatching another action (Toggling a todo)
store.dispatch(toggleTodoAction(0));

// since the subscribe function returns a function that unsubsribes the listerener we can use it to remove a listener from the store state
const unsubscribe = store.subscribe(() => {
  console.log("The store changed.");
});

// unsubscribing a listener
unsubscribe();