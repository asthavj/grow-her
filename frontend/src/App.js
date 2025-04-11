import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components from the components folder
import Signin from './components/signin';
import MainFeed from './components/mainfeed';
import Connections from './components/connection';
import News from './components/news';
import Profile from './components/profile';
 import Forum from './components/forum';
import InvestorSignup from './components/investor';
import BusinessSignup from './components/business';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/mainfeed" element={<MainFeed />} />
        <Route path="/connection" element={<Connections />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/investor" element={<InvestorSignup />} />
        <Route path="/business" element={<BusinessSignup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
