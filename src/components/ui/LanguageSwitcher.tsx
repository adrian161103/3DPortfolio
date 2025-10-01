import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [hidden, setHidden] = useState(false);

  // Detectar focusMode para fade-out
  useEffect(() => {
    const handleFocus = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setHidden(custom.detail); // true = ocultar
    };

    window.addEventListener("focusMode", handleFocus);
    return () => window.removeEventListener("focusMode", handleFocus);
  }, []);

  return (
    <div
      className={`relative flex w-24 h-7 border border-gray-600 rounded-sm overflow-hidden font-mono text-xs select-none
        transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background slider */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-white transition-transform duration-300 ease-in-out
          ${language === "es" ? "translate-x-0" : "translate-x-full"}`}
      />

      {/* Botón ES */}
      <button
        className={`relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300
          ${language === "es" ? "text-black" : "text-gray-300"}`}
        onClick={() => setLanguage("es")}
      >
        ES
      </button>

      {/* Botón EN */}
      <button
        className={`relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300
          ${language === "en" ? "text-black" : "text-gray-300"}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
