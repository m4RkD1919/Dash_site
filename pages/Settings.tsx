import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Settings</h1>
      <div className="mt-8 space-y-6">
        <div>
            <h2 className="text-xl font-semibold">Appearance</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Theme settings are managed via the icon in the header.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="default-league" className="font-medium">Default League</label>
              <select id="default-league" className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                <option>None</option>
                <option>Premier League</option>
                <option>La Liga</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Data</h2>
           <div className="mt-4 flex justify-between items-center">
                <label htmlFor="advanced-metrics" className="font-medium">Show advanced metrics</label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="advanced-metrics" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;