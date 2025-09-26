export default function RetroWindows() {
  return (
    <div className="retro-desktop">
      {/* Barra de tareas */}
      <div className="taskbar">
        <button className="start-btn">Inicio</button>
        <div className="taskbar-clock text-xs">12:00</div>
      </div>

      {/* Iconos */}
      <div className="flex flex-col gap-5 p-5 text-white">
        <div className="flex flex-col items-center w-16 cursor-pointer">
          <img src="/icons/my-computer.png" alt="Mi PC" className="w-12 h-12" />
          <span>Mi PC</span>
        </div>
        <div className="flex flex-col items-center w-16 cursor-pointer">
          <img src="/icons/bin.png" alt="Papelera" className="w-12 h-12" />
          <span>Papelera</span>
        </div>
      </div>
    </div>
  );
}
