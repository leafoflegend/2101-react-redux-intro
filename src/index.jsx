import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import createStore from './eliotdux';
import { eliotsConnect, EliotsProvider } from './eliot_connect';

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

const store = createStore(reducer);

class Counter extends Component {
    render() {
        const { counter, increment } = this.props;

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
            </div>
        );
    }
}

const mapStateToProps = ({ counter }) => ({
    counter,
});
const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(incrementCounter()),
});

const ConnectedCounter = eliotsConnect(
    mapStateToProps,
    mapDispatchToProps,
)(Counter);

class App extends Component {
    render() {
        return (
            <EliotsProvider store={store} >
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
