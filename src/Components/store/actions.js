import axios from "axios";
import { url } from "../../appConfig";
import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";

export const actionTypes = Object.freeze({
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
});

export const initAuth = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode(token);
    const isTokenExpired = Date.now() >= decoded.exp * 1000;

    if (isTokenExpired) throw new Error("");

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: decoded });
  } catch (err) {
    localStorage.clear();
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      error: "Auto sign-in failed",
    });
  }
};

export const signIn = (credentials) => {
  // ....
  return async (dispatch) => {
    try {
      // Start Login Process
      dispatch({ type: actionTypes.LOGIN_START });

      // Login http request
      const httpResponse = await axios.post(url + "/admin/auth", credentials);
      if (httpResponse.status === 200) {
        localStorage.setItem("token", httpResponse.data.token);
        const decoded = jwt_decode(httpResponse.data.token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: decoded,
        });
        // const history = useHistory();
        credentials.history.push("/");
      } else {
        localStorage.clear();
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          error: httpResponse.statusText,
        });
      }
    } catch (err) {
      localStorage.clear();
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        error: err,
      });
    }
  };
};

export const signOut = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: actionTypes.LOGOUT });
};
