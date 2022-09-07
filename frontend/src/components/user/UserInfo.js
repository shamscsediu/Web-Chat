import React from 'react';

const UserInfo = ({user}) => {
    return (
        <>
            <div className="cover_hero">
                <div className="pro_pic_container circle-img rounded-circle">

                    {/*<img className="pro_pic" height={200} width={200}*/}
                    {/*     src="https://images.unsplash.com/photo-1624797432677-6f803a98acb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8&w=1000&q=80"*/}
                    {/*     alt="fe"/>*/}
                    <div className="name-inside fs-50">
                        {(user.first_name?.charAt(0) + user.last_name?.charAt(0)).toUpperCase()}
                    </div>
                </div>
            </div>
            <div className="u_info text-center">
                <h3>{user?.first_name + " " + user?.last_name}</h3>
                <p>{user?.email}</p>
            </div>
        </>
    );
};

export default UserInfo;