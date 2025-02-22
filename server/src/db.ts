import mongoose from "mongoose";

export async function timeoutPromise(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, time)
  })
}

async function connectDb() {
  try {

    const db = mongoose.connection

    // This event handler will log a message when MongoDB connects successfully
    db.on(("connected"), () => {
      console.log("MongoDB has been connected.")
    })

    // Connecting event handler
    db.on(("connecting"), () => {
      console.log("Connecting with mongoDb")
    })

    // Disconnected event handler
    db.on("disconnected", async () => {
      console.log("Mongodb has been disconnected. Retrying again in 3 seconds.")
      await timeoutPromise(3000)
      connectDb()
    })

    // Error event
    db.on("error", async () => {
      console.log("Error connecting with mongoDB. Retrying again in 3 seconds.")
      await timeoutPromise(3000)
      connectDb()
    })

    // Reconnected
    db.on("reconnected", () => console.log("MongoDB has been reconnected."))


    await mongoose.connect(process.env.DB_URI, {
      dbName: "job-pilot",
    })


  } catch (error) {
    console.log("Error connecting with MongoDB:", error)
    console.log("Retrying connecting with mongoDB after 3 seconds")
    await timeoutPromise(3000)
    connectDb()
  }
}


export default connectDb;

