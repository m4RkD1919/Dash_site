import React from 'react';

const ShimmerBlock = ({ className }: { className?: string }) => (
    <div className={`
        animate-shimmer 
        bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        bg-[length:200%_100%]
        ${className}
    `}></div>
);


const FixtureCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-md border border-transparent dark:border-gray-700/50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ShimmerBlock className="w-5 h-5 rounded-full" />
            <ShimmerBlock className="w-24 h-4 rounded" />
          </div>
          <ShimmerBlock className="w-12 h-6 rounded-full" />
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <ShimmerBlock className="w-8 h-8 rounded-full" />
            <ShimmerBlock className="w-3/5 h-5 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <ShimmerBlock className="w-8 h-8 rounded-full" />
            <ShimmerBlock className="w-3/5 h-5 rounded" />
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <ShimmerBlock className="w-1/4 h-4 rounded" />
            <ShimmerBlock className="w-1/6 h-4 rounded" />
          </div>
          <ShimmerBlock className="w-full h-2 rounded-full" />

          <div className="flex justify-between items-center pt-1">
            <ShimmerBlock className="w-1/3 h-4 rounded" />
            <ShimmerBlock className="w-1/6 h-4 rounded" />
          </div>
          <ShimmerBlock className="w-full h-2 rounded-full" />
        </div>
    </div>
  );
};

export default FixtureCardSkeleton;