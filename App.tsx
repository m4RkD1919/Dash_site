import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FixtureDetail from './pages/FixtureDetail';
import Leagues from './pages/Leagues';
import Teams from './pages/Teams';
import About from './pages/About';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import WeekView from './pages/WeekView';

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/week-view" element={<WeekView />} />
          <Route path="/fixture/:id" element={<FixtureDetail />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
