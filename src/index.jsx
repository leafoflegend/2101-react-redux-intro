import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import EventEmitter from './event_emitter';

const startup = new Date();

const ee = new EventEmitter();

class CounterWithEventEmitter extends Component {
    state = {
        counter: 0,
    };

    componentDidMount() {
        ee.subscribe('increment', () => {
            const { counter } = this.state;

            this.setState({
                counter: counter + 1,
            });
        });
    }

    increment = () => {
        ee.emit('increment');
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
