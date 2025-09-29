import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 p-8">
      <div className="w-5 h-5 rounded-full animate-pulse bg-indigo-600"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-amber-400 delay-75"></div>
      <div className="w-5 h-5 rounded-full animate-pulse bg-emerald-500 delay-150"></div>
    </div>
  );
};

export default Loader;