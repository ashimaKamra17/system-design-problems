import './App.css'
import { Routes, Route } from 'react-router-dom';
import NewsFeed from './problems/news-feed/NewsFeed';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/news-feed" element={<NewsFeed />} />
      </Routes>
    </div>
  );
}

export default App
