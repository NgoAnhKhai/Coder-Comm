import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
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
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const res = await apiService.get("/users/me");
          const user = res.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: LOGOUT,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
  }, []);

  const login = async ({ email, password }, callback) => {
    const res = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = res.data;
    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
  };
  const register = async ({ name, email, password }, callback) => {
    const res = await apiService.post("/auth/login", { name, email, password });
    const { user, accessToken } = res.data;
    setSession(accessToken);
    dispatch({ type: REGISTER_SUCCESS, payload: { user } });
    callback();
  };
  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
