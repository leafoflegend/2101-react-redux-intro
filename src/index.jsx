import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import EliotDux from './eliotdux';

const startup = new Date();

const initialState = {
    counter: 0,
};

const INCREMENT = 'INCREMENT';

const incrementCounter = () => ({
    type: INCREMENT,
});

const reducer = (action, state = initialState) => {
    if (action.type === INCREMENT) {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }

    return state;
}

const store = new EliotDux(reducer);

class CounterWithEventEmitter extends Component {
    state = store.getState();

    componentDidMount() {
        this.unsub = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsub();
    }

    increment = () => {
        store.dispatch(incrementCounter());
    }

    render() {
        const { counter } = this.state;

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
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

const appDiv = document.querySelector('#app');

ReactDOM.render(<CounterWithEventEmitter />, appDiv, () => {
    const rendered = new Date();
    console.log(`Application rendered in ${((rendered - startup) / 1000).toFixed(2)} seconds.`);
});
