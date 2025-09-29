import React, { useState, useCallback } from 'react';

const DragDropUpload = ({ onFile, accept = '.pdf,.png,.jpg,.jpeg' }) => {
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (accept && !accept.split(',').some(ext => file.name.toLowerCase().endsWith(ext.trim()))) {
        setError('Unsupported file type');
        return;
      }
      setError('');
      onFile && onFile(file);
    }
  }, [accept, onFile]);

  const pick = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setError('');
      onFile && onFile(file);
    }
  };

  return (
    <div
      onDragOver={(e)=>{e.preventDefault(); setIsOver(true);}}
      onDragLeave={()=>setIsOver(false)}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isOver ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 bg-white'}`}
    >
      <input type="file" accept={accept} onChange={pick} className="hidden" id="drop-input" />
      <label htmlFor="drop-input" className="block">
        <p className="text-gray-700 font-medium">Drag & drop prescription here</p>
        <p className="text-sm text-gray-500">or click to browse ({accept})</p>
      </label>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DragDropUpload;
