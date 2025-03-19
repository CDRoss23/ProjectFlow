import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Gestionar() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Crear y gestionar proyectos</h1>

            <div className="w-full max-w-6xl grid gap-6">
                {/* Panel de Crear Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Proyecto</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-2">Nombre del Proyecto</label>
                            <input type="text" className="w-full bg-gray-700 p-2 rounded" />
                        </div>
                        <div>
                            <label className="block mb-2">Descripción</label>
                            <textarea className="w-full bg-gray-700 p-2 rounded h-24"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Fecha de Inicio</label>
                                <input type="date" className="w-full bg-gray-700 p-2 rounded" />
                            </div>
                            <div>
                                <label className="block mb-2">Fecha de Finalización</label>
                                <input type="date" className="w-full bg-gray-700 p-2 rounded" />
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                            Crear Proyecto
                        </button>
                    </form>
                </div>

                {/* Panel de Proyectos Actuales */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Proyectos Actuales</h2>
                    <div className="space-y-4">
                        {/* Ejemplo de proyecto */}
                        <div className="bg-gray-700 p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Proyecto A</h3>
                                <p className="text-gray-400">Fecha: 01/02/2024 - 01/03/2024</p>
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
                                <h3 className="text-xl font-semibold">Proyecto B</h3>
                                <p className="text-gray-400">Fecha: 15/02/2024 - 15/04/2024</p>
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

                {/* Panel de Estadísticas */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Estadísticas de Proyectos</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <p className="text-xl font-bold">5</p>
                            <p className="text-gray-400">Proyectos Activos</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <p className="text-xl font-bold">3</p>
                            <p className="text-gray-400">Proyectos Completados</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <p className="text-xl font-bold">2</p>
                            <p className="text-gray-400">Proyectos Pendientes</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Gestionar;