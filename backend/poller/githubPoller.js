const { getRepoInfo } = require('../services/githubService');
const Log = require('../models/Log');

const repos = (process.env.GITHUB_REPOS || '').split(',');

async function pollGitHub() {
  for (const repo of repos) {
    try {
      const data = await getRepoInfo(repo.trim());
      const log = new Log({
        repo,
        stars: data.stars,
        forks: data.forks,
        open_issues: data.open_issues,
        last_updated: data.last_updated,
        latest_commit_sha: 'N/A', // Can be added later if needed
      });

      await log.save();
      console.log(`✅ Logged stats for ${repo}`);
    } catch (error) {
      console.error(`❌ Failed to log for ${repo}`, error.message);
    }
  }
}

module.exports = { pollGitHub };
