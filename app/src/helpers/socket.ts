import { io } from "socket.io-client";

export const roomId = window.location.search.split('room=')[1]

//Socket
const socket = io('http://localhost:5000')
socket.on('connected',()=>{
   if(!roomId)alert('Te Falto la Sala. (?room=roomId)')
   socket.emit('join room',roomId)
});

export default socket