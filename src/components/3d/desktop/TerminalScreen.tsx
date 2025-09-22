import { useState, useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import FullscreenView from "@/components/ui/FullscreenView";

type ScreenState = "cmd" | "fullscreen";

// Componente que simula una terminal dentro de la pantalla del monitor 3D.
// - `lines` almacena las líneas mostradas en la terminal (historial)
// - `input` es el texto actualmente escrito por el usuario
// - Al ejecutar ciertos comandos, se abre `FullscreenView` con distintas vistas
export default function TerminalScreen() {
  const [screen, setScreen] = useState<ScreenState>("cmd");
  const [currentView, setCurrentView] = useState<string | null>(null);

  // Líneas iniciales de bienvenida; `> ` representa el comando
  const [lines, setLines] = useState<string[]>([
    "AdrianOS v1.0 (c) 2025",
    "Initializing system...",
    "Loading portfolio...",
    "Ready.",
    "> "
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Manejo de comandos escritos por el usuario. Algunos comandos abren
  // vistas a pantalla completa, otros actualizan el historial.
  const handleCommand = (cmd: string) => {
    let newLines: string[] = [];

    switch (cmd.toLowerCase()) {
      case "about":
        setCurrentView("about");
        setScreen("fullscreen");
        return;
      case "projects":
        setCurrentView("projects");
        setScreen("fullscreen");
        return;
      case "contact":
        setCurrentView("contact");
        setScreen("fullscreen");
        return;
      case "launch windows":
        setCurrentView("windows");
        setScreen("fullscreen");
        return;
      case "clear":
        setLines(["> "]);
        return;
      default:
        newLines = [`Comando no reconocido: ${cmd}`];
    }
    setLines(prev => [...prev, `> ${cmd}`, ...newLines, "> "]);
  };

  // Al presionar Enter, procesar el comando actual y limpiar el input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  // Mantener el input oculto enfocado para capturar la entrada del usuario.
  // Este input está posicionado fuera de la vista pero recibe eventos.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (screen === "fullscreen" && currentView) {
    // Registro útil para depuración; FullscreenView se encarga de
    // presentar la información y notificar la salida mediante onExit.
    console.log("Entrando en FullscreenView con:", screen, currentView);
    return (
      <FullscreenView
        view={currentView}
        onExit={() => {
          setScreen("cmd");
          setCurrentView(null);
        }}
      />
    );
  }

  return (
    <Html transform scale={0.12} position={[0, 1.5, -0.05]}>
      <div
        style={{
          width: "400px",
          height: "300px",
          background: "black",
          color: "#00ff55",
          fontFamily: "monospace",
          padding: "10px",
          overflowY: "auto"
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div>
          &gt; {input}
          <span className="blink">_</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        />
      </div>
    </Html>
  );
}
