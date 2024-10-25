import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { setError, setLoading, setUser } from '../../store/AuthSlice';
import { AppDispatch, RootState } from '../../store/store';
import SignInView from '../../view/SignInView';
import { useNavigate } from 'react-router-dom';

const SignInContainer: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if(user){
            navigate('/home');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        dispatch(setLoading(true));
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            dispatch(setUser({ ...userCredential.user, accessToken: idToken }));
            navigate("/home");
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <SignInView email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleClick={handleLogin}/>
        </div>
    );
};

export default SignInContainer;
