import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.log(err));


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import courseRoutes from "./routes/courseRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ROOT ROUTE (FIXES Cannot GET /)
// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

// // API ROUTES
// app.use("/api/courses", courseRoutes);

// // MONGODB CONNECTION (NO app.listen)
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // EXPORT APP FOR VERCEL
// export default app;
