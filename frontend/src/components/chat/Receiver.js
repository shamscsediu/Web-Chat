import React from 'react';

const Receiver = ({msg}) => {
    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="img_cont_msg">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                     className="rounded-circle user_img_msg"/>
            </div>
            <div className="msg_cotainer">
                {msg.content}
                <span className="msg_time">8:40 AM, Today</span>
            </div>
        </div>
    );
};

export default Receiver;