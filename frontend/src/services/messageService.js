import {updateChatConversation, updateChatReceiver} from "../redux/messageSlice";
import api from "./api";

export const getMessages = async (user, dispatch) => {
    try {
        const res = await api.get(`/message/entity?receiver=${user.id}`).then((res) => {
            dispatch(updateChatReceiver(user));
            dispatch(updateChatConversation(res.data.results));
        });
    } catch (err) {
        console.log(err)
    }
};

export const sendMessage = async (data, dispatch) => {
    try {
        const res = await api.post(`/message/entity`, data).then((res) => {
            dispatch(updateChatConversation(res.data.results));
        });
    } catch (err) {
        console.log(err)
    }
};