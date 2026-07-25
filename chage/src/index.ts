import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./mongodb";
import redis from "./redis";


async function startSrver(){
  try{
      await connectDB();
  await redis.connect();
}catch(error){
  console.log(error , "error");
}
}
startSrver();
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`server port ${PORT}`);
});
