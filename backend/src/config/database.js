import mongoose from "mongoose"


// when we throw inside a async function it marks the promise returned by the function as rejected
async function connectDb() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully ")

    } catch (error) {
        throw new Error("Mongo DB connection Failed")
    }
}


export { connectDb }