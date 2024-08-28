import mongoose from "mongoose";
import dotenv from 'dotenv';

const connect = async() => {
    try {
        dotenv.config();
        const username = process.env.USER;
        const password = process.env.PASSWORD;

        const uri = `mongodb+srv://${username}:${password}@cluster0.ogctnjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(uri);
        console.log("connected to database successfully");
    } catch(error) {
            console.log("Unable to connect to database",error);
    }
};

export default connect;