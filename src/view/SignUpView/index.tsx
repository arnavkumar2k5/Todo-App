import React from "react";
import TodoInput from "../../components/base/TodoInput";
import TodoButton from "../../components/base/TodoButton";
import { Link } from "react-router-dom";

interface SignInViewProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleClick: () => void;
}

const SignUpView: React.FC<SignInViewProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleClick,
}) => {
  return (
    <div className="flex flex-col w-1/3 justify-center items-center m-auto bg-white shadow-2xl rounded-xl mt-20 p-10 gap-2">
      <div className="text-2xl font-bold">Todo</div>
      <div className="text-3xl font-semibold">Sign up to create account</div>
      <div>Already have an account?
        <Link to="/signIn">
        Sign In
        </Link>
        </div>
        <TodoInput
        input={name}
        setInput={setName}
        type="text"
        placeholder="Enter your Name"
      />
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
      <TodoButton className="w-[90%] hover:bg-black" onClick={handleClick}>Sign Up</TodoButton>
    </div>
  );
};

export default SignUpView;
