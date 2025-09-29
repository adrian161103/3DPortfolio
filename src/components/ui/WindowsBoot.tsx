import { useEffect, useState, useRef } from "react";

const winLogo = "/boot/logow98.webp";
const winSound = "/boot/Inicio de Windows 98 [KQ0kT_FqFxA].mp3";

export default function WindowsBoot({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"bios" | "logo">("bios");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(false);

  const indexRef = useRef(0);
  const finishedRef = useRef(false); // evita dobles llamados

  useEffect(() => {
    if (stage === "bios") {
      const biosText = [
        "Award Modular BIOS v6.00PG, An Energy Star Ally",
        "Copyright (C) 1984-2001 Award Software, Inc.",
        "",
        "CPU: 1.20GHz",
        "Memory Test:  515072K OK",
        "Cache Memory: 512K",
        "",
        "Diskette Drive A: 1.44M, 3.5 in.",
        "Diskette Drive B: None",
        "Pri. Master Disk: LBA, DMA, 2,33024MB",
        "Pri. Slave Disk: None",
        "Sec. Master Disk: DVD-RW, DMA 2",
        "Sec. Slave Disk: None",
        "",
        "Display Type: EGA/VGA",
        "Serial Port(s): None",
        "Parallel Port(s): None",
        "DDR at Row(s): 0 1",
        "",
        "Pri. Master Disk: HDD S.M.A.R.T. capability .... Disabled",
      ];

      const interval = setInterval(() => {
        if (indexRef.current < biosText.length) {
          setVisibleLines((prev) => [...prev, biosText[indexRef.current]]);
          indexRef.current += 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage("logo"), 1500);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "logo" && !finishedRef.current) {
      finishedRef.current = true; // aseguramos solo una vez
      setFadeIn(true);

      const audio = new Audio(winSound);
      audio.play().catch(() => console.warn("Autoplay bloqueado"));

      setTimeout(() => {
        onFinish();
      }, 5000);
    }
  }, [stage, onFinish]);

  // Overlay absoluto que cubre todo el contenedor padre: fondo opaco para ocultar el contenido principal y mostrar el boot.

  return (
    <div className="absolute inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
      <div className="w-full h-full relative">
        {stage === "bios" && (
          <div className="w-full h-full bg-black text-green-400 font-mono text-xs p-6 overflow-auto leading-tight">
            {visibleLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        )}

        {stage === "logo" && (
          <img
            src={winLogo}
            alt="Windows 98 Logo"
            style={{ transition: "opacity 1.2s ease" }}
            className={`w-full h-full object-cover ${fadeIn ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
    </div>
  );
}
