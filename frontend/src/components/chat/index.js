import React, {useEffect} from 'react';
import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import './css/main.css';
import {Helmet} from "react-helmet";
import SearchUser from "./SearchUser";
import Conversation from "./Conversation";
import ChatSidebar from "./ChatSidebar";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../redux/userSlice";
import {useLocation} from "react-router-dom";
import socket from "../../configs/socketConfig";

const Chat = (props) => {

    return (
        <div className="container-fluid h-100 mt-5">
            <Helmet>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
                      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
                      crossOrigin="anonymous"/>

            </Helmet>
            <div className="row justify-content-center h-100">
                <div className="col-md-4 col-xl-3 chat">
                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                        <SearchUser/>
                        <ChatSidebar/>
                        <div className="card-footer"></div>
                    </div>
                </div>
                <Conversation/>
            </div>
        </div>
    );
};

export default Chat;