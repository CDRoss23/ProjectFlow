'use client';

import React, { useState, useEffect } from 'react';
import Sliderbar from '../../componentes/sliderbar';

interface Permiso {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Rol {
  rol: string;
  descripcion?: string;
  permisos: Permiso[];
}

interface FormData {
  nombreRol: string;
  descripcion: string;
  permisos: number[];
}

export default function ConfiguracionRoles() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [permisosDisponibles, setPermisosDisponibles] = useState<Permiso[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nombreRol: '',
    descripcion: '',
    permisos: []
  });
  const [editando, setEditando] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      // Primero obtenemos la respuesta de permisos
      const permisosRes = await fetch('/api/permisos');
      if (!permisosRes.ok) throw new Error('Error al cargar permisos');
      const permisosData: Permiso[] = await permisosRes.json();
  
      // Luego obtenemos la respuesta de roles
      const rolesRes = await fetch('/api/roles');
      if (!rolesRes.ok) throw new Error('Error al cargar roles');
      const rolesData: Rol[] = await rolesRes.json();
  
      setRoles(rolesData);
      setPermisosDisponibles(permisosData);
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar datos');
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (permisoId: number) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permisoId)
        ? prev.permisos.filter(id => id !== permisoId)
        : [...prev.permisos, permisoId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = '/api/roles';
      const method = editando ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rol: formData.nombreRol,
          descripcion: formData.descripcion,
          permisos: formData.permisos
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar rol');
      }

      await cargarDatos();
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditar = (rol: Rol) => {
    setFormData({
      nombreRol: rol.rol,
      descripcion: rol.descripcion || '',
      permisos: rol.permisos.map(p => p.id)
    });
    setEditando(rol.rol);
  };

  const resetForm = () => {
    setFormData({
      nombreRol: '',
      descripcion: '',
      permisos: []
    });
    setEditando(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
      <Sliderbar />
      
      <h1 className="text-4xl font-bold mt-8 mb-6">Gestión de Permisos y Roles</h1>
      
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editando ? `Editando Permisos del Rol: ${editando}` : 'Asignar Permisos a Rol'}
        </h2>
        {error && <div className="mb-4 p-3 bg-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Nombre del Rol</label>
              <input 
                type="text" 
                name="nombreRol"
                value={formData.nombreRol}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700" 
                required
                disabled={isLoading || !!editando}
              />
            </div>
            <div>
              <label className="block mb-1">Descripción</label>
              <input 
                type="text" 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700" 
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl mb-2">Permisos Disponibles</h3>
            <div className="grid grid-cols-2 gap-4">
              {permisosDisponibles.map(permiso => (
                <div key={permiso.id} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`permiso-${permiso.id}`}
                    checked={formData.permisos.includes(permiso.id)}
                    onChange={() => handleCheckboxChange(permiso.id)}
                    className="form-checkbox"
                    disabled={isLoading}
                  />
                  <label htmlFor={`permiso-${permiso.id}`}>
                    {permiso.descripcion}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : editando ? 'Actualizar Permisos' : 'Asignar Permisos'}
            </button>
            {editando && (
              <button 
                type="button" 
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Roles y sus Permisos</h2>
        {isLoading && roles.length === 0 ? (
          <div className="text-center py-8">Cargando roles...</div>
        ) : error ? (
          <div className="p-3 bg-red-700 rounded">{error}</div>
        ) : roles.length === 0 ? (
          <div className="text-center py-8">No hay roles configurados</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 text-left">Rol</th>
                  <th className="p-3 text-left">Descripción</th>
                  <th className="p-3 text-left">Permisos Asignados</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(rol => (
                  <tr key={rol.rol} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="p-3 capitalize">{rol.rol}</td>
                    <td className="p-3">{rol.descripcion || 'Sin descripción'}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {rol.permisos.map(permiso => (
                          <span key={permiso.id} className="bg-gray-700 px-2 py-1 rounded text-sm">
                            {permiso.descripcion}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleEditar(rol)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded disabled:opacity-50"
                        disabled={isLoading || rol.rol === 'admin'}
                      >
                        Gestionar Permisos
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}