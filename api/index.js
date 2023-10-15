import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import placesRoute from "./routes/places.js";
import roomsRoute from "./routes/rooms.js";
import emergencyRoute from './routes/emergencyRoute.js'; // Import the new route
import safetyRoute from './routes/safetyRoute.js'; // Import the new route
import emergencyContactRoute from './routes/emergencyContactRoute.js'; // Import the new route
import tripsRoute from "./routes/trips.js";
import virtualToursRoute from "./routes/virtualTours.js" // Import the new route
import postsRoute from "./routes/postRoute.js";
import commentsRoute from "./routes/commentRoute.js";

import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/places", placesRoute);
app.use("/api/rooms", roomsRoute);
app.use('/api/emergencyfacilities', emergencyRoute); // Add the new route
app.use('/api/destinationsafetytips', safetyRoute); // Add the new route
app.use('/api/emergencyContacts', emergencyContactRoute); // Add the new route
app.use('/api/trips', tripsRoute); // Add the new route
app.use('/api/virtualTour',virtualToursRoute);// Add the new route
app.use('/api/posts', postsRoute); // Add the posts route
app.use('/api/comments', commentsRoute); // Add the comments route



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
