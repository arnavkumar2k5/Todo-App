import React from "react";
import TodoInput from "../../components/base/TodoInput";
import TodoButton from "../../components/base/TodoButton";
import { Link } from "react-router-dom";

interface SignInViewProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleClick: () => void
}

const SignInView: React.FC<SignInViewProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleClick
}) => {
  return (
    <div className="flex flex-col w-1/3 justify-center items-center m-auto bg-white shadow-2xl rounded-xl mt-20 p-10 gap-2">
      <div className="text-2xl font-bold">Todo</div>
      <div className="text-3xl font-semibold">Sign in to your account</div>
      <div>Don't have any account? 
        <Link to="/signUp">
        Sign Up
        </Link>
        </div>
      <TodoInput
        input={email}
        setInput={setEmail}
        type="email"
        placeholder="Enter your Email"
        />
      <TodoInput
        input={password}
        setInput={setPassword}
        type="password"
        placeholder="Enter your Password"
      />
      <TodoButton className="w-[90%] hover:bg-black" onClick={handleClick}>Sign In</TodoButton>
    </div>
  );
};

export default SignInView;