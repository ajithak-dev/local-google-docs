import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Note from './Components/Note';
import Home from './Components/Home';
import NewCard from './Components/NewCard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/newnote" element={<NewCard />} />

        <Route path="note/:notename" element={<Note />} />
      </Routes>
    </Router>
  );
};

export default App;
