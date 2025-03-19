'use client';

import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcWorkflow } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirigir al dashboard o manejar el login exitoso
                router.push('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error en el servidor');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300 border border-purple-500/20">
                <div className="p-6 text-center">
                    <div className="flex justify-center items-center mb-2">
                        <FcWorkflow className="text-4xl mr-2" />
                        <h1 className="text-2xl font-bold text-white">ProjectFlow</h1>
                    </div>
                    <p className="text-white text-opacity-90">Gestiona tus proyectos de forma eficiente</p>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">Iniciar Sesión</h2>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-purple-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full pl-10 pr-3 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    placeholder="tu@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-purple-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full pl-10 pr-10 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                    Recordarme
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-all">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200">
                            Iniciar
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/register" className="text-purple-400 hover:text-purple-300 hover:underline transition-all">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}