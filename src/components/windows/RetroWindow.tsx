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
  isMaximized?: boolean;
  onMaximizeChange?: (maximized: boolean) => void;
};

export default function RetroWindow({
  title,
  children,
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  isMaximized: externalIsMaximized,
  onMaximizeChange,
}: RetroWindowProps) {
  const [internalIsMaximized, setInternalIsMaximized] = useState(false);
  const isMaximized = externalIsMaximized !== undefined ? externalIsMaximized : internalIsMaximized;
  const [savedContent, setSavedContent] = useState<React.ReactNode>(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const nodeRef = useRef(null);
  const lastTouchTimeRef = useRef<number>(0);

  // Guardar el contenido cuando se minimiza/maximiza
  useEffect(() => {
    if (!savedContent) {
      setSavedContent(children);
    }
  }, [children, savedContent]);

  // Calcular límites dinámicamente
  useEffect(() => {
    const updateBounds = () => {
      const taskbarHeight = 55;
      const windowWidth = 1500;
      const windowHeight = 800;
      
      setBounds({
        left: 0,
        top: 0,
        right: Math.max(0, window.innerWidth - windowWidth),
        bottom: Math.max(0, window.innerHeight - taskbarHeight - windowHeight),
      });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const toggleMaximize = () => {
    const newMaximized = !isMaximized;
    if (onMaximizeChange) {
      onMaximizeChange(newMaximized);
    } else {
      setInternalIsMaximized(newMaximized);
    }
  };

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
        onTouchEnd={(e) => {
          // Manejar doble tap en la barra de título para móviles
          const now = Date.now();
          const lastTouchTime = lastTouchTimeRef.current;
          const DOUBLE_TAP_DELAY = 300;
          
          if (now - lastTouchTime < DOUBLE_TAP_DELAY) {
            e.preventDefault();
            e.stopPropagation();
            toggleMaximize();
          }
          
          lastTouchTimeRef.current = now;
        }}
        style={{ touchAction: 'manipulation' }}
      >
        {/* Izquierda: ícono + título */}
        <div className="title-left">
          <img src="/icons/ie/internetpage.png" alt="icon" className="window-icon" />
          <span>{title}</span>
        </div>

        {/* Derecha: controles */}
        <div className="retro-window-controls">
          <button 
            onClick={onMinimize} 
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMinimize?.();
            }}
            aria-label="Minimizar"
            style={{ touchAction: 'manipulation' }}
          >
            ─
          </button>
          <button 
            onClick={toggleMaximize} 
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMaximize();
            }}
            aria-label="Maximizar/Restaurar"
            style={{ touchAction: 'manipulation' }}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button 
            onClick={onClose} 
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            aria-label="Cerrar"
            style={{ touchAction: 'manipulation' }}
          >
            X
          </button>
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
      bounds={bounds}
    >
      {WindowContent}
    </Draggable>
  );
}
