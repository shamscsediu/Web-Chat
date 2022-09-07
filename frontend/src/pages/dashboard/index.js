import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import api from "../../services/api";
import Layout from "../../layouts/Layout";
import UserInfo from "../../components/user/UserInfo";

const Dashboard = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <Layout>
        <UserInfo user={user}/>

    </Layout>
  );
};
export default Dashboard;
