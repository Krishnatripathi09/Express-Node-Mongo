const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRouter");
const userRoutes = require("./routes/userRoutes");
const { fileUpload } = require("./routes/fileRouter");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/users", fileUpload);

connectDB()
  .then(() => {
    console.log("Connected to DataBase SuccessFully");
    app.listen(PORT, () => {
      console.log(`Server is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Occured :", err);
  });
