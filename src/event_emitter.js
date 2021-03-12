// Redux is just a fancy version of this. This is one of the most common patterns in all of programming.
class EventEmitter {
    subscriptions = {};

    subscribe = (eventName, subscription) => {
        if (!this.subscriptions[eventName]) {
            this.subscriptions[eventName] = new Map();
        }

        const eventSubscriptions = this.subscriptions[eventName];

        eventSubscriptions.set(subscription, subscription);

        return () => {
            eventSubscriptions.delete(subscription);
        }
    }

    emit = (eventName, ...data) => {
        if (!this.subscriptions[eventName]) return;

        const eventSubscriptions = this.subscriptions[eventName];

        eventSubscriptions.forEach((subscription) => {
            subscription(...data);
        });
    }
}

export default EventEmitter;
