const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRouter");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/auth", authRouter);

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
