import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from '../App';
import Login from '../pages/authentication/Login';
import Dashboard from '../pages/dashboard';
import Protected from "./Protected";
import {useSelector} from "react-redux";
import Message from "../pages/message";
import {io} from "socket.io-client";

const RouteIndex = () => {
    const {isLoggedIn} = useSelector((state) => state.auth);
    useEffect(()=>{
        const socket = io("http://127.0.0.1:5000");
        console.log(socket)
    },[])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={
                    <Protected loggedIn={isLoggedIn}>
                        <Dashboard/>
                    </Protected>}/>
                <Route path="/message" element={
                    <Protected loggedIn={isLoggedIn}>
                        <Message/>
                    </Protected>}/>
            </Routes>
        </BrowserRouter>);
};

export default RouteIndex;