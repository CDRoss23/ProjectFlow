import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Proceso() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Supervisar el progreso del proyecto</h1>

            <div className="w-full max-w-4xl space-y-6">
                {/* Panel de Progreso del Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Progreso del Proyecto</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Fase de Diseño</h3>
                            <p className="text-gray-400">Progreso: 80%</p>
                            <div className="w-full bg-gray-600 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Fase de Desarrollo</h3>
                            <p className="text-gray-400">Progreso: 50%</p>
                            <div className="w-full bg-gray-600 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel de Ajustes del Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Realizar Ajustes</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-2">Fase del Proyecto</label>
                            <select className="w-full bg-gray-700 p-2 rounded">
                                <option>Fase de Diseño</option>
                                <option>Fase de Desarrollo</option>
                                <option>Fase de Pruebas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Nuevo Progreso (%)</label>
                            <input 
                                type="number"
                                placeholder="Ingrese el nuevo progreso"
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                            Actualizar Progreso
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default Proceso;