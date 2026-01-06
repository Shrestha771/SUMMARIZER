const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node server is running");
});

app.post("/summarize", async (req, res) => {
    console.log("Incoming body:", req.body);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/summarize",
      {
        text: req.body.text,
        max_length: req.body.max_length || 200
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Error communicating with FastAPI"
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node server running on http://localhost:${PORT}`);
});
