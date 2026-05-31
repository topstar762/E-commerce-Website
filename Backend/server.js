const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce API Running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});