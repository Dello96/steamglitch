const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

// server.ts
import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/gameInfo/:appId", async (req, res) => {
  const { appId } = req.params;

  try {
    const response =
      (await axios.get) <
      { [key]: { data } } >
      `https://store.steampowered.com/api/appdetails?appids=${appId}`;

    const gameData = response.data[appId].data;
    const gameInfo = {
      name: gameData.name,
      description: gameData.short_description,
      // Add more details as needed
    };
    res.json(gameInfo);
  } catch (error) {
    console.error("Error fetching game info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
