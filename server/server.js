const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/routes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.CONNECTION_URL;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
