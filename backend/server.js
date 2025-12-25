// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import courseRoutes from "./routes/courseRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/courses", courseRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(5000, () =>
//       console.log("Server running on port 5000")
//     );
//   })
//   .catch((err) => console.log(err));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-name.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/api/courses", courseRoutes);

// Port (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

// Database + Server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));

