import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log("REQUEST MASUK:", req.method, req.url);
  next();
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});