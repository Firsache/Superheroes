const express = require("express");
const config = require("config");
// const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use("/superheroes", require("./routes/superheroes.routes"));
app.use(express.static("public"));

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client", "build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {});
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}
start();
