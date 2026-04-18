import mongoose from "mongoose";
import dns from "dns";
import dotenv from 'dotenv'
dotenv.config();

if (!process.env.MONGODB_URL) {
    throw new Error("Please Provide MONGODB_URL in .env file");
}

// Node on this machine is failing SRV DNS resolution via the default resolver,
// so use a reliable public DNS server for MongoDB Atlas SRV lookups.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connected")
    } catch (error) {
        console.error("mongoose connection error", error)
        console.error("Check Atlas network access, IP whitelist, DNS SRV resolution, and the MONGODB_URL in .env")
        process.exit(1);
    }
}

export default connectDB;