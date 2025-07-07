const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  repo: String,
  timestamp: { type: Date, default: Date.now },
  stars: Number,
  forks: Number,
  open_issues: Number,
  latest_commit_sha: String,
  last_updated: String
});

module.exports = mongoose.model('Log', logSchema);
