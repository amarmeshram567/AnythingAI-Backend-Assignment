import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, role }) => {
    const { user } = useAppContext()

    // not logged in
    if (!user) {
        return <Navigate to='/' replace />
    }

    // role check 
    if (role && user.role !== role) {
        return <Navigate to='/dashboard' replace />
    }


    return children

}

export default ProtectedRoutes;
