import Hero from "./components/sections/Hero";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";

function App() {
  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <div className="absolute top-2 left-2 z-50">
        <LanguageSwitcher />
      </div>
      <Hero />
    </main>
  );
}

export default App;
