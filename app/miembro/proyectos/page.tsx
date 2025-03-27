'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Sliderbar from '../../componentes/sliderbar';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable,
    DroppableContainer
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/app/componentes/SortableItem';

interface Tarea {
    id: number;
    nombreProyecto: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    creadoPor: string;
    estado: 'pendiente' | 'en_progreso' | 'completada';
}

interface Column {
    id: string;
    title: string;
    items: Tarea[];
}

const initialColumns: Column[] = [
    { id: '1', title: 'Por Hacer', items: [] },
    { id: '2', title: 'En Progreso', items: [] },
    { id: '3', title: 'Completada', items: [] },
];

const DroppableColumn = ({ column, children }: { column: Column, children: React.ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: { type: 'column', column }
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 min-w-[300px] bg-gray-800 rounded-lg p-4 ${
                isOver ? 'border-2 border-blue-500' : ''
            }`}
            style={{ minHeight: '200px' }}
        >
            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
            {children}
        </div>
    );
};

function Proyectos() {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [pendingMove, setPendingMove] = useState<{
        item: Tarea;
        oldColumn: Column;
        newColumn: Column;
    } | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const obtenerTareas = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/tareas');
            if (!response.ok) throw new Error('Error al obtener tareas');
            const data: Tarea[] = await response.json();
            setTareas(data);
            
            // Función mejorada para distribuir tareas
            const distribuirTareas = (estadoDeseado: Tarea['estado']) => {
                return data.filter((tarea) => {
                    // Verificar el estado exacto
                    const estadoActual = tarea.estado.toLowerCase().trim();
                    return estadoActual === estadoDeseado;
                });
            };

            // Depuración para ver las tareas y sus estados
            console.log('Todas las tareas:', data);
            console.log('Tareas completadas:', distribuirTareas('completada'));

            setColumns([
                {
                    id: '1',
                    title: 'Por Hacer',
                    items: distribuirTareas('pendiente'),
                },
                {
                    id: '2',
                    title: 'En Progreso',
                    items: distribuirTareas('en_progreso'),
                },
                {
                    id: '3',
                    title: 'Completada',
                    items: distribuirTareas('completada'), // Asegurarse de que esto reciba las tareas completadas
                },
            ]);
            setError('');
        } catch (err) {
            setError('Error al cargar tareas');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        obtenerTareas();
    }, [obtenerTareas]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        // Primero intentamos encontrar la columna de destino por su ID
        let targetColumn = columns.find(col => col.id === overId);
        
        // Si no encontramos por ID, buscamos por el ID del item sobre el que se dropea
        if (!targetColumn) {
            for (const col of columns) {
                if (col.items.some(item => item.id.toString() === overId)) {
                    targetColumn = col;
                    break;
                }
            }
        }

        // Encontrar la columna de origen
        const sourceColumn = columns.find(col => 
            col.items.some(item => item.id.toString() === activeId)
        );

        if (!sourceColumn || !targetColumn) {
            console.log('No se encontró columna origen o destino');
            return;
        }

        const draggedItem = sourceColumn.items.find(item => 
            item.id.toString() === activeId
        );

        if (!draggedItem) {
            console.log('No se encontró el item arrastrado');
            return;
        }

        // Si es la misma columna, no hacemos nada
        if (sourceColumn.id === targetColumn.id) return;

        // Guardamos el estado actual antes de mostrar el modal
        const currentState = [...columns];

        // Preparar el movimiento pendiente
        setPendingMove({
            item: {...draggedItem}, // Hacemos una copia del item
            oldColumn: sourceColumn,
            newColumn: targetColumn
        });
        
        // Mostrar el modal de confirmación
        setShowConfirmModal(true);
    };

    const confirmMove = async () => {
        if (!pendingMove) return;

        const { item, oldColumn, newColumn } = pendingMove;

        try {
            let newEstado: Tarea['estado'];
            
            switch (newColumn.id) {
                case '1':
                    newEstado = 'pendiente';
                    break;
                case '2':
                    newEstado = 'en_progreso';
                    break;
                case '3':
                    newEstado = 'completada';
                    break;
                default:
                    throw new Error('Columna no válida');
            }

            const updateData: Tarea = {
                ...item,
                estado: newEstado
            };

            const response = await fetch(`/api/tareas/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el estado de la tarea');
            }

            // Recargar todas las tareas para asegurar consistencia
            await obtenerTareas();
            setShowConfirmModal(false);
            setPendingMove(null);

        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            setError(error instanceof Error ? error.message : 'Error al actualizar el estado de la tarea');
            // Recargar las tareas para restaurar el estado original
            await obtenerTareas();
        }
    };

    const renderColumns = () => columns.map((column) => (
        <DroppableColumn key={column.id} column={column}>
            <SortableContext
                items={column.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2 min-h-[100px]">
                    {column.items.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                            <div className="bg-gray-700 p-4 rounded-lg cursor-move">
                                <h3 className="font-semibold mb-2">{item.nombreProyecto}</h3>
                                <p className="text-sm text-gray-300">{item.descripcion}</p>
                                <div className="mt-2 text-xs text-gray-400">
                                    <p>Inicio: {new Date(item.fechaInicio).toLocaleDateString()}</p>
                                    <p>Fin: {new Date(item.fechaFin).toLocaleDateString()}</p>
                                    <p>Creado por: {item.creadoPor}</p>
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DroppableColumn>
    ));

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black to-gray-900">
            {/* Sidebar fijo a la izquierda */}
            <div className="fixed left-0 h-full">
                <Sliderbar />
            </div>

            {/* Contenido principal con padding para el sidebar */}
            <div className="flex-1 ml-64 p-6"> {/* ml-64 = margen izquierdo de 16rem */}
                <h1 className="text-4xl font-bold mb-6 text-white">Proyectos</h1>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 w-full overflow-x-auto pb-6">
                        {renderColumns()}
                    </div>
                </DndContext>

                {/* Modal permanece igual */}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">¿Confirmar cambio de estado?</h3>
                            <div className="flex gap-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                                    onClick={confirmMove}
                                >
                                    Confirmar
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                                    onClick={() => {
                                        setShowConfirmModal(false);
                                        setPendingMove(null);
                                        setColumns([...columns]);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Proyectos;