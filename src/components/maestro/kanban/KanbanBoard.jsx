import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export function KanbanBoard({ data }) {
  const [columns, setColumns] = useState(data);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Wait 5px movement before drag starts prevents accidental clicks
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    if (id in columns) {
      return id;
    }
    return Object.keys(columns).find((key) => columns[key].find((item) => item.id === id));
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const movedItem = { ...activeItems[activeIndex], priority: overContainer };

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          movedItem,
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id);

    if (
      activeContainer &&
      overContainer &&
      activeContainer === overContainer
    ) {
      const activeIndex = columns[activeContainer].findIndex((item) => item.id === active.id);
      const overIndex = columns[overContainer].findIndex((item) => item.id === over.id);

      if (activeIndex !== overIndex) {
        setColumns((prev) => ({
          ...prev,
          [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
        }));
      }
    }

    setActiveId(null);
  };

  const getActiveItem = () => {
    if (!activeId) return null;
    const activeContainer = findContainer(activeId);
    return columns[activeContainer]?.find((item) => item.id === activeId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] items-start pb-6">
        <KanbanColumn
          id="high"
          title="Prioridade Alta"
          cards={columns.high}
          color="text-red-600"
          count={columns.high.length}
          className="h-full"
        />
        <KanbanColumn
          id="medium"
          title="Prioridade Média"
          cards={columns.medium}
          color="text-amber-600"
          count={columns.medium.length}
          className="h-full"
        />
        <KanbanColumn
          id="low"
          title="Prioridade Baixa"
          cards={columns.low}
          color="text-blue-600"
          count={columns.low.length}
          className="h-full"
        />
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? <KanbanCard card={getActiveItem()} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
