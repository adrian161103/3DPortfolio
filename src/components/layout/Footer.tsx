export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Adrián Alejos García. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a 
              href="https://github.com/tuuser" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/tuuser" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}