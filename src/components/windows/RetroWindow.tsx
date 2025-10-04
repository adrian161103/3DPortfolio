import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

type RetroWindowProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  zIndex: number;
  onFocus: () => void;
};

export default function RetroWindow({
  title,
  children,
  onClose,
  onMinimize,
  zIndex,
  onFocus,
}: RetroWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [savedContent, setSavedContent] = useState<React.ReactNode>(null);
  const nodeRef = useRef(null);

  // Guardar el contenido cuando se minimiza/maximiza
  useEffect(() => {
    if (!savedContent) {
      setSavedContent(children);
    }
  }, [children, savedContent]);

  const toggleMaximize = () => setIsMaximized((prev) => !prev);

  const WindowContent = (
    <div
      ref={nodeRef}
      className={`font-[Tahoma,sans-serif] flex flex-col ${
        isMaximized ? "" : "border-2 border-gray-600 shadow-[4px_4px_0_#00000044]"
      }`}
      style={{
        zIndex,
        position: "absolute",
        width: isMaximized ? "100%" : "1500px",
        height: isMaximized ? undefined : "800px",
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
        right: isMaximized ? 0 : undefined,
        bottom: isMaximized ? "55px" : undefined,
        background: "#c0c0c0",
      }}
      onMouseDown={onFocus}
    >
      <div
        className="retro-window-titlebar"
        onDoubleClick={toggleMaximize}
        onMouseDown={onFocus}
      >
        {/* Izquierda: ícono + título */}
        <div className="title-left">
          <img src="/icons/ie/internetpage.png" alt="icon" className="window-icon" />
          <span>{title}</span>
        </div>

        {/* Derecha: controles */}
        <div className="retro-window-controls">
          <button onClick={onMinimize} aria-label="Minimizar">─</button>
          <button onClick={toggleMaximize} aria-label="Maximizar/Restaurar">
            {isMaximized ? "❐" : "□"}
          </button>
          <button onClick={onClose} aria-label="Cerrar">X</button>
        </div>
      </div>

      {/* Contenido - NO recarga al minimizar/maximizar */}
      <div
        className={`flex-1 p-4 bg-white text-black text-[1.625rem] overflow-auto`}
        style={{
          transformOrigin: 'top left',
        }}
      >
        {savedContent || children}
      </div>
    </div>
  );

  return isMaximized ? (
    WindowContent
  ) : (
    <Draggable
      nodeRef={nodeRef}
      handle=".retro-window-titlebar"
      defaultPosition={{ x: 100, y: 100 }}
      onStart={onFocus}
    >
      {WindowContent}
    </Draggable>
  );
}
