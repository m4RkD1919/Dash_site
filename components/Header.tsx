import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SoccerBallIcon, MenuIcon, XIcon, SunIcon, MoonIcon, SettingsIcon } from './icons/Icons';

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors hover:text-accent ${
        isActive ? 'text-accent' : 'text-gray-500 dark:text-gray-400'
      }`
    }
  >
    {children}
  </NavLink>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <SoccerBallIcon className="h-6 w-6 text-accent" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">Alino Stats</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem to="/dashboard">Today</NavItem>
            <NavItem to="/week-view">Week View</NavItem>
            <NavItem to="/leagues">Leagues</NavItem>
            <NavItem to="/teams">Teams</NavItem>
            <NavItem to="/about">About</NavItem>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <Link to="/settings" className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <SettingsIcon className="h-5 w-5"/>
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-2 p-4">
            <NavItem to="/dashboard">Today</NavItem>
            <NavItem to="/week-view">Week View</NavItem>
            <NavItem to="/leagues">Leagues</NavItem>
            <NavItem to="/teams">Teams</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/settings">Settings</NavItem>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
