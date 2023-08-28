import express from "express";
import dotenv from "dotenv";

// Databse connection import
import connectDb from "./database/connection";
// importing routes
import userRoutes from "./routes/user/userRoutes";
import adminRoutes from "./routes/admin/adminRoutes";

const app = express();
dotenv.config();
app.use(express.json());

// Routing
app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    messaga: "Welcome To The BasketHunt Chat app Server",
  });
});
app.use("/api/v1/user", userRoutes);
app.use("api/v1/admin", adminRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  connectDb()
    .then(() => {
      console.log(
        `Server is Running on http://localhost:${PORT}\nDatabase Connected Successfully.....`
      );
    })
    .catch((error) => {
      console.log("Server is running but Database Connection Failed.");
      console.log(error);
    });
  // console.log(`Server is Running on http://localhost:${PORT}`);
});
