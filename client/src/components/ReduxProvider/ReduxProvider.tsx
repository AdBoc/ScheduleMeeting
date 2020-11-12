import React from "react";
import {Provider} from "react-redux";
import store from "../../redux/store";

export function withReduxProvider<T>(WrappedComponent: React.ComponentType<T>) {
  const ReduxProvider = (props: T) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props}/>
      </Provider>
    )
  }

  ReduxProvider.displayName = `WithReduxProvider(${WrappedComponent.displayName})`;
  return ReduxProvider;
}