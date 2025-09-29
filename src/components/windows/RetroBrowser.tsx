import { useState, useEffect } from "react";

type Page = "home" | "about" | "projects" | "contact";

export default function RetroBrowser() {
  const [page, setPage] = useState<Page>("home");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulación de carga cuando cambia la página
  useEffect(() => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [page]);

  const renderPage = () => {
    if (loading) return null; // 👈 no mostrar nada hasta terminar la carga

    switch (page) {
      case "about":
        return <p>Bienvenido a la página About 🌐</p>;
      case "projects":
        return (
          <ul className="list-disc pl-6">
            <li>Proyecto 1</li>
            <li>Proyecto 2</li>
            <li>Proyecto 3</li>
          </ul>
        );
      case "contact":
        return (
          <div>
            <p>Podés contactarme en:</p>
            <p>
              <a
                href="mailto:adrian@example.com"
                className="text-blue-600 underline"
              >
                adrian@example.com
              </a>
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <p>
              <button
                onClick={() => setPage("about")}
                className="text-blue-600 underline cursor-pointer"
              >
                About
              </button>
            </p>
            <p>
              <button
                onClick={() => setPage("projects")}
                className="text-blue-600 underline cursor-pointer"
              >
                Projects
              </button>
            </p>
            <p>
              <button
                onClick={() => setPage("contact")}
                className="text-blue-600 underline cursor-pointer"
              >
                Contact
              </button>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full text-[13px] font-[Tahoma,sans-serif]">
      {/* ===== Toolbar ===== */}
      <div className="bg-[#c0c0c0] px-1 py-1 flex items-center gap-1 border-b-2 border-[#808080]">
        {[
          { icon: "/icons/ie/back.png", label: "Atrás" },
          { icon: "/icons/ie/forward.png", label: "Adelante" },
          { icon: "/icons/ie/stop.png", label: "Detener" },
          { icon: "/icons/ie/refresh.png", label: "Actualizar" },
          { icon: "/icons/ie/home.png", label: "Inicio", action: () => setPage("home") },
          { icon: "/icons/ie/search.png", label: "Búsqueda" },
          { icon: "/icons/ie/favorites.png", label: "Favoritos" },
          { icon: "/icons/ie/history.png", label: "Historial" },
          { icon: "/icons/ie/mail.png", label: "Correo" },
          { icon: "/icons/ie/print.png", label: "Imprimir" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className="flex items-center gap-1 bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 text-[12px] hover:bg-[#dfdfdf]"
          >
            <img src={btn.icon} alt={btn.label} className="w-4 h-4" />
            {btn.label}
          </button>
        ))}
      </div>

      {/* ===== Address Bar ===== */}
      <div className="bg-[#c0c0c0] px-1 py-1 flex items-center gap-1 border-b border-[#808080]">
        <span className="px-1">Dirección</span>
        <input
          type="text"
          readOnly
          value={`http://retro.local/${page}`}
          className="flex-1 px-2 py-0.5 border border-[#808080] bg-white text-[13px]"
        />
        <button className="bg-[#c0c0c0] border border-[#808080] px-2 text-[12px]">
          Ir a
        </button>
        <button className="bg-[#c0c0c0] border border-[#808080] px-2 text-[12px]">
          Vínculos
        </button>
      </div>

      {/* ===== Contenido ===== */}
      <div className="flex-1 bg-white p-3 overflow-auto">{renderPage()}</div>

     {/* ===== Status Bar ===== */}
<div className="bg-[#c0c0c0] border-t border-[#808080] text-[12px] flex items-center justify-between h-6">
  {/* Izquierda: ícono + texto */}
  <div className="flex items-center gap-1 px-2 border-r border-[#808080] w-40">
    <img src="/icons/ie/globe.png" alt="IE" className="w-4 h-4" />
    <span>{loading ? "Cargando..." : "Listo"}</span>
  </div>

  {/* Centro: barra de progreso */}
  <div className="flex-1 h-full flex items-center px-2">
    <div className="flex-1 h-3 border border-[#808080] bg-[#e0e0e0] relative">
      <div
        className="absolute top-0 left-0 h-full bg-[#000080]"
        style={{ width: loading ? `${progress}%` : "0%" }}
      />
    </div>
  </div>

  {/* Derecha: ícono "Internet" */}
  <div className="flex items-center px-3 border-l border-white">
    <img src="/icons/ie/internet.png" alt="Internet" className="w-4 h-4" />
    <span className="ml-1">Internet</span>
  </div>
</div>

    </div>
  );
}
