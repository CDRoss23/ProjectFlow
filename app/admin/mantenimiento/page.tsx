import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Mantenimiento() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Mantenimiento de Sistema</h1>

            <div className="w-full max-w-4xl space-y-6">
                {/* Panel de Actualizaciones del Sistema */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Actualizaciones del Sistema</h2>
                    <div className="flex items-center justify-between mb-4">
                        <span>Versión actual: 1.0.0</span>
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                            Buscar actualizaciones
                        </button>
                    </div>
                </div>

                {/* Panel de Respaldo de Datos */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Respaldo de Datos</h2>
                    <div className="space-y-4">
                        <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                            Crear nuevo respaldo
                        </button>
                        <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
                            Restaurar desde respaldo
                        </button>
                    </div>
                </div>

                {/* Panel de Mantenimiento */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Mantenimiento del Sistema</h2>
                    <div className="space-y-4">
                        <button className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">
                            Limpiar caché del sistema
                        </button>
                        <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                            Optimizar base de datos
                        </button>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">
                            Verificar integridad del sistema
                        </button>
                    </div>
                </div>

                {/* Panel de Logs */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Registros del Sistema</h2>
                    <div className="h-48 overflow-y-auto bg-gray-900 p-4 rounded">
                        <pre className="text-sm">
                            [2024-01-20 10:30:15] Sistema iniciado correctamente
                            [2024-01-20 10:35:22] Respaldo automático completado
                            [2024-01-20 11:15:00] Actualización de seguridad instalada
                        </pre>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Mantenimiento;