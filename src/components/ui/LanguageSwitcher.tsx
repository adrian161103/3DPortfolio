import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const fullName = "Adrian Alejos";

  // Detectar focusMode para fade-out
  useEffect(() => {
    const handleFocus = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setHidden(custom.detail); // true = ocultar
    };

    window.addEventListener("focusMode", handleFocus);
    return () => window.removeEventListener("focusMode", handleFocus);
  }, []);

  // Cursor parpadeante 
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Animación de escritura y borrado
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (!isDeleting) {
        // Escribiendo
        if (currentIndex <= fullName.length) {
          setTypedText(fullName.substring(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, 50); // Velocidad de escritura
        } else {
          // Pausa antes de borrar
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000); // Pausa de 2 segundos
        }
      } else {
        // Borrando
        if (currentIndex >= 0) {
          setTypedText(fullName.substring(0, currentIndex));
          currentIndex--;
          timeoutId = setTimeout(type, 50); // Velocidad de borrado
        } else {
          // Pausa antes de volver a escribir
          timeoutId = setTimeout(() => {
            isDeleting = false;
            currentIndex = 0;
            type();
          }, 1000); // Pausa de 1 segundo
        }
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={` mt-10 ml-10 flex flex-col gap-2 transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}>
  

      {/* Switcher de idioma */}
      <div
        className="relative flex w-24 h-7 border border-gray-600 rounded-sm overflow-hidden font-mono text-xs select-none"
      >
        {/* Background slider */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-white transition-transform duration-300 ease-in-out
            ${language === "es" ? "translate-x-0" : "translate-x-full"} `}
        />

        {/* Botón ES */}
        <button
          className={`cursor-pointer relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300
            ${language === "es" ? "text-black" : "text-gray-300"}`}
          onClick={() => setLanguage("es")}
        >
          ES
        </button>

        {/* Botón EN */}
        <button
          className={`cursor-pointer relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300
            ${language === "en" ? "text-black" : "text-gray-300"}`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
      </div>
          {/* Nombre con animación de escritura */}
      <div className="font-mono text-black  rounded-xs  bg-white text-sm w-28 h-5 flex items-center">
        <span className="">{typedText}</span>
        {cursorVisible && <span className="text-xs text-black ml-0.5">|</span>}
      </div>
    </div>
  );
}
