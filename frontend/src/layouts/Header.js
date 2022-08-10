import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../actions/auth";
import {clearMessage} from "../actions/message";
import {history} from "../helpers/history";

const Header = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);
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
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/message"} className="nav-link">
                                Message
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">
                                {currentUser.username}
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