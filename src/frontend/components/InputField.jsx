import React from 'react';

const InputField = ({ label, type = 'text', id, value, onChange, error, className, ...props }) => {
  const inputClasses = `w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500'
  }`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <p id={`${id}-error`} className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;