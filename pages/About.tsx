import React from 'react';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">About Alino Stats</h1>
      <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          Alino Stats provides data-driven football predictions using a proprietary machine learning model. Our goal is to offer clean, insightful, and reliable analytics for football enthusiasts.
        </p>
        <p>
          Our backend pipeline leverages the SportMonks API for raw data, which is processed nightly by a Cloudflare Worker and stored in a Neon Database. The predictions are then served via a high-performance Edge API.
        </p>
        <h2 className="text-2xl font-bold pt-4">Changelog</h2>
        <p>
          <strong>Version 1.2.0:</strong> Initial public release. Features daily fixture predictions for top European leagues.
        </p>
      </div>
    </div>
  );
};

export default About;