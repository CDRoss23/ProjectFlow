'use client'
import React, { useState } from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Comunicacion() {
    const [formData, setFormData] = useState({
        destinatario: '',
        asunto: '',
        mensaje: ''
    });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Enviando...');

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.error) {
                setStatus('Error al enviar el mensaje');
            } else {
                setStatus('Mensaje enviado con éxito');
                setFormData({ destinatario: '', asunto: '', mensaje: '' });
            }
        } catch (error) {
            setStatus('Error al enviar el mensaje');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Comunicacion</h1>
            <div className="w-full max-w-4xl space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Enviar Mensaje</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2">Destinatario</label>
                            <input 
                                type="email"
                                name="destinatario"
                                value={formData.destinatario}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
                                className="w-full bg-gray-700 p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Asunto</label>
                            <input 
                                type="text"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                placeholder="Asunto del mensaje"
                                className="w-full bg-gray-700 p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Mensaje</label>
                            <textarea 
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                className="w-full bg-gray-700 p-2 rounded h-32"
                                placeholder="Escribe tu mensaje aquí..."
                                required
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
                        >
                            Enviar Mensaje
                        </button>
                        {status && (
                            <p className={`text-center mt-2 ${
                                status.includes('éxito') ? 'text-green-500' : 'text-red-500'
                            }`}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>

                {/* Panel de Actualizaciones del Proyecto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Actualizaciones del Proyecto</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Actualización 1</h3>
                            <p className="text-gray-400">Fecha: 01/02/2024</p>
                            <p className="text-gray-400">Descripción: Se ha completado la fase de diseño del proyecto.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="text-xl font-semibold">Actualización 2</h3>
                            <p className="text-gray-400">Fecha: 15/02/2024</p>
                            <p className="text-gray-400">Descripción: Se ha iniciado la fase de desarrollo del proyecto.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comunicacion;