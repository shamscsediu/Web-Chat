import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getContacts, getMessages, markAsRead} from "../../services/messageService";
import {
    clearChatConversation,
    clearContactsList, updateChatConversation,
    updateContactList,
    updateLoading,
    updateTypingStat
} from "../../redux/messageSlice";
import ActiveStatus from "./ActiveStatus";
import socket from "../../configs/socketConfig";
import receiveAudio from "../../assets/audio/audio_receive.wav";

const ChatSidebar = () => {
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()
    useEffect(() => {
        socket?.on("getMessage", (data) => {
            dispatch(updateContactList(data.user));
            document.title = data.user.first_name + " has sent message"
        });
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            await getContacts(dispatch);
        }
        fetchData();

        //clean up when unmount component
        return () => {
            dispatch(clearContactsList())
        }

    }, []);

    const handleClick = async (e, user) => {
        e.preventDefault();
        try {
            dispatch(updateLoading(true));
            dispatch(clearChatConversation());
            dispatch(updateTypingStat(null));
            if (message.receiver?.id) {
                // dispatch(updateTotalCount(null));
                await markAsRead(message.receiver.id)
            }
            await getMessages(user, dispatch)
            document.title = "Conversation with " + user.first_name

        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="card-body contacts_body">
            <ul className="contacts">
                {message.contacts && message.contacts.map((contact) => {
                    return <li className={message.receiver.id === contact.id ? "active" : null} key={contact.id}>
                        <div className="d-flex bd-highlight">
                            {/*<div className="img_cont">*/}
                            {/*    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"*/}
                            {/*         className="rounded-circle user_img"/>*/}
                            {/*    <ActiveStatus contact={contact}/>*/}
                            {/*</div>*/}
                            <div className="circle-img rounded-circle img_cont">
                                <div className="name-inside fs-28">
                                    {(contact.first_name?.charAt(0) + contact.last_name?.charAt(0)).toUpperCase()}
                                </div>
                                <ActiveStatus contact={contact}/>
                            </div>
                            <div className="user_info">
                                <button disabled={message?.loading} onClick={(e) => handleClick(e, contact)}>
                                    <span>{contact.first_name + ' ' + contact.last_name}</span></button>
                                {/*<p>Kalid is online</p>*/}
                            </div>
                        </div>
                    </li>
                }).reverse()}

            </ul>
        </div>
    );
};

export default ChatSidebar;