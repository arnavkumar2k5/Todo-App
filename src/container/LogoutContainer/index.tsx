import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import TodoButton from '../../components/base/TodoButton';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const { logOut, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        try {
            logOut();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <TodoButton onClick={handleLogout} className="bg-gray-800 hover:bg-[#DCC7AA]">
            Logout
        </TodoButton>
    );
};

export default Logout;

