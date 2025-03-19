import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Configuración() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Configurar permisos y roles de usuarios</h1>
            {/* Sección de Roles */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Gestionar Roles</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Nombre del Rol</label>
                            <input type="text" className="w-full p-2 rounded bg-gray-700" placeholder="Ej: Editor" />
                        </div>
                        <div>
                            <label className="block mb-1">Descripción</label>
                            <input type="text" className="w-full p-2 rounded bg-gray-700" placeholder="Descripción del rol" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl mb-2">Permisos</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Crear usuarios</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Editar usuarios</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Eliminar usuarios</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Ver reportes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Gestionar roles</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox" />
                                <label>Configurar sistema</label>
                            </div>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                        Guardar Rol
                    </button>
                </form>
            </div>

            {/* Tabla de Roles Existentes */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Roles Existentes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 text-left">Rol</th>
                                <th className="p-3 text-left">Descripción</th>
                                <th className="p-3 text-left">Permisos</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="p-3">Administrador</td>
                                <td className="p-3">Control total del sistema</td>
                                <td className="p-3">Todos los permisos</td>
                                <td className="p-3">
                                    <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded mr-2">
                                        Editar
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <td className="p-3">Editor</td>
                                <td className="p-3">Gestión de contenido</td>
                                <td className="p-3">Crear, Editar contenido</td>
                                <td className="p-3">
                                    <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded mr-2">
                                        Editar
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}
export default Configuración;