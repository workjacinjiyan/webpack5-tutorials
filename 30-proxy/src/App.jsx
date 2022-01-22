import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';

const App = () => {
  const [title, setTitle] = useState('前端');

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <h2>{title}</h2>
      <Router>
        <Link to="/home" children="去Home" />
        <Link to="/about" children="去About" />
        <Route path="/home" render={() => <Home />} />
        <Route path="/about" render={() => <About />} />
      </Router>
    </div>
  );
};

export default App;
