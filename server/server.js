import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// upload/error handler — keeps multer failures in the { success, message }
// shape the client reads, instead of Express's default HTML 500 page
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image is too large. Maximum size is 5MB."
        : err.message;
    return res.status(400).json({ success: false, message });
  }
  if (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ Server failed to start:", err);
}

export default app;
