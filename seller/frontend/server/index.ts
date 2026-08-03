import app from "./src/app";
import http from "http";
import io from "./src/services/socket";
import ConnectDB from "./src/config/db";
import redis from "./src/config/redis";

async function startServer () {
   try{
     await ConnectDB();
     await redis.connect();
   }catch(error){
    console.log("error" , error)
   }

}

startServer();

const Server = http.createServer(app);

io.attach(Server);

const PORT  = 8003 

Server.listen(PORT , () => {
  console.log(`Server is running at ${PORT}`)
})