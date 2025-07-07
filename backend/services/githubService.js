const axios = require('axios');

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

async function getRepoInfo(repo) {
  try {
    console.log(`Fetching data for ${repo}`);
    const res = await axios.get(`https://api.github.com/repos/${repo}`, {
      headers,
    });

    return {
      full_name: res.data.full_name,
      stars: res.data.stargazers_count,
      forks: res.data.forks_count,
      open_issues: res.data.open_issues_count,
      last_updated: res.data.updated_at,
    };
  } catch (error) {
    console.error('❌ GitHub API Error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getRepoInfo };
