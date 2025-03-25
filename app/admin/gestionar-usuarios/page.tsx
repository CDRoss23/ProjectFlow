import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Gestor() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Gestor de usuarios</h1>
            {/* Formulario para crear/editar usuario */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Crear/Editar Usuario</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Nombre</label>
                            <input type="text" className="w-full p-2 rounded bg-gray-700" />
                        </div>
                        <div>
                            <label className="block mb-1">Email</label>
                            <input type="email" className="w-full p-2 rounded bg-gray-700" />
                        </div>
                        <div>
                            <label className="block mb-1">Contraseña</label>
                            <input type="password" className="w-full p-2 rounded bg-gray-700" />
                        </div>
                        <div>
                            <label className="block mb-1">Rol</label>
                            <select className="w-full p-2 rounded bg-gray-700">
                                <option>Administrador</option>
                                <option>Usuario</option>
                                <option>Editor</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                        Guardar Usuario
                    </button>
                </form>
            </div>

            {/* Tabla de usuarios */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Usuarios Existentes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Rol</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="p-3">Juan Pérez</td>
                                <td className="p-3">juan@ejemplo.com</td>
                                <td className="p-3">Administrador</td>
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
                                <td className="p-3">María García</td>
                                <td className="p-3">maria@ejemplo.com</td>
                                <td className="p-3">Usuario</td>
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
export default Gestor;