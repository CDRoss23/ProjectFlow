'use client';

import React, { useState } from 'react';
import Sliderbar from '../componentes/sliderbar';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/app/componentes/SortableItem';

// Datos de ejemplo
const initialColumns = [
    {
        id: 'todo',
        title: 'Por Hacer',
        items: [
            { id: '1', content: 'Tarea 1' },
            { id: '2', content: 'Tarea 2' },
        ],
    },
    {
        id: 'in-progress',
        title: 'En Progreso',
        items: [
            { id: '3', content: 'Tarea 3' },
            { id: '4', content: 'Tarea 4' },
        ],
    },
    {
        id: 'done',
        title: 'Completado',
        items: [
            { id: '5', content: 'Tarea 5' },
            { id: '6', content: 'Tarea 6' },
        ],
    },
];

function Proyectos() {
    const [columns, setColumns] = useState(initialColumns);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            setColumns((prevColumns) => {
                const oldColumn = prevColumns.find((col) =>
                    col.items.find((item) => item.id === active.id)
                );
                const newColumn = prevColumns.find((col) =>
                    col.items.find((item) => item.id === over.id)
                );

                if (!oldColumn) return prevColumns;

                const oldItems = oldColumn.items;
                const oldIndex = oldItems.findIndex((item) => item.id === active.id);
                const draggedItem = oldItems[oldIndex];

                // Si es la misma columna
                if (oldColumn.id === newColumn?.id) {
                    const newItems = arrayMove(oldItems, oldIndex, oldItems.findIndex((item) => item.id === over.id));
                    return prevColumns.map((col) => {
                        if (col.id === oldColumn.id) {
                            return { ...col, items: newItems };
                        }
                        return col;
                    });
                }

                // Si es una columna diferente
                if (newColumn) {
                    const newItems = newColumn.items;
                    const newIndex = newItems.findIndex((item) => item.id === over.id);
                    const newNewItems = [...newItems];
                    newNewItems.splice(newIndex, 0, draggedItem);
                    const newOldItems = oldItems.filter((item) => item.id !== active.id);

                    return prevColumns.map((col) => {
                        if (col.id === oldColumn.id) {
                            return { ...col, items: newOldItems };
                        }
                        if (col.id === newColumn.id) {
                            return { ...col, items: newNewItems };
                        }
                        return col;
                    });
                }

                return prevColumns;
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Proyectos</h1>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 w-full overflow-x-auto pb-6">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className="flex-1 min-w-[300px] bg-gray-800 rounded-lg p-4"
                        >
                            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                            <SortableContext
                                items={column.items.map((item) => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {column.items.map((item) => (
                                        <SortableItem key={item.id} id={item.id}>
                                            <div className="bg-gray-700 p-4 rounded-lg">
                                                {item.content}
                                            </div>
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
}

export default Proyectos;