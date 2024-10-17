import React from 'react';
import TodoContainer from '../../Container/TodoContainer';
import TodoListContianer from '../../Container/TodoListContainer';

const Homeview: React.FC = () => {
  return (
    <>
    <div className='w-[50%] m-auto'>
    <TodoContainer/>
    <TodoListContianer/>
    </div>
    </>
  );
}

export default Homeview;
