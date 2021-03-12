const INITIAL_ACTION = Symbol('INITIAL_ACTION');

class EliotDux {
    subscriptions = new Map();

    constructor(reducer) {
        this.reducer = reducer;
        this.state = this.reducer({
            type: INITIAL_ACTION,
        });
    }

    subscribe = (subscription) => {
        this.subscriptions.set(subscription, subscription);

        return () => {
            this.subscriptions.delete(subscription);
        };
    }

    #emit = () => {
        this.subscriptions.forEach((subscription) => {
            subscription();
        });
    }

    dispatch = (action) => {
        this.state = this.reducer(action, this.state);

        this.#emit();
    }

    getState = () => this.state;
}

export default EliotDux;
