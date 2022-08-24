import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessage} from "../../services/messageService";

const ConversationFooter = ({receiver}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text){
            const data = {
                content : text,
                receiver : receiver
            }
            await sendMessage(data, dispatch)
        }

    }
    return (
        <div className="card-footer">
            <div className="input-group">
                <div className="input-group-append">
                                    <span className="input-group-text attach_btn"><i
                                        className="fas fa-paperclip"></i></span>
                </div>
                <textarea name="" className="form-control type_msg" onChange={(e) => setText(e.target.value)}
                          value={text}
                          placeholder="Type your message..."></textarea>
                <div className="input-group-append">
                                    <span className="input-group-text send_btn">
                                        <button onClick={handleSubmit}><i className="fas fa-location-arrow"></i></button>
                                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConversationFooter;