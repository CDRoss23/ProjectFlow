import Link from "next/link";

export default function ProjectFlow() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      <header className="w-full flex justify-between items-center py-6 px-10">
        <h1 className="text-xl font-semibold">ProjectFlow</h1>
        <div>
          <Link href="/login">
            <button className="mr-4">Login</button>
          </Link>
          <Link href="/register">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">Registrate </button>
          </Link>
        </div>
      </header>
      
      <main className="text-center max-w-3xl mt-16">
        <h2 className="text-4xl font-bold mb-4">Project Management Hecho Simple</h2>
        <p className="text-gray-300 mb-6">
          Optimiza tu flujo de trabajo, colabora con tu equipo y entrega proyectos a tiempo con las herramientas intuitivas de gestión de proyectos de ProjectFlow.
        </p>
        <div className="flex justify-center gap-4">
        <Link href="/dashboard">
        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium">Dashboard </button>
        </Link>
          <button className="border border-white px-6 py-3 rounded-lg font-medium">Aprende Más</button>
        </div>
      </main>
      
      <section className="mt-16 flex flex-col md:flex-row gap-6 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg w-full text-center">
          <h3 className="font-bold text-lg">Administrador de tareas</h3>
            <p className="text-gray-400 mt-2">Crea, asigna y rastrea tareas con facilidad. Mantén tus proyectos organizados y a tiempo.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-full text-center">
          <h3 className="font-bold text-lg">Colaboracion en Equipo</h3>
            <p className="text-gray-400 mt-2">Trabajen juntos sin problemas con actualizaciones en tiempo real y herramientas de comunicación.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-full text-center">
          <h3 className="font-bold text-lg">Seguimiento de Procesos</h3>
            <p className="text-gray-400 mt-2">Monitorea el progreso del proyecto con paneles visuales e informes detallados.</p>
        </div>
      </section>
    </div>
  );
}
