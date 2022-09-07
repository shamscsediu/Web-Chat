import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../actions/auth";
import {clearMessage} from "../actions/message";
import {history} from "../helpers/history";
import {updateOnlineUser, updateUser} from "../redux/userSlice";
import AuthService from "../services/authService";
import {io} from "socket.io-client";
import socket from "../configs/socketConfig";

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            const currUser = AuthService.getCurrentUser();
            console.log(currUser)
            if (currUser) {
                dispatch(updateUser(currUser));
            }
        }

    }, [])
    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            socket?.emit("newUser", user.userData);
        }

    }, [socket, user.userData]);

    useEffect(() => {
        socket?.on("getOnlineUsers", (data) => {
            dispatch(updateOnlineUser(data));
        });
    }, [socket])
    const logOut = () => {
        dispatch(logout());
    };
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    WebChat
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>

                </div>
                {user.userData ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/message"} className="nav-link">
                                Message
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {user.userData.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li> */}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;