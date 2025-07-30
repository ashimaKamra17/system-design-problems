import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'
import NewsFeedPage from './problems/news-feed/NewsFeedPage'
import AutoCompletePage from './problems/autocomplete/AutoCompletePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/news-feed" element={<NewsFeedPage />} />
      <Route path="/autocomplete" element={<AutoCompletePage />} />
    </Routes>
  )
}

export default App
