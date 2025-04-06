"use client"

import { useEffect, useState } from "react"
import Sliderbar from "../componentes/sliderbar"
import { FaUsers, FaTasks, FaProjectDiagram, FaClock } from "react-icons/fa"

// Interfaces para los datos
interface Estadisticas {
  proyectosActivos: number
  tareasPendientes: number
  miembrosEquipo: number
  horasRegistradas: number
}

interface Proyecto {
  id: number
  nombreProyecto: string
  estado: string
  progreso: number
  fechaFin: string
}

function Dashboard() {
  // Estados para almacenar los datos
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    proyectosActivos: 0,
    tareasPendientes: 0,
    miembrosEquipo: 0,
    horasRegistradas: 0,
  })
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener los datos
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtener estadísticas
        const respuestaEstadisticas = await fetch("/api/estadisticas")
        if (!respuestaEstadisticas.ok) {
          throw new Error("Error al cargar estadísticas")
        }
        const datosEstadisticas = await respuestaEstadisticas.json()

        // Obtener proyectos
        const respuestaProyectos = await fetch("/api/tareas")
        if (!respuestaProyectos.ok) {
          throw new Error("Error al cargar proyectos")
        }
        const datosProyectos = await respuestaProyectos.json()

        // Actualizar estados
        setEstadisticas(datosEstadisticas)
        setProyectos(datosProyectos)
        setCargando(false)
      } catch (err) {
        console.error("Error:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  // Función para mostrar el badge de estado correcto
  const mostrarEstado = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Pendiente</span>
      case "en_progreso":
        return <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">En proceso</span>
      case "completada":
        return <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">Completado</span>
      default:
        return <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">Activo</span>
    }
  }

  return (
    <div className="flex">
      {/* Sidebar fijo a la izquierda */}
      <div className="fixed inset-y-0 left-0">
        <Sliderbar />
      </div>

      {/* Contenido principal con margen izquierdo para el sidebar */}
      <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-gray-900 text-white ml-64">
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>

          {/* Mensaje de error si existe */}
          {error && <div className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-8">Error: {error}</div>}

          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Proyectos Activos</p>
                  <h3 className="text-2xl font-bold">{cargando ? "..." : estadisticas.proyectosActivos}</h3>
                </div>
                <FaProjectDiagram className="text-blue-500 text-3xl" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Tareas Pendientes</p>
                  <h3 className="text-2xl font-bold">{cargando ? "..." : estadisticas.tareasPendientes}</h3>
                </div>
                <FaTasks className="text-green-500 text-3xl" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Miembros del Equipo</p>
                  <h3 className="text-2xl font-bold">{cargando ? "..." : estadisticas.miembrosEquipo}</h3>
                </div>
                <FaUsers className="text-purple-500 text-3xl" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Horas Registradas</p>
                  <h3 className="text-2xl font-bold">{cargando ? "..." : estadisticas.horasRegistradas}</h3>
                </div>
                <FaClock className="text-yellow-500 text-3xl" />
              </div>
            </div>
          </div>

          {/* Sección de proyectos recientes */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Proyectos Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left pb-3">Nombre</th>
                    <th className="text-left pb-3">Estado</th>
                    <th className="text-left pb-3">Progreso</th>
                    <th className="text-left pb-3">Fecha límite</th>
                  </tr>
                </thead>
                <tbody>
                  {cargando ? (
                    <tr>
                      <td colSpan={4} className="py-3 text-center">
                        Cargando proyectos...
                      </td>
                    </tr>
                  ) : proyectos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-3 text-center">
                        No hay proyectos disponibles
                      </td>
                    </tr>
                  ) : (
                    proyectos.map((proyecto) => (
                      <tr key={proyecto.id} className="border-b border-gray-700">
                        <td className="py-3">{proyecto.nombreProyecto}</td>
                        <td>{mostrarEstado(proyecto.estado)}</td>
                        <td>{proyecto.progreso}%</td>
                        <td>{proyecto.fechaFin}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

