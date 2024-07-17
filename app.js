const express = require("express");
const mongoose = require("mongoose");
const {config} = require("dotenv");
const userRouter = require("./userRouter");
config();

const app = express();
app.use(express.json());
app.use("/users", userRouter);


const connectToMongoDB = async () => {
try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("--Connected to MongoDB--")
    runServer();
} catch (e) {
    console.log("Failed to connect to MongoDB..")
}
};


const runServer = () => {
    app.listen(process.env.PORT, () => {
        console.log("Server is started..")
    })
};
connectToMongoDB();