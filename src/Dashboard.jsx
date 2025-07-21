import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <>
      <h1>System Design Problems in React</h1>
      <p>
        Welcome! Add your system design problems in <code>src/problems/</code> and they will appear here.
      </p>
      <div style={{ marginTop: 32 }}>
        <h2>Problems</h2>
        <ul>
          <li>
            <div className="card" style={{ textAlign: 'left' }}>
              <h3>News Feed</h3>
              <p>Design and implement a news feed application front end. <a href="https://www.greatfrontend.com/interviews/study/one-week/questions/system-design/news-feed-facebook" target="_blank" rel="noopener noreferrer">See details</a>.</p>
              <Link to="/news-feed">Go to News Feed</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Dashboard; 