import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-accent">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-8 inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-accent-dark transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;