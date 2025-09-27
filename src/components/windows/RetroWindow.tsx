import { useRef, useState } from "react";
import Draggable from "react-draggable";

type RetroWindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function RetroWindow({ title, children, onClose }: RetroWindowProps) {
  const [zIndex, setZIndex] = useState(10);
  const nodeRef = useRef(null); // 👈 referencia al nodo real

  return (
    <Draggable
      nodeRef={nodeRef} // 👈 le pasamos la ref
      handle=".retro-window-titlebar"
      defaultPosition={{ x: 100, y: 100 }}
      onStart={() => setZIndex((z) => z + 1)}
    >
      <div
  ref={nodeRef}
  className="absolute w-[300px] bg-[#c0c0c0] border-2 border-[#808080] shadow-[4px_4px_0_#00000044] font-[Tahoma,sans-serif]"
  style={{ zIndex }}
  onClick={() => setZIndex((z) => z + 1)}
>
  {/* Barra de título */}
  <div
    className="bg-[#000080] text-white font-bold px-2 py-0.5 flex justify-between items-center text-[14px] cursor-move retro-window-titlebar"
  >
    <span>{title}</span>
    <div className="flex gap-1 retro-window-controls">
      <button className="bg-[#c0c0c0] border-2 border-white px-2 text-[12px] font-bold leading-none">
        ─
      </button>
      <button className="bg-[#c0c0c0] border-2 border-white px-2 text-[12px] font-bold leading-none">
        □
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
  <div className="p-2 bg-white text-black text-[13px] min-h-[120px] retro-window-content">
    {children}
  </div>
</div>

    </Draggable>
  );
}
