"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FcWorkflow } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar usuario en localStorage o sessionStorage según preferencia
        localStorage.setItem("usuario", JSON.stringify(data.user)); // O usa sessionStorage si prefieres
        sessionStorage.setItem("user", JSON.stringify(data.user)); // Si prefieres persistencia temporal en sessionStorage

        // Redirigir según el rol del usuario
        switch (data.user.rol) {
          case "admin":
            router.push("/dashboard");
            break;
          case "gerente":
            router.push("/dashboard");
            break;
          case "miembro":
            router.push("/dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300 border border-purple-500/20">
        <div className="p-6 text-center">
          <div className="flex justify-center items-center mb-2">
            <Link href="/" className="flex items-center cursor-pointer">
              <FcWorkflow className="text-4xl mr-2" />
              <h1 className="text-2xl font-bold text-white">ProjectFlow</h1>
            </Link>
          </div>
          <p className="text-white text-opacity-90">
            Gestiona tus proyectos de forma eficiente
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Iniciar Sesión
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-medium mb-2"
                htmlFor="email"
              >
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
              <label
                className="block text-gray-300 text-sm font-medium mb-2"
                htmlFor="password"
              >
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
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Recordarme
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-all"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200"
            >
              Iniciar
            </button>
            {/* Botón de Google */}
            <p className="flex items-center justify-center gap-2 py-2 px-4">O</p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full bg-gray-50 flex text-black items-center justify-center gap-2 mb-4 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300 hover:underline transition-all"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
