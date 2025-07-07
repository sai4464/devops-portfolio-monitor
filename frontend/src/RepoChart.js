import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function RepoChart({ repo = "freeCodeCamp/freeCodeCamp" }) {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/github/history?repo=${repo}`)
      .then((res) => res.json())
      .then((data) => setLogData(data))
      .catch((err) => console.error("Chart load error:", err));
  }, [repo]);

  if (!logData.length) return <p style={{ textAlign: 'center' }}>Loading chart...</p>;

  const chartData = {
    labels: logData.map((log) =>
      new Date(log.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Stars ⭐',
        data: logData.map((log) => log.stars),
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.3,
      },
      {
        label: 'Forks 🍴',
        data: logData.map((log) => log.forks),
        fill: false,
        borderColor: '#22c55e',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ width: '90%', maxWidth: '800px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>📈 {repo} — Stars & Forks Over Time</h2>
      <Line data={chartData} />
    </div>
  );
}

export default RepoChart;
