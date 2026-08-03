import db from "mongoose";

async function ConnectDB() {
    try {
        await db.connect(process.env.DATABASE_URL!);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error)
    }
}

export default ConnectDB;