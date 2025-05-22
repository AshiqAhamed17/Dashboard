const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: [
      "https://dashboard-nine-mauve-97.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Add headers middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://dashboard-nine-mauve-97.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
    path: req.path,
  });
});

app.get("/api/github", async (req, res) => {
  try {
    const username = "AshiqAhamed17";
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {}
    );
    const { public_repos, followers, contributions } = response.data;
    res.json({
      repos: public_repos,
      followers,
      contributions,
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    res.status(500).send("Error fetching GitHub data");
  }
});

app.get("/api/leetcode", async (req, res) => {
  try {
    const username = "Ashiq17";
    const response = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );
    const {
      totalSolved,
      totalQuestions,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking,
      contributionPoints,
      reputation,
    } = response.data;

    res.json({
      solved: totalSolved,
      ranking,
      acceptanceRate,
      contributionPoints,
      reputation,
    });
  } catch (error) {
    res.status(500).send("Error fetching LeetCode data");
  }
});

// CodeForces Stats Route
app.get("/api/codeforces", async (req, res) => {
  try {
    const username = "AshiqAhamed";
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    const userData = response.data.result[0];
    const {
      handle,
      country,
      rating,
      maxRating,
      maxRank,
      totalSolved,
      organization,
    } = userData;

    res.json({
      User: handle,
      CurrentRating: rating,
      MaxRating: maxRating,
      MaxRank: maxRank,
      TotalSolved: totalSolved,
      Country: country,
      Organization: organization,
    });
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    res.status(500).send("Error fetching Codeforces data");
  }
});

// Testing CodeChef

app.get("/api/codechef", async (req, res) => {
  try {
    const username = "ashiq_17";
    const response = await axios.get(
      `https://codechef-api.vercel.app/handle/${username}`
    );
    const { currentRating, highestRating, globalRank, countryRank, stars } =
      response.data;

    res.json({
      rating: currentRating,
      highestRating,
      globalRank,
      countryRank,
      stars,
    });
  } catch (error) {
    res.status(500).send("Error fetching CodeChef data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
