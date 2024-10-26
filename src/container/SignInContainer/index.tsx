import React, { useEffect, useState } from "react";
import SignInView from "../../view/SignInView";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignInContainer: React.FC = () => {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async () => {
    signIn(email, password);

    if (isAuthenticated()) {
      navigate("/home");
    } else {
      console.log("Failed to login. Check credentials.");
    }
  };

  return (
    <div>
      <SignInView
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleClick={handleSignIn}
      />
    </div>
  );
};

export default SignInContainer;
