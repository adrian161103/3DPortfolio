import { useRef, useState } from "react";
import Draggable from "react-draggable";

type RetroWindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
};

export default function RetroWindow({ title, children, onClose, onMinimize }: RetroWindowProps) {
  const [zIndex, setZIndex] = useState(10);
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
        bottom: isMaximized ? "26px" : undefined, // deja espacio para la taskbar
        background: "#c0c0c0",
      }}
      onClick={() => setZIndex((z) => z + 1)}
    >
      {/* Barra de título */}
      <div
        className="bg-[#000080] text-white font-bold px-2 py-0.5 flex justify-between items-center text-[14px] cursor-move retro-window-titlebar"
        onDoubleClick={toggleMaximize}
      >
        <span>{title}</span>
        <div className="flex gap-1 retro-window-controls">
          <button
            onClick={onMinimize}
            className="bg-[#c0c0c0] border-2 border-white px-2 text-[12px] font-bold leading-none"
          >
            ─
          </button>
          <button
            onClick={toggleMaximize}
            className="bg-[#c0c0c0] border-2 border-white px-2 text-[12px] font-bold leading-none"
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            onClick={onClose}
            className="bg-[#c0c0c0] border-2 border-white px-2 text-[12px] font-bold leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`p-2 bg-white text-black text-[13px] overflow-auto ${
          isMaximized ? "flex-1" : "min-h-[120px]"
        }`}
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
      onStart={() => setZIndex((z) => z + 1)}
    >
      {WindowContent}
    </Draggable>
  );
}
