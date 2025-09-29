import React from 'react';

const WidgetCard = ({ title, children, actions, className = '', draggableProps = {}, dragHandleProps = {} }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow border border-gray-100 p-4 ${className}`}
      {...draggableProps}
    >
      <div className="flex items-start justify-between mb-3" {...dragHandleProps}>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {actions}
      </div>
      <div className="text-sm text-gray-600">
        {children}
      </div>
    </div>
  );
};

export default WidgetCard;
