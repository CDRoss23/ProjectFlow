import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Asignar() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Asignar tareas a los miembros del equipo</h1>

            <div className="w-full max-w-4xl space-y-6">
                {/* Panel de Asignación de Tareas */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Nueva Asignación</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-2">Proyecto</label>
                            <select className="w-full bg-gray-700 p-2 rounded">
                                <option>Proyecto A</option>
                                <option>Proyecto B</option>
                                <option>Proyecto C</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Miembro del Equipo</label>
                            <select className="w-full bg-gray-700 p-2 rounded">
                                <option>Juan Pérez</option>
                                <option>María García</option>
                                <option>Carlos López</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Tarea</label>
                            <input 
                                type="text"
                                placeholder="Nombre de la tarea"
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Descripción</label>
                            <textarea 
                                className="w-full bg-gray-700 p-2 rounded h-32"
                                placeholder="Describe la tarea..."
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Fecha de Inicio</label>
                                <input 
                                    type="date"
                                    className="w-full bg-gray-700 p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Fecha de Entrega</label>
                                <input 
                                    type="date"
                                    className="w-full bg-gray-700 p-2 rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Prioridad</label>
                            <select className="w-full bg-gray-700 p-2 rounded">
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                            Asignar Tarea
                        </button>
                    </form>
                </div>

                {/* Lista de Tareas Asignadas */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Tareas Asignadas</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Desarrollo Frontend</h3>
                                <p className="text-gray-400">Asignado a: Juan Pérez</p>
                                <p className="text-gray-400">Proyecto: Proyecto A</p>
                                <p className="text-gray-400">Fecha: 01/02/2024 - 15/02/2024</p>
                            </div>
                            <div className="space-x-2">
                                <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded">
                                    Editar
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-700 p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Diseño de Base de Datos</h3>
                                <p className="text-gray-400">Asignado a: María García</p>
                                <p className="text-gray-400">Proyecto: Proyecto B</p>
                                <p className="text-gray-400">Fecha: 05/02/2024 - 20/02/2024</p>
                            </div>
                            <div className="space-x-2">
                                <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded">
                                    Editar
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Asignar;