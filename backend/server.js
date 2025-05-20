require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: JSON.parse(process.env.FRONTEND_URL) }));

app.use(express.json());

connectDB();

app.use("/api/questions", require("./routes/questions"));
app.use("/api/responses", require("./routes/responses"));
app.use("/api/admin", require("./routes/admin"));

// For production
if (process.env.NODE_ENV?.trim().toLowerCase() === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    try {
      res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    } catch (error) {
      throw new Error(error);
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
