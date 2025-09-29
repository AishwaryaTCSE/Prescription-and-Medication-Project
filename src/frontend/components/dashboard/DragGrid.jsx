import React, { useState, useCallback } from 'react';
import WidgetCard from './WidgetCard';

/**
 * DragGrid - lightweight HTML5 drag-and-drop grid without external deps.
 * Props:
 * - widgets: [{ id, title, element }]
 */
const DragGrid = ({ widgets = [] }) => {
  const [order, setOrder] = useState(widgets.map(w => w.id));

  const onDragStart = useCallback((e, id) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (!draggedId || draggedId === targetId) return;

    const newOrder = [...order];
    const from = newOrder.indexOf(draggedId);
    const to = newOrder.indexOf(targetId);
    if (from === -1 || to === -1) return;
    newOrder.splice(to, 0, newOrder.splice(from, 1)[0]);
    setOrder(newOrder);
  }, [order]);

  const list = order
    .map(id => widgets.find(w => w.id === id))
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map(w => (
        <div
          key={w.id}
          draggable
          onDragStart={(e) => onDragStart(e, w.id)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, w.id)}
        >
          <WidgetCard
            title={w.title}
            draggableProps={{}}
            dragHandleProps={{}}
          >
            {w.element}
          </WidgetCard>
        </div>
      ))}
    </div>
  );
};

export default DragGrid;
