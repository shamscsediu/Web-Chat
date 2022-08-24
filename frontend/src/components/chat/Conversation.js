import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Receiver from "./Receiver";
import Sender from "./Sender";
import ConversationFooter from "./ConversationFooter";

const Conversation = () => {
    const message = useSelector((state => state.message));
    const {user: currentUser} = useSelector((state) => state.auth);
    console.log(currentUser)
    return (
        <div className="col-md-8 col-xl-6 chat">
            {message.messages.length > 0 ?
                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight justify-content-between">
                            <div className="img_cont">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                     className="rounded-circle user_img"/>
                                <span className="online_icon"></span>
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
                        <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                        <div className="action_menu">
                            <ul>
                                <li><i className="fas fa-user-circle"></i> View profile</li>
                                <li><i className="fas fa-users"></i> Add to close friends</li>
                                <li><i className="fas fa-plus"></i> Add to group</li>
                                <li><i className="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body msg_card_body">
                        {message.messages.map((msg) => {
                            console.log("new",msg)
                            if (msg.user.id === currentUser.id) {
                                return <Sender key={msg.id} msg={msg}/>
                            } else {
                                return <Receiver key={msg.id} msg={msg}/>
                            }
                        })
                        }

                    </div>
                    <ConversationFooter receiver={message.receiver.id}/>
                </div> :
                <div className="card d-flex align-items-center justify-content-center">
                    <div className="text-light">
                        Please start a conversation to see content here
                    </div>
                </div>}
        </div>
    );
};

export default Conversation;