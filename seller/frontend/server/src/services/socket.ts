import dotenv from "dotenv" ;
dotenv.config();
import { Server, Socket } from "socket.io" ; 
import http from 'http';
import app from "../app";




const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: ["http://localhost:3001"] ,
        credentials: true
    }
});

io.on("connection", (socket: Socket) => {
    console.log("Socket connected" , socket.id);

    socket.on("disconnect" , () => {
        console.log("Socket disconnected" , socket.id);
    });
    
    socket.emit("message" , "hello");
});

export default io;
