import io from 'socket.io-client';
const IS_PROD = false
const socket = io(IS_PROD? "": "http://localhost:5000");

export default socket;