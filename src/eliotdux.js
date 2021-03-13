// In Redux tradition - we have a special action type that only we know about - if you log all actions in redux, you'll see they do the same thing! The purpose is to make sure that the first action doesn't match any of your switch or if clauses, so that you return initialState the first time (since no conditional was matched).
const INITIAL_ACTION = Symbol('INITIAL_ACTION');

// My version of redux. Its better.
class EliotDux {
    // We gotta store our subscriptions somewhere (the functions people give us when they call subscribe()), Maps are cool for this because you can delete by reference. You'll see that in my unsubscribe implementation.
    subscriptions = new Map();

    // The only real argument redux cares about is the reducer, so we take that in the constructor.
    constructor(reducer) {
        // We store the reducer (we'll need it on future dispatches).
        this.reducer = reducer;
        // We IMMEDIATELY create state. We do this by running an action you cant match through the reducer. This will return your initial state (since thats what reducers do in their 'default' right?)
        this.state = this.reducer({
            type: INITIAL_ACTION,
        });
    }

    subscribe = (subscription) => {
        // When you subscribe, we add you to our subscriptions.
        this.subscriptions.set(subscription, subscription);

        // We return a function that removes you from our subscriptions.
        return () => {
            this.subscriptions.delete(subscription);
        };
    }

    // # is fancy new JS. It means "private". Only the internals of this class can use this function. A user cant call store.#emit. JS will fail. Its an OOP thing. Its because this is none of your darn business. I should really add it to everything that isnt a users business about my implementation (this.#subscribers, this.#reducer, this.#state), but I felt like giving you a soft intro.
    #emit = () => {
        // But what it helps me with, is it helps me just call each and every subscription.
        this.subscriptions.forEach((subscription) => {
            subscription();
        });
    }

    dispatch = (action) => {
        if (typeof action === 'function') {
            action(this.dispatch, this.getState);
        } else {
            // Most IMPORTANT line of code in all of redux. When you dispatch an action, the new state is equal to the old state, reduced by the action you dispatched.
            this.state = this.reducer(action, this.state);

            // Now that we have a new state (we actually might not, it could in theory be the same state, but i digress), we need to tell everyone! #emit calls every single subscription.
            this.#emit();
        }
    }

    // Well, we get ya the state.
    getState = () => this.state;
}

// Stupid, but I'm trying to make y'all feel at home here.
const createStore = (reducer) => {
    return new EliotDux(reducer);
}

export default createStore;
