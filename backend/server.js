require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to Connect to MongoDB: ", err);
  });

const bookSchema = mongoose.Schema({
  name: String,
  authorName: String,
  lendingPrice: Number,
  stock: Number,
  category: String,
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  phno: String,
});

const bookModel = mongoose.model("book", bookSchema);
const userModel = mongoose.model("user", userSchema);

app.get("/books", async (req, res) => {
  const books = await bookModel.find();
  res.json(books);
});

app.post("/user/register", async (req, res) => {
  const saltRounds = 10;
  const { firstName, lastName, email, password, address, phno } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phno,
      });
      await user.save();
      res.status(200).json({ message: "Successfully Registered!" });
    } else {
      res.status(501).json({ message: "User Already Exists..." });
    }
  } catch {
    res.status(500).json({ message: "Failed to Register!" });
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    const validatedUser = bcrypt.compare(password, foundUser.password);
    if (validatedUser) {
      const token = jwt.sign(
        {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          address: foundUser.address,
          phno: foundUser.phno,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "User Validated!",
        user: {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          address: foundUser.address,
          phno: foundUser.phno,
        },
        token: token,
      });
    } else {
      res.status(500).json({ message: "Failed to Validate User!" });
    }
  } else {
    res.status(404).json({ message: "User not Found!" });
  }
});

app.patch("/user/patch", async (req, res) => {
  const updatedUser = req.body;
  try {
    await userModel.findOneAndUpdate({ email: updatedUser.email }, { $set: updatedUser }, { new: true, runValidators: true });
    res.status(200).json({ message: "User Updated" });
  } catch {
    res.status(500).json({ message: "Failed to Update User" });
  }
});

app.delete("/user/delete", async (req, res) => {
  const { email } = req.body;
  try {
    await userModel.findOneAndDelete({ email: email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
