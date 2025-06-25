const express = require("express");
const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.status(200).send("I am a get Route");
});

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
