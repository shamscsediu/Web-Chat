import React from 'react';
import UserInfo from "../../components/user/UserInfo";
import Layout from "../../layouts/Layout";

const Profile = ({user}) => {
    return (
        <Layout>
            <UserInfo user={user}/>
        </Layout>
    );
};

export default Profile;