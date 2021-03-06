const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/Users");
const postRouter = require("./routes/Posts");
const catRouter = require("./routes/Categories");
var cors = require("cors");
const multer = require("multer");
const path = require("path");
app.use(cors());

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.dataConnect, () =>
  console.log("connected to mongoose")
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/cat", catRouter);

app.listen(process.env.portNumber, () =>
  console.log("server created at https://localhost:" + process.env.portNumber)
);
