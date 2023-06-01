import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth";


const PublicRoute = () => {

    const auth = useAuth();

    if(auth){
        return <Navigate to="/" />
    }
    return <Outlet />
}


export default PublicRoute;;