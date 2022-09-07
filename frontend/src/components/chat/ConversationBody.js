import React, {useEffect} from 'react';
import Sender from "./Sender";
import Receiver from "./Receiver";
import socket from "../../configs/socketConfig";
import receiveAudio from "../../assets/audio/audio_receive.wav";
import {updateChatConversation, updateContactList} from "../../redux/messageSlice";
import {useDispatch} from "react-redux";

const ConversationBody = ({message, user}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        socket?.on("getMessage", (data) => {
            if (message.receiver?.id === data.user.id) {
                let audio = new Audio(receiveAudio);
                audio.play().then(() => {
                    dispatch(updateChatConversation(data));
                });
            }
        });

    }, []);
    return (
        <div className="card-body msg_card_body">
            {message.messages.map((msg) => {
                if (msg.user.id === user.id) {
                    return <Sender key={msg.id} msg={msg}/>
                } else if (msg.user.id === message.receiver.id) {
                    return <Receiver key={msg.id} msg={msg}/>
                }
            }).reverse()
            }
            {message.typingStat?.typing && message.typingStat.senderId === message.receiver.id &&
                <div className="d-flex justify-content-start mb-4 typing-stat">
                    <div className="img_cont_msg">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                             className="rounded-circle user_img_msg"/>
                    </div>
                    <div className="msg_cotainer">
                        Typing....
                    </div>
                </div>}

        </div>
    );
};

export default ConversationBody;