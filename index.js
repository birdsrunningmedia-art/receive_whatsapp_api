import express from "express";
import axios from "axios";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Renamed for clarity so it matches what you use below
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

app.get("/", (req, res) => {
  res.send("Server is live with ES modules!");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  // 1. Check if mode and token exist
  // 2. Validate mode is 'subscribe' AND token matches your env variable
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");

    // Explicitly set Content-Type to text/plain
    return res.status(200).header("Content-Type", "text/plain").send(challenge);
  } else {
    // Return 403 Forbidden if verification fails
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
