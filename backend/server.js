const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const port = 5000;
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bannerSchema = new mongoose.Schema({
  image: String,
  text: String,
  link: String,
});
const Banner = mongoose.model("Banner", bannerSchema);

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});
const Category = mongoose.model("Category", categorySchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

app.get("/api/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
