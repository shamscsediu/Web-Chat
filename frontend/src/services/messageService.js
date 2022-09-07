import {updateChatConversation, updateChatReceiver, updateContactList, updateLoading} from "../redux/messageSlice";
import api from "./api";

export const getMessages = async (user, dispatch) => {
    try {
        const res = await api.get(`/message/entity?receiver=${user.id}`).then((res) => {
            dispatch(updateChatReceiver(user));
            dispatch(updateChatConversation(res.data.results));
            // if(res.data.total_count){
            //     dispatch(updateTotalCount(res.data.total_count));
            // }
            dispatch(updateLoading(false));
        });
    } catch (err) {
        dispatch(updateLoading(false));
        console.log(err)
    }
};

export const sendMessage = async (data, dispatch, socket, receiverEmail) => {
    try {
        const formData = new FormData;
        for (let i = 0; i < data.attachments.length; i++) {
            formData.append('attachments', data.attachments[i])
        }
        formData.append('receiver', data.receiver)
        formData.append('content', data.content)
        const res = await api.post(`/message/entity`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            console.log('test sock', socket)
            socket.emit('sendMessage', {
                msg: res.data.results,
                receiverEmail: receiverEmail
            });
            console.log(res.data.results, "from send")
            dispatch(updateChatConversation(res.data.results));
        });
    } catch (err) {
        console.log(err)
    }
};

export const getContacts = async (dispatch) => {
    try {
        const res = await api.get(`/message/contacts`).then((res) => {
            dispatch(updateContactList(res.data.results));
        });
    } catch (err) {
        console.log(err)
    }
};

export const markAsRead = async (data) => {
    console.log(data, "mark")
    try {
        const res = await api.post(`/message/mark`, {
            receiver: data
        }).then((res) => {
            console.log(data)
        });
    } catch (err) {
        console.log(err)
    }
};