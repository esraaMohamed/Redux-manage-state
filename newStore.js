// To start, create a store with Redux.createStore() and pass all reducers in as arguments. 
// Let's look at a small example with only one reducer:
// Note that using .push() in this way isn't the
// best approach. It's just the easiest to show
// for this example. We'll explain why in the next section.

// The Reducer Function
var userReducer = function(state, action) {
  if (state === undefined) {
    state = [];
  }
  if (action.type === 'ADD_USER') {
    state.push(action.user);
  }
  return state;
}

// Create a store by passing in the reducer
var store = Redux.createStore(userReducer);

// Dispatch our first action to express an intent to change the state
store.dispatch({
  type: 'ADD_USER',
  user: {name: 'Dan'}
});