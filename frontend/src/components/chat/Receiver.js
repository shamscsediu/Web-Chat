import React from 'react';

const Receiver = ({msg}) => {
    return (
        <div className="d-flex justify-content-start mb-4"
             style={msg.status === 0 ? {backgroundColor: "rgb(88 137 151 / 17%)"} : null}>
            {/*<div className="img_cont_msg">*/}
            {/*    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"*/}
            {/*         className="rounded-circle user_img_msg"/>*/}

            {/*</div>*/}
            <div className="circle-img rounded-circle img_cont_msg">
                <div className="name-inside">
                    {(msg.user.first_name?.charAt(0) + msg.user.last_name?.charAt(0)).toUpperCase()}
                </div>
            </div>
            <div className="msg_cotainer">
                {msg.content}
                {msg.attachments.map((attachment) => {
                    return <div className="mb-2" key={attachment.id}>
                        <img src={`http://localhost:8000${attachment.media}`} height="140" width="180" alt=""/>
                    </div>
                })}
                {/*<span className="msg_time">8:40 AM, Today</span>*/}
            </div>
        </div>
    );
};

export default Receiver;