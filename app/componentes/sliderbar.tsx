"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineProject,
  AiOutlineTeam,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineLogout,
} from "react-icons/ai";

// Definimos un tipo para los roles válidos
type UserRole = "admin" | "gerente" | "miembro";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const router = useRouter();

  // Cargar el rol desde sessionStorage al montar el componente
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    
    if (!storedUser?.rol) {
      router.push("/login");
      return;
    }

    // Normalizamos el rol para asegurarnos que coincida con nuestras claves
    const normalizedRole = storedUser.rol.toLowerCase() as UserRole;
    
    // Verificamos si el rol es válido
    if (["admin", "gerente", "miembro"].includes(normalizedRole)) {
      setCurrentRole(normalizedRole);
    } else {
      console.error("Rol no válido:", storedUser.rol);
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = {
    admin: [
      { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
      { href: "/admin/gestionar-usuarios", icon: <AiOutlineUser size={24} />, label: "Gestionar Usuarios" },
      { href: "/admin/confi-roles", icon: <AiOutlineTeam size={24} />, label: "Configurar Permisos" },
      { href: "/admin/actividad", icon: <AiOutlineUser size={24} />, label: "Supervisar Actividad" },
      { href: "/admin/mantenimiento", icon: <AiOutlineSetting size={24} />, label: "Mantenimiento" },
    ],
    gerente: [
      { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
      { href: "/gerente/gestionar-proyectos", icon: <AiOutlineProject size={24} />, label: "Gestionar Proyectos" },
      { href: "/gerente/proceso", icon: <AiOutlineTeam size={24} />, label: "Supervisar Proyecto" },
      { href: "/gerente/comunicacion", icon: <AiOutlineTeam size={24} />, label: "Comunicación" },
    ],
    miembro: [
      { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
      { href: "/miembro/proyectos", icon: <AiOutlineProject size={24} />, label: "Proyectos" },
    ],
  };

  const roleText = {
    admin: "Administrador",
    gerente: "Gerente",
    miembro: "Miembro",
  };

  // Si no hay rol o el rol no es válido, no renderizamos
  if (!currentRole) {
    return null;
  }

  // Obtenemos los items del menú de forma segura
  const currentMenuItems = menuItems[currentRole] || [];

  return (
    <div className={`bg-gray-800 text-white h-screen ${isOpen ? "w-64" : "w-20"} transition-all duration-300 fixed left-0 top-0`}>
      <div className="p-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          {isOpen && (
            <Link href="/" className="flex items-center cursor-pointer">
              <h1 className="text-2xl font-bold text-white">ProjectFlow</h1>
            </Link>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-lg hover:bg-gray-700"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            ☰
          </button>
        </div>

        {isOpen && currentRole && (
          <div className="mt-4 text-center border-b border-gray-500 pb-4">
            <p className="text-white text-lg font-semibold">
              {roleText[currentRole]}
            </p>
          </div>
        )}

        <nav className="mt-8">
          <ul className="space-y-4">
            {currentMenuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 p-2 w-full text-left hover:bg-red-600 rounded-lg"
          >
            <AiOutlineLogout size={24} />
            {isOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;