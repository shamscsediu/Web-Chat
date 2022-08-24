import React from 'react';

const ChatSidebar = () => {
    return (
        <div className="card-body contacts_body">
            <ul className="contacts">
                <li className="active">
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                 className="rounded-circle user_img"/>
                            <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                            <span>Khalid</span>
                            <p>Kalid is online</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img
                                src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                                className="rounded-circle user_img"/>
                            <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                            <span>Taherah Big</span>
                            <p>Taherah left 7 mins ago</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img
                                src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg"
                                className="rounded-circle user_img"/>
                            <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                            <span>Sami Rafi</span>
                            <p>Sami is online</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img
                                src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"
                                className="rounded-circle user_img"/>
                            <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                            <span>Nargis Hawa</span>
                            <p>Nargis left 30 mins ago</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img
                                src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
                                className="rounded-circle user_img"/>
                            <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                            <span>Rashid Samim</span>
                            <p>Rashid left 50 mins ago</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ChatSidebar;