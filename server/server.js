import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
// app config
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors(
  {
    origin:[ "http://localhost:3000" , "http://localhost:5173" , "http://localhost:5174" ],
    credentials: true,
    
  }
));

// DB connection
if (process.env.MONGO_URI) {
  connectDB(process.env.MONGO_URI);
} else {
  console.error(" provide db url");
}

// Routes
app.use("/api/food", router);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
