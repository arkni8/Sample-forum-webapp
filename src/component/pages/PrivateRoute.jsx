import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GetAuth } from '../../context/authContext';

function PrivateRoute({ children }) {

    const { isLoading, currentUser } = GetAuth();
    const location = useLocation();

    if (isLoading) return <div className='flex w-full place-content-between place-items-center'>
        <div className='mx-auto flex w-max flex-row mt-10 gap-5'>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-bounce"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
        </div>
    </div>

    return (
        !currentUser ? (<Navigate to='/login' state={{ from: location }} replace />)
            : children
    );
}

export default PrivateRoute;