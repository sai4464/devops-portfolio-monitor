# 📊 DevOps GitHub Monitor

A full-stack app to track GitHub repository stats, log weekly snapshots to MongoDB Atlas, and display real-time dashboards with charts.

## 🔧 Tech Stack

- **Frontend**: React, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Scheduler**: node-cron (weekly GitHub API polling)

## 🚀 Features

- Track multiple GitHub repos (stars, forks, issues)
- Weekly data pull using GitHub API
- Line charts showing historical stars over time
- Responsive dashboard UI with repo cards

## 📂 Folder Structure

devops-portfolio-monitor/
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── poller/
│ └── models/
├── frontend/
│ ├── src/
│ └── public/