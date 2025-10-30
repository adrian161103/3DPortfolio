import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

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

  // Calcular límites dinámicamente - limitado al área visible del escritorio Windows 98
  useEffect(() => {
    const updateBounds = () => {
      const taskbarHeight = 55;
      
      // Usar las dimensiones reales del viewport donde se renderiza el desktop
      const desktopWidth = window.innerWidth;
      const desktopHeight = window.innerHeight;
      
      // Usar exactamente las mismas dimensiones que en el estilo de la ventana
      const windowWidth = Math.min(1500, desktopWidth * 0.95); // min(1500px, 95vw)
      const windowHeight = Math.min(800, desktopHeight * 0.85); // min(800px, 85vh)
      
      // Restricción más estricta para el lado derecho - reducir libertad de movimiento
      const rightMargin = 300; // Margen mucho más amplio para limitar el lado derecho (50 + 300)
      const bottomMargin = -500; // Margen negativo para permitir más movimiento hacia abajo
      
      setBounds({
        left: 0, // No permitir que se salga por la izquierda
        top: 0, // No permitir que se salga por arriba
        right: Math.max(0, desktopWidth - windowWidth - rightMargin), // Restricción muy estricta derecha
        bottom: Math.max(0, desktopHeight - taskbarHeight - windowHeight - bottomMargin), // Mayor rango hacia abajo
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
        width: isMaximized ? "100%" : "min(1500px, 95vw)",
        height: isMaximized ? undefined : "min(800px, 85vh)",
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

  // Handler para verificar posición durante el arrastre
  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight;
    const taskbarHeight = 55;
    const windowWidth = Math.min(1500, desktopWidth * 0.95);
    const windowHeight = Math.min(800, desktopHeight * 0.85);
    
    // Verificar que no se salga por la derecha - con restricción adicional de 300px
    const rightLimit = desktopWidth - windowWidth - 300;
    if (data.x > rightLimit) {
      data.x = rightLimit;
    }
    
    // Verificar que no se salga por abajo - permitir mayor rango
    const bottomLimit = desktopHeight - taskbarHeight - windowHeight + 200; // Permitir 200px más hacia abajo
    if (data.y > bottomLimit) {
      data.y = bottomLimit;
    }
    
    // Verificar que no se salga por la izquierda
    if (data.x < 0) {
      data.x = 0;
    }
    
    // Verificar que no se salga por arriba
    if (data.y < 0) {
      data.y = 0;
    }
  };

  return isMaximized ? (
    WindowContent
  ) : (
    <Draggable
      nodeRef={nodeRef}
      handle=".retro-window-titlebar"
      defaultPosition={{ x: 100, y: 100 }}
      onStart={onFocus}
      onDrag={handleDrag}
      bounds={bounds}
    >
      {WindowContent}
    </Draggable>
  );
}
