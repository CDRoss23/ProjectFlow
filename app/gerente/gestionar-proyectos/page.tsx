'use client';

import React, { useState, useEffect } from 'react';
import Sliderbar from '../../componentes/sliderbar';

interface Tarea {
    id?: number;
    nombreProyecto: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    creadoPor: string;
    estado: string;
}

export default function Gestionar() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [formData, setFormData] = useState<Tarea>({
        nombreProyecto: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        creadoPor: '',
        estado: 'pendiente',
    });
    const [editando, setEditando] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerTareas();
    }, []);

    const obtenerTareas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/tareas');
            if (!response.ok) throw new Error('Error al obtener tareas');
            const data = await response.json();
            setTareas(data);
            setError('');
        } catch (err) {
            setError('Error al cargar tareas');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = editando ? `/api/tareas/${formData.id}` : '/api/tareas';
            const method = editando ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar tarea');
            }

            await obtenerTareas();
            resetForm();
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditar = (tarea: Tarea) => {
        setFormData(tarea);
        setEditando(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
        setIsLoading(true);

        try {
            const response = await fetch(`/api/tareas/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar tarea');
            }

            await obtenerTareas();
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombreProyecto: '',
            descripcion: '',
            fechaInicio: '',
            fechaFin: '',
            creadoPor: '',
            estado: 'pendiente',
        });
        setEditando(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />

            <h1 className="text-4xl font-bold mt-8 mb-6">Crear y gestionar proyectos</h1>

            <div className="w-full max-w-6xl grid gap-6">
                {/* Panel de Crear Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        {editando ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2">Nombre del Proyecto</label>
                            <input
                                type="text"
                                name="nombreProyecto"
                                value={formData.nombreProyecto}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 p-2 rounded h-24"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Fecha de Inicio</label>
                                <input
                                    type="date"
                                    name="fechaInicio"
                                    value={formData.fechaInicio}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Fecha de Finalización</label>
                                <input
                                    type="date"
                                    name="fechaFin"
                                    value={formData.fechaFin}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 p-2 rounded"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            {editando ? 'Guardar Cambios' : 'Crear Proyecto'}
                        </button>
                    </form>
                </div>

                {/* Panel de Proyectos Actuales */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Proyectos Actuales</h2>
                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="space-y-4">
                            {tareas.map(tarea => (
                                <div
                                    key={tarea.id}
                                    className="bg-gray-700 p-4 rounded flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-xl font-semibold">{tarea.nombreProyecto}</h3>
                                        <p className="text-gray-400">
                                            Fecha: {tarea.fechaInicio} - {tarea.fechaFin}
                                        </p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEditar(tarea)}
                                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(tarea.id!)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
