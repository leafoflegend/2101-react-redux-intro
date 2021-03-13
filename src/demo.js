const { createStore } = require('redux');

const initialState = 1;

const increment = {
    type: 'increment',
}

const reducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return state + 1;
    }

    return state;
}

// this.state = reducer();
const store = createStore(reducer);

store.subscribe(() => {
    console.log('something was dispatched!');
});

console.log('Initial State: ', store.getState());

store.dispatch(increment);

store.dispatch({ type: 'blah' });

console.log('After Dispatch: ', store.getState());
