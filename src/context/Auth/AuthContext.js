import { createContext, useReducer } from "react";
import { authReducer } from "../../reducer/AuthReducer";
import { postSignupData } from "../../utils/Auth/postSignupData";
import { postLoginData } from "../../utils/Auth/postLoginData";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    isLoggedin: false,
    userDetails: {},
    // userToken: "",
  });
  const signupUser = async (signupData) => {
    try {
      const { status, data } = await postSignupData(signupData);
      if (status === 201) {
        localStorage.setItem("userToken", data?.encodedToken);
        dispatchAuth({ type: "SET_LOGIN_TRUE", payload: true });
        dispatchAuth({ type: "SET_USER", payload: data?.createdUser });
        alert("signup successfull");
      }
    } catch (error) {
      dispatchAuth({ type: "SET_LOGIN_FALSE", payload: false });
      console.error(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      console.log({ loginUser: loginData });
      const response = await postLoginData(loginData);
      if (response?.status === 200) {
        localStorage.setItem("userToken", response?.data?.encodedToken);
        alert("login successfull");
        dispatchAuth({ type: "SET_LOGIN_TRUE", payload: true });
        dispatchAuth({
          type: "SET_USER",
          payload: response?.data?.foundUser,
        });
      }
    } catch (error) {
      dispatchAuth({ type: "SET_LOGIN_FALSE", payload: false });
      console.error(error, "loginUser");
    }
  };
  const value = { authState, dispatchAuth, signupUser, loginUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
