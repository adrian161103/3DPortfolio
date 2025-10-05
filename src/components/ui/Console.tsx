import { Html } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import RetroWindows from "../sections/RetroWindows";
import WindowsBoot from "./WindowsBoot";
import { LanguageProvider, useLanguage } from "../../context/LanguageContext";
import { consoleEs } from "../../data/console/console.es";
import { consoleEn } from "../../data/console/console.en";
import { ConsoleData } from "../../data/console/consoleTypes";

function ConsoleContent() {
  const { language } = useLanguage();
  const t: ConsoleData = language === "es" ? consoleEs : consoleEn;
  const [showWindows, setShowWindows] = useState(false);
  const [bootFinished, setBootFinished] = useState(false);

  
  // Reinicia el estado de boot cada vez que se cierra la vista de windows para que
  // la secuencia de arranque se reproduzca la próxima vez que el usuario la abra.
  useEffect(() => {
    if (!showWindows) {
      setBootFinished(false);
      // Desactivar modo consola cuando se cierra Windows
      window.dispatchEvent(new CustomEvent("setConsoleMode", { detail: false }));
    }
  }, [showWindows]);

  // Escuchar evento de apagar desde Windows
  useEffect(() => {
    const handleWindowsMode = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setShowWindows(customEvent.detail);
    };

    window.addEventListener("setWindowsMode", handleWindowsMode);
    return () => window.removeEventListener("setWindowsMode", handleWindowsMode);
  }, []);
  
  const commands = useMemo(() => [
    t.commands.about,
    t.commands.projects,
    t.commands.technologies,
    t.commands.education,
    t.commands.windows,
  ], [t]);

  const defaultLines = useMemo(() => [
    t.welcome,
    t.touchScreen,
    "",
    t.availableCommands,
  ], [t]);

  const [lines, setLines] = useState<string[]>([...defaultLines]);
  const backupLinesRef = useRef<string[]>([]);
  const [showCommands, setShowCommands] = useState(true);
  const [currentLine, setCurrentLine] = useState("");
  const [active, setActive] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [flicker, setFlicker] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [corrupting, setCorrupting] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null); // 👈 referencia al contenedor

  // � Actualizar líneas cuando cambie el idioma
  useEffect(() => {
    setLines([...defaultLines]);
  }, [defaultLines]);

  //  Sonido retro
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio("/sounds/zap.mp3");
    audio.volume = 0.4; 
    audioRef.current = audio;
  }, []);

  // Cursor parpadeante
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  //  simula caracteres corruptos
  const randomChar = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const corruptText = useCallback((text: string, strength = 0.7) => {
    return text
      .split("")
      .map((ch) => (ch.trim() && Math.random() < strength ? randomChar() : ch))
      .join("");
  }, [randomChar]);

  // intenta autoescrollear al final
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [lines]);

  // Ejecutar comandos
  const executeCommand = useCallback((command: string, fromClick = false) => {
    const cleanCmd = command.toLowerCase().trim();

    if (!fromClick) {
      setLines((prev) => [...prev, `> ${command}`]);
    }
    setCurrentLine("");

    // cls → limpiar historial (mantener defaultLines)
    if (cleanCmd === "cls") {
      setLines([...defaultLines]);
      setShowCommands(true);
      // Ir a la vista del monitor al limpiar
      window.dispatchEvent(new CustomEvent("setMonitorViewMode"));
      return;
    }

    if (cleanCmd === "lista" || cleanCmd === "list") {
      setLines((prev) => [
        ...prev,
        t.showList,
      ]);
      setShowCommands(true);
      return;
    }

    if (commands.includes(cleanCmd)) {
      setShowCommands(false);

if (cleanCmd === t.commands.windows) {
  setShowWindows(true);
  window.dispatchEvent(new CustomEvent("setWindowsMode", { detail: true }));
  return;
} else {
  setShowWindows(false);
  window.dispatchEvent(new CustomEvent("setWindowsMode", { detail: false }));
  // Disparar evento de consola para otros comandos (about, projects, etc.)
  window.dispatchEvent(new CustomEvent("setConsoleMode", { detail: true }));
}

      // Guardar backup antes de corromper
  const newBackup = [...lines, `> ${command}`];
  backupLinesRef.current = newBackup;

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
      // Ir a la vista del monitor si hay error
      window.dispatchEvent(new CustomEvent("setMonitorViewMode"));
      setLines((prev) => [
        ...prev,
        `<error>${t.commandNotFound} "${command}"</error>`,
        `<error>${t.wantList} ${t.typeList}</error>`,
      ]);
    }
  }, [lines, defaultLines, t, commands, setShowWindows, corruptText]);

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
  }, [active, currentLine, lines, executeCommand]);

  const handleActivate = () => {
    setActive(true);
  };

  return (<>
    <Html
      transform
      position={[0, 1.273, 0.02]}
      rotation={[0, 0, 0]}
      scale={0.0225}
      occlude
      style={{
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="relative w-full h-full">
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
            const isWindows = cleanCmd === t.commands.windows;

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

        {showWindows && !bootFinished && (
        <WindowsBoot
          onFinish={() => {
            setBootFinished(true);
            // permitir que otros escuchadores sepan que estamos en modo windows
            window.dispatchEvent(new CustomEvent("setWindowsMode", { detail: true }));
          }}
        />
      )}

        {showWindows && bootFinished && (
          <LanguageProvider>
            <RetroWindows />
          </LanguageProvider>
        )}
      </div>
    </Html>
  

    </>
   );
}

export default function ConsoleScreen() {
  return (
    <LanguageProvider>
      <ConsoleContent />
    </LanguageProvider>
  );
}
