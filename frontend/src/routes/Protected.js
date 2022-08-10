import React from 'react';
import {Navigate} from "react-router-dom";

const Protected = ({loggedIn, children}) => {
    console.log(loggedIn)
    if (!loggedIn){
        return <Navigate to='/login' replace />
    }
    return children;
};

export default Protected;