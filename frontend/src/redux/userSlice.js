import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
export const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: user ? user : null,
        onlineUsers: []
    },
    reducers: {
        updateUser: (state, action) => {
            state.userData = action.payload
        },
        deleteUser: (state) => {
            state.userData = null
        },
        updateOnlineUser: (state, action) => {
            try {
                state.onlineUsers = action.payload
                console.log("from dispatch", state.onlineUsers)
            } catch (e) {
                console.log(e)
            }
        }
        // removeOnlineUser: (state, action) => {
        //     try {
        //         state.onlineUsers = state.onlineUsers.filter((user) => user.email !== action.payload);
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

    },
});

export const {updateUser, deleteUser, updateOnlineUser, removeOnlineUser} = userSlice.actions;

export default userSlice.reducer;