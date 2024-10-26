import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpView from '../../view/SignUpView';
import { useAuth } from '../../contexts/AuthContext.tsx';

const SignUpContainer: React.FC = () => {
    const { signUp, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/home'); 
        }
    }, [isAuthenticated, navigate]);

    const handleSignUp = async () => {
        signUp(email, password); 

        if (isAuthenticated()) {
            navigate('/home'); 
        } else {
            console.log("Failed to sign up. Please try again.");
        }
    };

    return (
        <div>
            <SignUpView 
                name={name} 
                setName={setName} 
                email={email} 
                password={password} 
                setEmail={setEmail} 
                setPassword={setPassword} 
                handleClick={handleSignUp} 
            />
        </div>
    );
};

export default SignUpContainer;
