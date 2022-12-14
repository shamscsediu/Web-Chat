import Header from "./Header";
import React, {Fragment, useState} from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {register} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";


const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: '', last_name: '', username: '', email: '', password: ''
    })
    const [loading, setLoading] = useState(false);
    const {isLoggedIn} = useSelector((state) => state.auth);
    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setUser((prev => ({
            ...prev, [e.target.name]: e.target.value
        })))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(register(user.first_name, user.last_name, user.username, user.email, user.password))
            .then((r) => {
                setLoading(false);
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            });
    };
    if (isLoggedIn) {
        return <Navigate to="/message"/>;
    }
    if (loading) {
        return <Loader/>
    }
    return (<Fragment>
        <Header/>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-26">Welcome</span>
                        <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font"></i>
              </span>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is: a@b.c"
                        >
                            <input
                                className={'input100' + (user.first_name ? ' has-val' : '')}
                                value={user.first_name}
                                onChange={handleChange}
                                type="text"
                                name="first_name"
                            />
                            <span
                                className="focus-input100"
                                data-placeholder="first_name"
                            ></span>
                        </div>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is: a@b.c"
                        >
                            <input
                                className={'input100' + (user.last_name ? ' has-val' : '')}
                                value={user.last_name}
                                onChange={handleChange}
                                type="text"
                                name="last_name"
                            />
                            <span
                                className="focus-input100"
                                data-placeholder="last_name"
                            ></span>
                        </div>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is: a@b.c"
                        >
                            <input
                                className={'input100' + (user.username ? ' has-val' : '')}
                                value={user.username}
                                onChange={handleChange}
                                type="text"
                                name="username"
                            />
                            <span
                                className="focus-input100"
                                data-placeholder="username"
                            ></span>
                        </div>

                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is: a@b.c"
                        >
                            <input
                                className={'input100' + (user.email ? ' has-val' : '')}
                                value={user.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                            />
                            <span
                                className="focus-input100"
                                data-placeholder="Email"
                            ></span>
                        </div>

                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Enter password"
                        >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye"></i>
                </span>
                            <input
                                className={'input100' + (user.password ? ' has-val' : '')}
                                value={user.password}
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                            <span
                                className="focus-input100"
                                data-placeholder="Password"
                            ></span>
                        </div>
                        <div>
                <span>
                  {message}
                </span>
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button onClick={handleSubmit} className="login100-form-btn">
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        <div className="text-center p-t-115">
                            <span className="txt1">Have an account?</span>
                            <Link className="txt2" to='/login'>
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>);
};
export default Register;
