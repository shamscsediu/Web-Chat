import React, {useEffect, useState} from 'react';
import socket from "../../configs/socketConfig";
import {useSelector} from "react-redux";

const ActiveStatus = ({contact}) => {
    const onlineUsers = useSelector(state => state.user.onlineUsers)
    return (
        <span className={onlineUsers.find((user) => user.email === contact.email)  ? "online_icon": "offline_icon"}></span>

    );
};

export default ActiveStatus;