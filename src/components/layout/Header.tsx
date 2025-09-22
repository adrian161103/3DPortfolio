import { useEffect, useState } from 'react';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white font-mono text-xl">AG</div>
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="text-white hover:text-green-400 transition">
            About
          </a>
          <a href="#projects" className="text-white hover:text-green-400 transition">
            Projects
          </a>
          <a href="#contact" className="text-white hover:text-green-400 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}