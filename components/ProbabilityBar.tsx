import React from 'react';

interface ProbabilityBarProps {
  value: number;
}

const ProbabilityBar = ({ value }: ProbabilityBarProps) => {
  const getColor = (val: number) => {
    if (val > 75) return 'from-green-400 to-green-600';
    if (val > 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`bg-gradient-to-r ${getColor(value)} h-2 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProbabilityBar;