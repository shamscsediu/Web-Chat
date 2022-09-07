import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {markAsRead, sendMessage} from "../../services/messageService";
import socket from "../../configs/socketConfig";
import {updateContactList, updateTypingStat} from "../../redux/messageSlice";

const ConversationFooter = ({receiver, message, user}) => {
    const [text, setText] = useState('')
    const [files, setFiles] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        socket.on('getTypingStatus', ({typing, senderId}) => {
            if (senderId === receiver.id) {
                dispatch(updateTypingStat({typing, senderId}));
            }
        })
    }, [socket, receiver]);
    let typingTimer;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text) {
            const data = {
                content: text,
                receiver: receiver.id,
                attachments: files
            }
            await sendMessage(data, dispatch, socket, receiver.email);
            setText('')
            dispatch(updateContactList(receiver));
        }

    }
    const handleFilesChange = (e) => {
        setFiles(e.target.files)
    }
    const handleKeyUp = async (e) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            handleTypingStatus(false)
        }, 2000);
        if (e.key === 'Enter') {
            await handleSubmit(e)
        }
    }
    const handleTypingStatus = (stat) => {
        socket.emit('messageTypingStatus', {
            typing: stat,
            receiverEmail: receiver.email,
            senderId: user.id
        });
    }
    return (
        <div className="card-footer">
            <div className="input-group">
                <div className="input-group-append">
                    <label htmlFor="upload">
                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                    </label>
                    <input multiple type="file" onChange={handleFilesChange} name="attachments" id="upload"
                           style={{display: 'none'}}/>


                </div>

                <textarea name="" className="form-control type_msg"
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                          onKeyUp={handleKeyUp}
                          onMouseLeave={() => handleTypingStatus(false)}
                          onKeyDown={() => {
                              clearTimeout(typingTimer);
                              handleTypingStatus(true)
                          }}
                          placeholder="Type your message...">

                </textarea>
                <div className="input-group-append">
                                    <span className="input-group-text send_btn">
                                        <button onClick={handleSubmit}><i
                                            className="fas fa-location-arrow text-light"></i></button>
                                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConversationFooter;