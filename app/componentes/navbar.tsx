'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineProject, AiOutlineTeam, AiOutlineSetting } from 'react-icons/ai';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed left-0 top-0`}>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    {isOpen && <h2 className="text-xl font-bold">ProjectFlow</h2>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-700"
                    >
                        ☰
                    </button>
                </div>

                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                                <AiOutlineHome size={24} />
                                {isOpen && <span>Inicio</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href="/proyectos" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                                <AiOutlineProject size={24} />
                                {isOpen && <span>Proyectos</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href="/equipo" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                                <AiOutlineTeam size={24} />
                                {isOpen && <span>Equipo</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href="/configuracion" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                                <AiOutlineSetting size={24} />
                                {isOpen && <span>Configuración</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;