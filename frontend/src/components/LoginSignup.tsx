import React, { useState, useEffect } from "react";
import { login, signup, getProfile } from "../services/user-service";
import "./LoginSignup.css";
import { useAuthContext } from "../contexts/AuthContext";

export type FormValues = {
  email: string;
  password: string;
};

const initialFormState = {
  email: "",
  password: "",
};

type LoginSignupProps = {
  setShowLoginForm: (showLoginForm: boolean) => void;
};

const LoginSignup = ({ setShowLoginForm }: LoginSignupProps) => {
  const [formType, setFormType] = useState("login");
  const [formState, setFormState] = useState<FormValues>(initialFormState);
  const { setUser } = useAuthContext();

  // handler functions
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    const loginData = { email, password };
    const loggedinUser = await login(loginData);
    setFormState(initialFormState);
    setShowLoginForm(false);
    setUser(loggedinUser);
    // else setFailedToLogin(true);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    const signupData = { email, password };
    const newUser = await signup(signupData);
    setFormState(initialFormState);
    setShowLoginForm(false);
    if (newUser) setUser(newUser);
    // else setFailedToLogin(true);
  };

  return (
    <div id="login-signup-wrap">
      <form
        onSubmit={formType === "login" ? handleLogin : handleSignup}
        id="login-signup-form"
      >
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={changeHandler}
          placeholder="email"
        ></input>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={changeHandler}
          placeholder="password"
        ></input>
        <button type="submit" className="login-signup-button">
          {formType === "login" ? "Login" : "Sign up"}
        </button>
      </form>
      <button
        id="login-signup-toggle"
        className="transparent-button"
        onClick={() => setFormType(formType === "login" ? "signup" : "login")}
      >
        {formType === "login" ? "...or create account" : "back to login"}
      </button>
    </div>
  );
};

export default LoginSignup;
