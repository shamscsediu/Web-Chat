import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from '../App';
import Login from '../pages/authentication/Login';
import Dashboard from '../pages/dashboard';
import Protected from "./Protected";
import {useSelector} from "react-redux";
import Message from "../pages/message";

const RouteIndex = () => {
    const {isLoggedIn} = useSelector((state) => state.auth);
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