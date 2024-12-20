const express = require('express');
const app = express();
const PORT = 3000;
const authRoutes = require("./routes/auth.router");
const connectDB = require('./db');
app.use(express.json());

connectDB();

app.use("/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
