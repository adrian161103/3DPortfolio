import { useRef, useState } from "react";
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
  const nodeRef = useRef(null);

  const toggleMaximize = () => setIsMaximized((prev) => !prev);

  const WindowContent = (
    <div
      ref={nodeRef}
      className={`font-[Tahoma,sans-serif] flex flex-col ${
        isMaximized ? "" : "border-2 border-[#808080] shadow-[4px_4px_0_#00000044]"
      }`}
      style={{
        zIndex,
        position: "absolute",
        width: isMaximized ? "100%" : "300px",
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
        right: isMaximized ? 0 : undefined,
        bottom: isMaximized ? "26px" : undefined,
        background: "#c0c0c0",
      }}
      onMouseDown={onFocus} // 👈 trae al frente al click
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
    <button onClick={onMinimize}>─</button>
    <button onClick={toggleMaximize}>{isMaximized ? "❐" : "□"}</button>
    <button onClick={onClose}>X</button>
  </div>
</div>

      {/* Contenido */}
      <div
        className={`p-2 bg-white text-black text-[13px] overflow-auto ${
          isMaximized ? "flex-1" : "min-h-[120px]"
        }`
        }
      >
        {children}
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
      onStart={onFocus} // 👈 trae al frente también al arrastrar
    >
      {WindowContent}
    </Draggable>
  );
}
