require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: JSON.parse(process.env.FRONTEND_URL) }));

app.use(express.json());

connectDB();

app.use("/api/questions", require("./routes/questions"));
app.use("/api/responses", require("./routes/responses"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
