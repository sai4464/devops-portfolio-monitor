const express = require('express');
const router = express.Router();
const { getRepoInfo } = require('../services/githubService');

router.get('/status', async (req, res) => {
  const repo = req.query.repo;
  if (!repo) return res.status(400).json({ error: 'Repo query param is required' });

  try {
    const data = await getRepoInfo(repo);
    res.json(data);
  } catch (err) {
    console.error('GitHub API error:', err);
    res.status(500).json({ error: 'Failed to fetch repo info' });
  }
});
const Log = require('../models/Log');

router.get('/history', async (req, res) => {
  const repo = req.query.repo;
  try {
    const logs = await Log.find({ repo }).sort({ timestamp: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
