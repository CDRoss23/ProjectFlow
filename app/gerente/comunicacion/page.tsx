import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Comunicacion() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Comunicacion</h1>
            <div className="w-full max-w-4xl space-y-6">
                {/* Panel de Envío de Mensajes */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Enviar Mensaje</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-2">Destinatario</label>
                            <input 
                                type="text"
                                placeholder="Nombre del destinatario"
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Asunto</label>
                            <input 
                                type="text"
                                placeholder="Asunto del mensaje"
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Mensaje</label>
                            <textarea 
                                className="w-full bg-gray-700 p-2 rounded h-32"
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

                {/* Panel de Actualizaciones del Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Actualizaciones del Proyecto</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Actualización 1</h3>
                            <p className="text-gray-400">Fecha: 01/02/2024</p>
                            <p className="text-gray-400">Descripción: Se ha completado la fase de diseño del proyecto.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Actualización 2</h3>
                            <p className="text-gray-400">Fecha: 15/02/2024</p>
                            <p className="text-gray-400">Descripción: Se ha iniciado la fase de desarrollo del proyecto.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
export default Comunicacion;