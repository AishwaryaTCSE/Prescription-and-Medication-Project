import React from 'react';

const StepperInput = ({ value, min = 0, max = 100, step = 1, onChange }) => {
  const dec = () => onChange && onChange(Math.max(min, (value || 0) - step));
  const inc = () => onChange && onChange(Math.min(max, (value || 0) + step));
  return (
    <div className="inline-flex items-center border rounded-md overflow-hidden">
      <button type="button" className="px-3 py-2 bg-gray-50 hover:bg-gray-100" onClick={dec}>-</button>
      <input
        type="number"
        className="w-20 text-center outline-none px-2 py-2"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
      />
      <button type="button" className="px-3 py-2 bg-gray-50 hover:bg-gray-100" onClick={inc}>+</button>
    </div>
  );
};

export default StepperInput;
