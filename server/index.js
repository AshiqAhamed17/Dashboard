const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const GITHUB_TOKEN = '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';
app.get('/api/github', async (req, res) => {
    try {
      const username = 'AshiqAhamed17';
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}` // Add token here
        }
      });
      const { public_repos, followers, contributions } = response.data;
      res.json({
        repos: public_repos,
        followers,
        contributions,
      });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      res.status(500).send('Error fetching GitHub data');
    }
  });

app.get('/api/leetcode', async (req, res) => {
  try {
    const username = 'Ashiq17';
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const { 
      totalSolved, 
      totalQuestions, 
      easySolved, 
      mediumSolved, 
      hardSolved, 
      acceptanceRate, 
      ranking, 
      contributionPoints, 
      reputation 
    } = response.data;
    
    res.json({
      solved: totalSolved,
      ranking,
      acceptanceRate,
      contributionPoints,
      reputation,
    });
  } catch (error) {
    res.status(500).send('Error fetching LeetCode data');
  }
});

// CodeForces Stats Route
app.get('/api/codeforces', async (req, res) => {
  try {
    const username = 'AshiqAhamed'; // Replace with your Codeforces username
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const solved = response.data.result.filter(problem => problem.verdict === 'OK').length;
    const rating = response.data.result[0]?.author?.rating || 'Not Available';
    res.json({
      solved,
      rating,
    });
  } catch (error) {
    res.status(500).send('Error fetching Codeforces data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});