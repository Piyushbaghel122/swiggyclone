import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/changepassword");
        console.log("Connection to DB successful");
    }
    catch (error) {
        console.log(error, "error");
    }
};
