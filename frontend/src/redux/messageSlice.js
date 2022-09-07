import {createSlice, current} from "@reduxjs/toolkit";
import {castArray, concat, pull, remove, some} from "lodash";
export const messageSlice = createSlice({
    name: "message",
    initialState: {
        receiver: {
            id: "",
            email: "",
            name: "",
            first_name: "",
            last_name: "",
            active: false
        },
        messages: null,
        // unseenCount: null,
        contacts: [],
        loading: false,
        typingStat: null,
        error: false,
    },
    reducers: {
        updateChatConversation: (state, action) => {
            try {
                if (state.messages.length > 0) {
                    state.messages.push(action.payload)
                } else {
                    state.messages = castArray(action.payload)
                }
                console.log(state.messages, "current")
            } catch (e) {
                console.log(e)
            }
        },
        clearChatConversation: (state) => {
            try {
                state.messages = []

            } catch (e) {
                console.log(e)
            }
        },
        updateChatReceiver: (state, action) => {
            try {
                state.receiver.id = action.payload.id
                state.receiver.name = action.payload.first_name + ' ' + action.payload.last_name
                state.receiver.first_name = action.payload.first_name
                state.receiver.last_name = action.payload.last_name
                state.receiver.email = action.payload.email
            } catch (e) {
                console.log(e)
            }
        },
        updateContactList: (state, action) => {
            try {
                if (state.contacts.length > 0) {
                    if(some(state.contacts, ['id', action.payload.id]) !== true){
                        state.contacts.push(action.payload)
                    }else {
                        remove(state.contacts,['id', action.payload.id])
                        state.contacts.push(action.payload)
                    }
                } else {
                    state.contacts = castArray(action.payload);
                }
            } catch (e) {
                console.log(e)
            }
        },
        clearContactsList: (state) => {
            try {
                state.contacts = []
            } catch (e) {
                console.log(e)
            }
        },
        updateLoading: (state, action) => {
            state.loading = action.payload
        },
        updateTypingStat: (state, action) => {
            state.typingStat = action.payload
        },
        // updateTotalCount: (state, action) => {
        //     state.unseenCount = action.payload
        // }
        // updateActiveStatus: (state, action) => {
        //     try {
        //         state.active = !state.active
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
    },
});

export const {
    updateChatConversation,
    clearChatConversation,
    updateChatReceiver,
    updateContactList,
    clearContactsList,
    updateLoading,
    updateTypingStat,
    // updateTotalCount
} = messageSlice.actions;

export default messageSlice.reducer;