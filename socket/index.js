import * as dotenv from 'dotenv'
dotenv.config()
import {Server} from "socket.io";
const PORT = process.env.PORT || 3000;
const io = new Server({
    cors: {
        origin: process.env.BASE_URL,
    },
});

let onlineUsers = [];

const addNewUser = (email, socketId) => {
    !onlineUsers.some((user) => user.email === email) &&
    onlineUsers.push({email, socketId});
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (email) => {
    return onlineUsers.find((user) => user.email === email);
};

io.on("connection", (socket) => {
    // console.log("socket connected");

    //add new user to onlineUser list
    socket.on("newUser", (user) => {
        if (user?.email) {
            addNewUser(user.email, socket.id);
            console.log(onlineUsers)
            io.emit("getOnlineUsers", onlineUsers);
        }

    });

    //send message to the receiver
    socket.on("sendMessage", ({msg, receiverEmail}) => {
        const receiver = getUser(receiverEmail);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", msg);
        }
    });

    //message typing status to the receiver
    socket.on("messageTypingStatus", ({typing, senderId, receiverEmail}) => {
        const receiver = getUser(receiverEmail);
        if (receiver) {
            io.to(receiver.socketId).emit("getTypingStatus", {
                typing: typing,
                senderId: senderId
            });
        }
    });
    //
    // socket.on("sendText", ({ senderName, receiverName, text }) => {
    //   const receiver = getUser(receiverName);
    //   io.to(receiver.socketId).emit("getText", {
    //     senderName,
    //     text,
    //   });
    // });
    //
    socket.on("disconnect", () => {
        console.log("socket disconnected");
        removeUser(socket.id);
        io.emit("getOnlineUsers", onlineUsers);

    });
});

io.listen(PORT);