import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute =()=>{
    const auth = localStorage.getItem('user')               // take value from local-Storage
    return auth? <Outlet /> : <Navigate to='/signup' />     // check auth or not?
}
export default PrivateRoute;