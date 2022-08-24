import {createSlice} from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        receiver: {
            id: "",
            name: "",
            active: false
        },
        messages: [],
        pending: false,
        error: false,
    },
    reducers: {
        // updateStart: (state) => {
        //   state.pending = true;
        // },
        updateChatConversation: (state, action) => {
            try {
                if (state.messages.length > 0) {
                    console.log(state.messages.length)
                    state.messages.push(action.payload)
                    console.log(state.messages)

                } else {
                    state.messages = action.payload
                }

            } catch (e) {
                console.log(e)
            }
        },
        updateChatReceiver: (state, action) => {
            try {

                state.receiver.id = action.payload.id
                state.receiver.name = action.payload.first_name + ' ' + action.payload.last_name
            } catch (e) {
                console.log(e)
            }
        },
        // updateFailure: (state) => {
        //   state.pending = false;
        //   state.error = true;
        // },
    },
});

export const {updateChatConversation, updateChatReceiver} = messageSlice.actions;

export default messageSlice.reducer;