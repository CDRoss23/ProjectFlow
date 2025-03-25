"use client";

import React, { useState, useEffect } from 'react';
import Sliderbar from '../../componentes/sliderbar';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export default function Gestor() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'miembro'
  });
  const [editando, setEditando] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/usuarios');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();
      setUsuarios(data);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = '/api/usuarios';
      const method = editando ? 'PUT' : 'POST';
      const body = editando 
        ? JSON.stringify({
            id: formData.id,
            nombre: formData.nombre,
            email: formData.email,
            rol: formData.rol
          })
        : JSON.stringify(formData);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar usuario');
      }

      await obtenerUsuarios();
      resetForm();
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setFormData({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      contraseña: '',
      rol: usuario.rol
    });
    setEditando(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/usuarios', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar usuario');
      }

      await obtenerUsuarios();
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      nombre: '',
      email: '',
      contraseña: '',
      rol: 'miembro'
    });
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
      <Sliderbar />
      
      <h1 className="text-4xl font-bold mt-8 mb-6">Gestor de usuarios</h1>
      
      {/* Formulario */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editando ? 'Editar Usuario' : 'Crear Usuario'}
        </h2>
        {error && <div className="mb-4 p-3 bg-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Nombre*</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700" 
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-1">Email*</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700" 
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-1">
                Contraseña{!editando && '*'}
              </label>
              <input 
                type="password" 
                name="contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700" 
                required={!editando}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-1">Rol*</label>
              <select 
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700"
                required
                disabled={isLoading}
              >
                <option value="admin">Administrador</option>
                <option value="gerente">Gerente</option>
                <option value="miembro">Miembro</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : editando ? 'Actualizar' : 'Crear'}
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

      {/* Tabla de usuarios */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usuarios Existentes</h2>
        {isLoading && usuarios.length === 0 ? (
          <div className="text-center py-8">Cargando usuarios...</div>
        ) : error ? (
          <div className="p-3 bg-red-700 rounded">{error}</div>
        ) : usuarios.length === 0 ? (
          <div className="text-center py-8">No hay usuarios registrados</div>
        ) : (
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
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="p-3">{usuario.nombre}</td>
                    <td className="p-3">{usuario.email}</td>
                    <td className="p-3 capitalize">{usuario.rol}</td>
                    <td className="p-3 space-x-2">
                      <button 
                        onClick={() => handleEditar(usuario)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded disabled:opacity-50"
                        disabled={isLoading}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleEliminar(usuario.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded disabled:opacity-50"
                        disabled={isLoading}
                      >
                        Eliminar
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
