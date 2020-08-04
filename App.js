import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import Navigator from "./navigation/AppNavigation";
import verbaReducer from "./store/reducers/verba";
import { init } from "./helper/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initialized database failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  verba: verbaReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
