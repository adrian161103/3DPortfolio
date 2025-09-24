import { Html } from "@react-three/drei";
import { useState, useRef } from "react";

export default function ConsoleScreen() {
  const [lines, setLines] = useState<string[]>([
    "Welcome to Retro Console v1.0",
    "Touch the screen and type a command..."
  ]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false); // controla si está "activada" la pantalla
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = input.trim();
      if (command.length > 0) {
        setLines((prev) => [...prev, `> ${command}`]);
        setInput("");
      }
    }
  };

  const handleActivate = () => {
    setActive(true);
    // enfoca el input automáticamente
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <Html
      transform
      position={[0, 1.25, 0.05]} // ajusta según tu monitor
      rotation={[0, 0, 0]}
      scale={0.09}
      occlude
    >
      <div
        style={{
          width: "400px",
          height: "350px",
          background: "#00FF66",
          color: "black",
          fontFamily: "monospace",
          fontSize: "18px",
          padding: "10px",
          overflowY: "auto",
          cursor: "pointer",
        }}
        onClick={handleActivate} // 👈 habilita escritura al hacer click
      >
        {lines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}

        {active && (
          <div>
            <span>&gt; </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                background: "#00FF66",
                color: "black",
                border: "none",
                outline: "none",
                fontFamily: "monospace",
                fontSize: "18px",
                width: "90%",
              }}
            />
          </div>
        )}
      </div>
    </Html>
  );
}
