import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};
const INITIALIZE = " AUTH.INITIALIZE";
const LOGIN_SUCCESS = " AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = " AUTH.REGISTER_SUCCESS";
const LOGOUT = " AUTH.LOGOUT";
const UPDATE_PROFILE = " AUTH.UPDATE_PROFILE";
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
const AuthContext = createContext({ ...initialState });
const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async ({ email, password }, callback) => {
    const res = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = res.data;
    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
  };
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
