import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { actionTypes } from "./actions";

const initialState = {
  loggedIn: false,
  user: null,
  loading: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...initialState, loading: true };

    case actionTypes.LOGIN_SUCCESS:
      return { ...initialState, loggedIn: true, user: action.payload };

    case actionTypes.LOGIN_FAIL:
      return { ...initialState, error: action.payload };

    case actionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
