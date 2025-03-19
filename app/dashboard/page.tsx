import React from 'react';
import Sliderbar from '../componentes/sliderbar';

// Datos estáticos de ejemplo
const datosDashboard = {
  usuarios: 150,
  ventas: 3200,
  productos: 45,
  ingresos: 12000,
};

function Dashboard() {
return (
<div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
    <Sliderbar />
    
    {/* Título del Dashboard */}
    <h1 className="text-4xl font-bold mt-8 mb-6">Dashboard de Personal</h1>

    {/* Sección de estadísticas rápidas */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
        <p className="text-3xl">{datosDashboard.usuarios}</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Ventas</h2>
        <p className="text-3xl">{datosDashboard.ventas}</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Productos</h2>
        <p className="text-3xl">{datosDashboard.productos}</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Ingresos</h2>
        <p className="text-3xl">${datosDashboard.ingresos}</p>
    </div>
    </div>

    {/* Sección para gráficos o tablas (puedes expandir esta parte) */}
    <div className="mt-10 w-full max-w-6xl">
    <h2 className="text-2xl font-semibold mb-4">Gráficos y Detalles</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p>pendiente</p>
    </div>
    </div>
</div>
);
}

export default Dashboard;