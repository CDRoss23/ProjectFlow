import React from 'react';
import Sliderbar from '../componentes/sliderbar';
import { FaUsers, FaTasks, FaProjectDiagram, FaClock } from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="fixed left-0 h-full">
                <Sliderbar />
            </div>
        
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
          
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Proyectos Activos</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <FaProjectDiagram className="text-blue-500 text-3xl" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Tareas Pendientes</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <FaTasks className="text-green-500 text-3xl" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Miembros del Equipo</p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
                <FaUsers className="text-purple-500 text-3xl" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Horas Registradas</p>
                  <h3 className="text-2xl font-bold">164</h3>
                </div>
                <FaClock className="text-yellow-500 text-3xl" />
              </div>
            </div>
          </div>

          {/* Sección de proyectos recientes */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Proyectos Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left pb-3">Nombre</th>
                    <th className="text-left pb-3">Estado</th>
                    <th className="text-left pb-3">Progreso</th>
                    <th className="text-left pb-3">Fecha límite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">Diseño UI/UX</td>
                    <td><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">Activo</span></td>
                    <td>75%</td>
                    <td>15 Abril 2024</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">Desarrollo Backend</td>
                    <td><span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">En proceso</span></td>
                    <td>45%</td>
                    <td>22 Abril 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
  );
}

export default Dashboard;

