import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { setClear } from '../../store/AuthSlice';
import { AppDispatch, RootState } from '../../store/store';
import TodoButton from '../../components/base/TodoButton';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if(!user){
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(setClear());
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };    

    return <TodoButton onClick={handleLogout}>Logout</TodoButton>;
};

export default Logout;
