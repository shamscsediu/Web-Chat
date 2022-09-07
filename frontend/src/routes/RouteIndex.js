import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from '../App';
import Login from '../pages/authentication/Login';
import Dashboard from '../pages/dashboard';
import Protected from "./Protected";
import {useSelector} from "react-redux";
import Message from "../pages/message";
import Register from "../pages/authentication/Register";
import Profile from "../pages/dashboard/Profile";

const RouteIndex = () => {
    const {isLoggedIn} = useSelector((state) => state.auth);
    const message = useSelector(state => state.message)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={
                    <Protected loggedIn={isLoggedIn}>
                        <Dashboard/>
                    </Protected>}/>
                <Route path={"/profile/"+ message.receiver?.id} element={
                    <Protected loggedIn={isLoggedIn}>
                        <Profile user={message.receiver}/>
                    </Protected>}/>
                <Route path="/message" element={
                    <Protected loggedIn={isLoggedIn}>
                        <Message/>
                    </Protected>}/>
            </Routes>
        </BrowserRouter>);
};

export default RouteIndex;