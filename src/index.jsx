import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import createStore from './eliotdux';
import { eliotsConnect, EliotsProvider } from './eliot_connect';

const fakeRequest = (data) => new Promise((res) => {
    setTimeout(() => {
        res(data);
    }, 1000);
})

// Ignore, just a nice thing for seeing how quickly the app starts up...
const startup = new Date();

// Initial State
const initialState = {
    counter: 0,
};

// Action Type
const INCREMENT = 'INCREMENT';
const SET_NUMBER = 'SET_NUMBER';

// Action Creator
const incrementCounter = () => ({
    type: INCREMENT,
});
const setNumber = (data) => ({
    data,
    type: SET_NUMBER,
});

// Reducer
// Yes, yes, I know, you can use switch. Whatever floats your ⛵️!
const reducer = (action, state = initialState) => {
    if (action.type === INCREMENT) {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }

    if (action.type === SET_NUMBER) {
        return {
            ...state,
            counter: action.data,
        };
    }

    return state;
}

// We create the store by giving it the reducer! See the store implementation for what it does!
const store = createStore(reducer);

class Counter extends Component {
    render() {
        const { increment, counter, setRandomNumber } = this.props;

        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>{ counter }</h1>
                <button onClick={increment}>Increment</button>
                <button onClick={setRandomNumber}>Set Random Number</button>
            </div>
        );
    }
}

// Takes the redux stores current state, maps it to an object whos keys will get passed as props to the connected component, with the values.
const mapStateToProps = ({ counter }) => ({
    counter,
});
// Same as above, but offers dispatch instead of state. Allows us to pass functions that dispatch to the redux store without actually referencing the store (connect does the referencing).
const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(incrementCounter()),
    setRandomNumber: () => dispatch(async (d) => {
        const serverResult = await fakeRequest(Math.round(Math.random() * 100));

        d(setNumber(serverResult));
    }),
});

// We call connect, which returns ANOTHER FUNCTION, which we then call with our component. This returns a HOC (Higher Order Component) that is passed the props we specified in mapStateToProps and mapDispatchToProps, as well as any other props we pass into it... This also connects it to the store!
const ConnectedCounter = eliotsConnect(
    mapStateToProps,
    mapDispatchToProps,
)(Counter);

class App extends Component {
    render() {
        return (
            // We pass the store in here, this is how we propogate the stores reference throughout the entire React tree (using a thing called Context, its like props, but doesnt require us to manually pass things forward).
            <EliotsProvider store={store}>
                <ConnectedCounter />
            </EliotsProvider>
        );
    }
}

const appDiv = document.querySelector('#app');

ReactDOM.render(<App />, appDiv, () => {
    const rendered = new Date();
    console.log(`Application rendered in ${((rendered - startup) / 1000).toFixed(2)} seconds.`);
});
