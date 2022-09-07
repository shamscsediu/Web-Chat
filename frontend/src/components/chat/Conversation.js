import React, {useState} from 'react';
import {useSelector} from "react-redux";
import ConversationFooter from "./ConversationFooter";
import ActiveStatus from "./ActiveStatus";
import Loader from "../Loader/Loader";
import ConversationBody from "./ConversationBody";
import {useNavigate} from "react-router-dom";

const Conversation = ({}) => {
    const message = useSelector(state => state.message);
    const user = useSelector(state => state.user);
    const [isHidden, setIsHidden] =useState(false)
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/profile/'+message.receiver.id);
    }

    return (
        <div className="col-md-8 col-xl-6 chat">
            {message.loading && <Loader/>}
            {message.messages?.length > 0 || message.receiver.id ?
                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight justify-content-between">
                            {/*<div className="img_cont">*/}
                            {/*    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"*/}
                            {/*         className="rounded-circle user_img"/>*/}
                            {/*    <ActiveStatus contact={message.receiver}/>*/}
                            {/*</div>*/}
                            <div className="circle-img rounded-circle img_cont">
                                <div className="name-inside fs-28">
                                    {(message.receiver.first_name?.charAt(0)+message.receiver.last_name?.charAt(0)).toUpperCase()}
                                </div>
                                    <ActiveStatus contact={message.receiver}/>
                            </div>

                            <div className="user_info">
                                <span>{message.receiver.name && message.receiver.name}</span>
                                {message.messages.length > 0 ? <p>{message.messages.length} Messages</p> : null}
                            </div>
                            <div className="video_cam ml-auto">
                                <span><i className="fas fa-video"></i></span>
                                <span><i className="fas fa-phone"></i></span>
                            </div>
                        </div>
                        <span id="action_menu_btn" onClick={() => setIsHidden(!isHidden)}><i className="fas fa-ellipsis-v"></i></span>
                        {isHidden && <div className="action_menu">
                            <ul>
                                <li onClick={handleClick}><i className="fas fa-user-circle"></i>View profile</li>
                                <li><i className="fas fa-users"></i> Add to close friends</li>
                                <li><i className="fas fa-plus"></i> Add to group</li>
                                <li><i className="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>}
                    </div>
                    <ConversationBody message={message} user={user.userData}/>

                    <ConversationFooter receiver={message.receiver} message={message} user={user.userData}/>
                </div> :
                <div className="card d-flex align-items-center justify-content-center">
                    {!message.loading && <div className="text-light">
                        Please start a conversation to see content here
                    </div>}
                </div>}
        </div>
    );
};

export default Conversation;