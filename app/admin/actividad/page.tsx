import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Actividad() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Supervisar Actividad y Uso de Sistema</h1>
            {/* Panel de Estadísticas Generales */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Estadísticas Generales</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg mb-2">Usuarios Activos</h3>
                        <p className="text-3xl font-bold text-blue-400">247</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg mb-2">Sesiones Hoy</h3>
                        <p className="text-3xl font-bold text-green-400">1,234</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg mb-2">Errores del Sistema</h3>
                        <p className="text-3xl font-bold text-red-400">3</p>
                    </div>
                </div>
            </div>

            {/* Registro de Actividad */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Registro de Actividad</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 text-left">Fecha/Hora</th>
                                <th className="p-3 text-left">Usuario</th>
                                <th className="p-3 text-left">Acción</th>
                                <th className="p-3 text-left">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="p-3">2024-01-20 14:30</td>
                                <td className="p-3">admin@sistema.com</td>
                                <td className="p-3">Creación de usuario</td>
                                <td className="p-3">Nuevo usuario: maria@ejemplo.com</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="p-3">2024-01-20 14:25</td>
                                <td className="p-3">juan@ejemplo.com</td>
                                <td className="p-3">Modificación de rol</td>
                                <td className="p-3">Actualización permisos: Editor</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Gráfico de Uso del Sistema */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Uso del Sistema</h2>
                <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span>CPU</span>
                            <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                        </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span>Memoria RAM</span>
                            <span>60%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{width: '60%'}}></div>
                        </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span>Almacenamiento</span>
                            <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
export default Actividad;