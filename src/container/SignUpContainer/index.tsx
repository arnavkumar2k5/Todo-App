import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../utils/firebase';
import { setError, setLoading, setUser } from '../../store/AuthSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import SignUpView from '../../view/SignUpView';
import { doc, setDoc } from 'firebase/firestore';

const SignUpContainer: React.FC = () => {
    const [name, setName] = useState<string>('');
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            dispatch(setUser({ ...userCredential.user, accessToken: idToken }));
            await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                name,
                email,
            });
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <SignUpView name={name} setName={setName} email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleClick={handleLogin}/>
        </div>
    );
};

export default SignUpContainer;
