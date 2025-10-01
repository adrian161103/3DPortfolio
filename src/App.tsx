import Hero from "./components/sections/Hero";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <main className="h-screen w-screen overflow-hidden relative">
        <div className="absolute top-2 left-2 z-50">
          <LanguageSwitcher />
        </div>
        <Hero />
      </main>
    </LanguageProvider>
  );
}

export default App;
