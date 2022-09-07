import {configureStore} from "@reduxjs/toolkit";
import {applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import messageReducer from "./messageSlice"
import auth from "../reducers/auth"
import userReducer from "./userSlice";
const middleware = [thunk];
export const store = configureStore({
    reducer: {
        message: messageReducer,
        auth,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});
export default store;