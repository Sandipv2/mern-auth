import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/mernUsers`)
        console.log("Database connected.")
    } catch(err) {
        console.log(err.message)
    }
}

export default connectDB