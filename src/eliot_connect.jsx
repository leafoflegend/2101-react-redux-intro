import React, { Component, createContext } from 'react';

// Gosh, look up context, its fun. It allows us to thread values through reacts tree without manually passing things down, you'll see below. Its what enables 'connect' in react-redux to do its thing.
const StoreContext = createContext({});

// The provider you need to wrap your react tree in.
class EliotsProvider extends Component {
    // We need a constructor, because we need to make this equivelent to the state of redux immediately.
    constructor(props) {
        super(props);

        // It takes the store as its only prop.
        const { store } = props;

        // It saves it.
        this.store = store;

        // It grabs the state, saves it, and it grabs dispatch, and saves it as well.
        this.state = {
            storeState: this.store.getState(),
            dispatch: this.store.dispatch,
        };
    }

    componentDidMount() {
        // When we mount, we subscribe.
        this.unsub = this.store.subscribe(() => {
            // Same shtick, every time the redux store updates, this component mirrors its state.
            this.setState({
                storeState: this.store.getState(),
                dispatch: this.store.dispatch,
            });
        });
    }

    componentWillUnmount() {
        // Clean up afterwards.
        this.unsub();
    }

    render() {
        // Any children passed to this component...
        const { children } = this.props;

        return (
            // Get rendered in the CONTEXT of the REDUX STATE. Thats why I pass this.state (which is just a mirror of the redux state, we update it on subscription) to the context as a value!
            <StoreContext.Provider value={this.state}>
                {children}
            </StoreContext.Provider>
        );
    }
}

// You pass me mapStateToProps, and mapDispatchToProps
const eliotsConnect = (mapStateToProps, mapDispatchToProps) => {
    // I return you another function, this one takes a React component.
    return (Child) => {
        // I return a NEW REACT COMPONENT
        return class EliotsConnect extends Component {
            // It knows about that context I created! The same one the Provider up above is supplying a value to! The value being the redux state itself! (static is a fancy way to say EliotsConnect.contextType fyi)
            static contextType = StoreContext;

            render() {
                // Every time we render (which is every time the context is updated, which is every time the store is updated, which is every time YOU DISPATCH!), we pass the stores state into mapStateToProps. This generates new props (we also need to make sure you passed it to us!)
                const props = mapStateToProps
                    ? mapStateToProps(
                        this.context.storeState,
                    )
                    : {};
                // We also pass dispatch into mapDispatchToProps, this generates more props for us (we also need to make sure you passed it to us!)
                const dispatchProps = mapDispatchToProps
                    ? mapDispatchToProps(
                        this.context.dispatch,
                    )
                    : {};
                // We combine those two, and whatever props are passed to this component manually.
                const allProps = {
                    ...props,
                    ...dispatchProps,
                    ...this.props,
                };

                // We pass ALL OF THOSE PROPS to the component you passed us, and return it. Essentially, we are just returning the component you gave us back to you, but with new props!
                return <Child {...allProps} />;
            }
        }
    }
}

export {
    EliotsProvider,
    eliotsConnect,
}
