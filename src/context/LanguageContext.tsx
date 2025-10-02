
import  { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const LANGUAGE_KEY = "i18nextLng";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicializar con el idioma guardado en localStorage o "es" por defecto
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      return (saved === "en" || saved === "es") ? saved : "es";
    } catch {
      return "es";
    }
  });

  // Función para cambiar el idioma y guardarlo en localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
      // Disparar evento personalizado para sincronizar otros providers
      window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
    } catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  };

  // Escuchar cambios de idioma desde otros providers o tabs
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail !== language) {
        setLanguageState(customEvent.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LANGUAGE_KEY && (e.newValue === "en" || e.newValue === "es")) {
        setLanguageState(e.newValue);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
