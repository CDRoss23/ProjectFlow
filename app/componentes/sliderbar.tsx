'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineProject, AiOutlineTeam, AiOutlineSetting, AiOutlineUser, AiOutlineDashboard } from 'react-icons/ai';

type Role = 'admin' | 'gerente' | 'miembro';

const Sliderbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentRole, setCurrentRole] = useState<Role>('admin');

    const menuItems = {
        admin: [
            { href: '/dashboard', icon: <AiOutlineDashboard size={24} />, label: 'Dashboard' },
            { href: '/admin/gestionar-usuarios', icon: <AiOutlineProject size={24} />, label: 'Gestionar Usuarios' },
            { href: '/admin/confi-roles', icon: <AiOutlineTeam size={24} />, label: 'Configurar Permisos' },
            { href: '/admin/actividad', icon: <AiOutlineUser size={24} />, label: 'Supervisar Actividad' },
            { href: '/admin/mantenimiento', icon: <AiOutlineSetting size={24} />, label: 'Mantenimiento' },
            { href: '/', icon: <AiOutlineSetting size={24} />, label: 'Cerrar Sesion' },
        ],
        gerente: [
            { href: '/dashboard', icon: <AiOutlineDashboard size={24} />, label: 'Dashboard' },
            { href: '/gerente/gestionar-proyectos', icon: <AiOutlineProject size={24} />, label: 'Gestionar Proyectos' },
            { href: '/gerente/proceso', icon: <AiOutlineTeam size={24} />, label: 'Supervisar Proyecto' },
            { href: '/gerente/comunicacion', icon: <AiOutlineTeam size={24} />, label: 'Comunicacion' },
            { href: '/gerente/asignar', icon: <AiOutlineTeam size={24} />, label: 'Asignar' },
            { href: '/', icon: <AiOutlineSetting size={24} />, label: 'Cerrar Sesion' },
        ],
        miembro: [
            { href: '/dashboard', icon: <AiOutlineDashboard size={24} />, label: 'Dashboard' },
            { href: '/miembro', icon: <AiOutlineProject size={24} />, label: 'Proyectos' },
            { href: '/', icon: <AiOutlineSetting size={24} />, label: 'Cerrar Sesion' },
        ],
    };

    return (
        <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed left-0 top-0`}>
            <div className="p-4">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    {isOpen && <h2 className="text-xl font-bold">ProjectFlow</h2>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-700"
                    >
                        ☰
                    </button>
                </div>

                {/* Selector de Rol para pruebas ELIMINAR*/}
                {isOpen && (
                    <div className="p-4 border-b border-border">
                        <select 
                            value={currentRole}
                            onChange={(e) => setCurrentRole(e.target.value as Role)}
                            className="w-full p-2 bg-gray-700 rounded-lg"
                        >
                            <option value="admin">Admin</option>
                            <option value="gerente">Gerente</option>
                            <option value="miembro">Miembro</option>
                        </select>
                    </div>
                )}

                <nav className="mt-8">
                    <ul className="space-y-4">
                        {menuItems[currentRole].map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                                    {item.icon}
                                    {isOpen && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sliderbar;