import React, { useEffect, useState } from 'react';
import RepoChart from './RepoChart';

const repoList = [
  'freeCodeCamp/freeCodeCamp',
  'facebook/react',
  'vercel/next.js',
  'nodejs/node',
  'axios/axios',
  'nestjs/nest'
];

function RepoCard({ repoData }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      width: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{repoData.full_name}</h3>
      <p>⭐ Stars: {repoData.stars}</p>
      <p>🍴 Forks: {repoData.forks}</p>
      <p>🐞 Open Issues: {repoData.open_issues}</p>
      <p>🕒 Last Updated: {new Date(repoData.last_updated).toLocaleString()}</p>
    </div>
  );
}

function RepoGrid() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await Promise.all(
        repoList.map(async (repo) => {
          try {
            const res = await fetch(`http://localhost:5050/api/github/status?repo=${repo}`);
            const data = await res.json();
            return data;
          } catch (err) {
            console.error(`Error loading ${repo}`, err);
            return { full_name: repo, error: true };
          }
        })
      );
      setRepos(results);
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>📊 GitHub Repo Monitor</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {repos.map((repo, idx) => (
          <RepoCard key={idx} repoData={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepoGrid;
