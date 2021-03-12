import React, { Component, createContext, cloneElement } from 'react';

const StoreContext = createContext({});

class EliotsProvider extends Component {
    constructor(props) {
        super();

        const { store } = props;

        this.store = store;

        this.state = {
            storeState: this.store.getState(),
            dispatch: this.store.dispatch,
        };
    }

    componentDidMount() {
        this.unsub = this.store.subscribe(() => {
            this.setState({
                storeState: this.store.getState(),
                dispatch: this.store.dispatch,
            });
        });
    }

    componentWillUnmount() {
        this.unsub();
    }

    render() {
        const { children } = this.props;

        return (
            <StoreContext.Provider value={this.state}>
                {children}
            </StoreContext.Provider>
        );
    }
}

const eliotsConnect = (mapStateToProps, mapDispatchToProps) => (Child) => {
    return class EliotsConnect extends Component {
        static contextType = StoreContext;

        render() {
            const props = mapStateToProps(
                this.context.storeState,
            );
            const dispatchProps = mapDispatchToProps(
                this.context.dispatch,
            );
            const allProps = {
                ...props,
                ...dispatchProps,
                ...this.props,
            };

            return <Child {...allProps} />;
        }
    }
}

export {
    EliotsProvider,
    eliotsConnect,
}
