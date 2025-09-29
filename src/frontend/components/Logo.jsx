import React from 'react';

/**
 * Universal Logo component
 * Uses the provided embed URL and renders at a balanced medium size.
 * Keep height/width modest for visual balance across pages.
 */
const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`} aria-label="Healthcare Logo">
      <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-md shadow-sm ring-1 ring-emerald-200">
        <iframe
          src="https://assets.pinterest.com/ext/embed.html?id=9499849210202758"
          title="health-medical-logo"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <span className="ml-2 text-lg sm:text-xl font-bold text-emerald-700 tracking-tight">MediManage</span>
    </div>
  );
};

export default Logo;


