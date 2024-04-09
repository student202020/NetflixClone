const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const listRoutes = require("./routes/list");


const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected!!!"))
    .catch((err) => {console.log("Not connected!")})

    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/movie", movieRoutes)
    app.use("/api/list", listRoutes)
  


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });

