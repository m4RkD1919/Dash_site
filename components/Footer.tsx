import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Alino Stats. All rights reserved.</p>
        <p className="mt-1">Data provided by sources. Model version v1.2.0.</p>
      </div>
    </footer>
  );
};

export default Footer;