'use client';

import React, { useState, useEffect } from 'react';
import Sliderbar from '../../componentes/sliderbar';

interface LogActividad {
  id: number;
  fecha: string;
  usuario_email: string;
  usuario_nombre: string;
  accion: string;
  detalles: string;
}

interface Estadisticas {
  usuariosActivos: number;
  sesionesHoy: number;
  erroresSistema: number;
  usoCPU: number;
  usoRAM: number;
  usoAlmacenamiento: number;
}

export default function Actividad() {
  const [logs, setLogs] = useState<LogActividad[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    usuariosActivos: 0,
    sesionesHoy: 0,
    erroresSistema: 0,
    usoCPU: 0,
    usoRAM: 0,
    usoAlmacenamiento: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        
        const [resEstadisticas, resLogs] = await Promise.all([
          fetch('/api/estadisticas'),
          fetch('/api/logs-actividad')
        ]);

        if (!resEstadisticas.ok || !resLogs.ok) {
          throw new Error('Error al cargar datos');
        }

        const [datosEstadisticas, datosLogs] = await Promise.all([
          resEstadisticas.json(),
          resLogs.json()
        ]);

        setEstadisticas(datosEstadisticas);
        setLogs(datosLogs);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
    const interval = setInterval(cargarDatos, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
      <Sliderbar />
      
      <h1 className="text-4xl font-bold mt-8 mb-6">Supervisar Actividad y Uso de Sistema</h1>
      
      {error && (
        <div className="w-full max-w-4xl bg-red-700 p-4 rounded-lg mb-4">
          Error: {error}
        </div>
      )}
      
      {/* Panel de Estadísticas Generales */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Estadísticas Generales</h2>
        {isLoading ? (
          <div className="text-center py-4">Cargando estadísticas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg mb-2">Usuarios Activos</h3>
              <p className="text-3xl font-bold text-blue-400">
                {estadisticas.usuariosActivos}
              </p>
              <p className="text-sm text-gray-400 mt-1">Conectados actualmente</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg mb-2">Sesiones Hoy</h3>
              <p className="text-3xl font-bold text-green-400">
                {estadisticas.sesionesHoy}
              </p>
              <p className="text-sm text-gray-400 mt-1">Inicios de sesión</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg mb-2">Errores del Sistema</h3>
              <p className="text-3xl font-bold text-red-400">
                {estadisticas.erroresSistema}
              </p>
              <p className="text-sm text-gray-400 mt-1">En las últimas 24h</p>
            </div>
          </div>
        )}
      </div>

      {/* Registro de Actividad - Corregido para evitar errores de hidratación */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Registro de Actividad</h2>
        {isLoading ? (
          <div className="text-center py-4">Cargando registros de actividad...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-4">No hay registros de actividad</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 text-left w-1/6">Fecha/Hora</th><th 
                  className="p-3 text-left w-1/6">Usuario</th><th 
                  className="p-3 text-left w-2/6">Acción</th><th 
                  className="p-3 text-left w-2/6">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="p-3 whitespace-nowrap">{
                      new Date(log.fecha).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })
                    }</td><td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{log.usuario_nombre || 'Sistema'}</span>
                        {log.usuario_email && (
                          <span className="text-gray-400 text-xs">{log.usuario_email}</span>
                        )}
                      </div>
                    </td><td className="p-3">
                      <div className="break-words max-w-prose">
                        {log.accion}
                      </div>
                    </td><td className="p-3 max-w-xs truncate" title={log.detalles || ''}>
                      {log.detalles || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Gráfico de Uso del Sistema */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Uso del Sistema</h2>
        {isLoading ? (
          <div className="text-center py-4">Cargando métricas del sistema...</div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  CPU
                </span>
                <span className="font-mono">{estadisticas.usoCPU}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${estadisticas.usoCPU > 80 ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{width: `${estadisticas.usoCPU}%`}}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Memoria RAM
                </span>
                <span className="font-mono">{estadisticas.usoRAM}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${estadisticas.usoRAM > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                  style={{width: `${estadisticas.usoRAM}%`}}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Almacenamiento
                </span>
                <span className="font-mono">{estadisticas.usoAlmacenamiento}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${estadisticas.usoAlmacenamiento > 80 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                  style={{width: `${estadisticas.usoAlmacenamiento}%`}}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {estadisticas.usoAlmacenamiento > 90 && (
                  <span className="text-red-400">¡Espacio crítico! Considere liberar espacio</span>
                )}
                {estadisticas.usoAlmacenamiento > 80 && estadisticas.usoAlmacenamiento <= 90 && (
                  <span className="text-yellow-400">Espacio limitado</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}