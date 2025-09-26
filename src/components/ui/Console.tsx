import { Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import RetroWindows from "../sections/RetroWindows";

export default function ConsoleScreen() {
  const [showWindows, setShowWindows] = useState(false);
  const commands = [
    "about",
    "projects",
    "technologies",
    "education",
    "windows",
  ];

  const defaultLines = [
    "Welcome to Retro Console v1.0",
    "Touch the screen and type a command...",
    "",
    "Available commands:",
  ];

  const [lines, setLines] = useState<string[]>([...defaultLines]);
  const [backupLines, setBackupLines] = useState<string[]>([]);
  const [showCommands, setShowCommands] = useState(true);
  const [currentLine, setCurrentLine] = useState("");
  const [active, setActive] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [flicker, setFlicker] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [corrupting, setCorrupting] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null); // 👈 referencia al contenedor

  // 🎵 Sonido retro
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio("/sounds/zap.mp3");
  }, []);

  // Cursor parpadeante
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  //  simula caracteres corruptos
  const randomChar = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const corruptText = (text: string, strength = 0.7) => {
    return text
      .split("")
      .map((ch) => (ch.trim() && Math.random() < strength ? randomChar() : ch))
      .join("");
  };

  // intenta autoescrollear al final
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [lines]);

  // Ejecutar comandos
  const executeCommand = (command: string, fromClick = false) => {
    const cleanCmd = command.toLowerCase().trim();

    if (!fromClick) {
      setLines((prev) => [...prev, `> ${command}`]);
    }
    setCurrentLine("");

    // cls → limpiar historial (mantener defaultLines)
    if (cleanCmd === "cls") {
      setLines([...defaultLines]);
      setShowCommands(true);
      return;
    }

    if (cleanCmd === "lista") {
      setLines((prev) => [
        ...prev,
        "Mostrando lista de comandos nuevamente...",
      ]);
      setShowCommands(true);
      return;
    }

    if (commands.includes(cleanCmd)) {
      setShowCommands(false);

    if (cleanCmd === "windows") {
  setShowWindows(true); //  Windows retro
  return;
}

      // Guardar backup antes de corromper
      const newBackup = [...lines, `> ${command}`];
      setBackupLines(newBackup);

      // Corrupción global
      setCorrupting(true);
      let iterations = 0;
      const corruptInterval = setInterval(() => {
        iterations++;
        setLines((prev) => prev.map((l) => corruptText(l, 0.8)));
        if (iterations > 5) {
          clearInterval(corruptInterval);
          setCorrupting(false);
          // Restaurar backup al terminar
          setLines(newBackup);
        }
      }, 120);

      // Glitch global + sonido
      setFlicker(true);
      setGlobalGlitch(true);
      setTimeout(() => setFlicker(false), 300);
      setTimeout(() => setGlobalGlitch(false), 500);

      setHighlightIndex(lines.length);
      setTimeout(() => setHighlightIndex(null), 1000);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      console.log("🌌 Ejecutar portal futurista para:", cleanCmd);
    } else {
      setShowCommands(false);
      setLines((prev) => [
        ...prev,
        `<error>Comando no reconocido: "${command}"</error>`,
        `<error>¿Quieres ver la lista? Escribe: lista</error>`,
      ]);
    }
  };

  // Manejo de teclado
  useEffect(() => {
    if (!active) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (currentLine.trim().length > 0) {
          executeCommand(currentLine.trim());
        }
      } else if (e.key === "Backspace") {
        setCurrentLine((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setCurrentLine((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, currentLine, lines]);

  const handleActivate = () => {
    setActive(true);
  };

  return (<>
    <Html
      transform
      position={[0, 1.25, 0.02]}
      rotation={[0, 0, 0]}
      scale={0.09}
      occlude
    >
      <div
        ref={consoleRef}
        className={`console ${flicker ? "flicker" : ""} ${
          globalGlitch ? "global-glitch" : ""
        } ${corrupting ? "corrupting" : ""} scrollbar-retro`}
        onClick={handleActivate}
        style={{ cursor: active ? "text" : "pointer" }}
      >
        {/* Historial */}
        {lines.map((line, idx) => {
          if (line.startsWith(">")) {
            const cleanCmd = line.replace(">", "").trim().toLowerCase();
            const isValid = commands.includes(cleanCmd);
            const isWindows = cleanCmd === "windows";

            if (isValid && !isWindows && cleanCmd !== "cls") {
              return (
                <div
                  key={idx}
                  className={
                    highlightIndex === idx ? "glitch-strong" : "glitch"
                  }
                >
                  {line}
                </div>
              );
            }

            if (isWindows) {
              return (
                <div key={idx} className="clean-line">
                  {line}
                </div>
              );
            }

            return (
              <div key={idx} className="clean-line">
                {line}
              </div>
            );
          }

          if (line.startsWith("<error>")) {
            return (
              <div key={idx} className="error-glitch">
                {line.replace(/<\/?error>/g, "")}
              </div>
            );
          }

          return <div key={idx}>{line}</div>;
        })}

        {/* Lista de comandos */}
        {showCommands && (
          <div className="command-list">
            {commands.map((cmd, idx) => (
              <div key={`cmd-${idx}`}>
                <span
                  className="command-text"
                  onClick={() => executeCommand(cmd, true)}
                >
                  - {cmd}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Input en vivo */}
        {active && (
          <div>
            <span className="clean-line">&gt; {currentLine}</span>
            {cursorVisible && <span className="cursor">█</span>}
          </div>
        )}
      </div>
      {showWindows && <RetroWindows />}
    </Html>
  

    </>
   );
}
