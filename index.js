import express from "express";
import axios from "axios";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

const app = express();
const PORT = 3000;
const token = process.env.WEBHOOK_VERIFY_TOKEN;

app.get("/", (req, res) => {
  res.send("Server is live with ES modules!");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode && token === WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
