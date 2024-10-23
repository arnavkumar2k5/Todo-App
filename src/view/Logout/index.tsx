import React from 'react';
import TodoButton from '../../components/base/TodoButton';

interface LogoutProps {
    handleClick: () => void
}

const Logout: React.FC<LogoutProps> = ({
    handleClick
}) => {
    return(
        <TodoButton onClick={handleClick}>Logout</TodoButton>
    )
};

export default Logout;
