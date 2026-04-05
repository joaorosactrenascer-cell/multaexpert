import { useState, useEffect } from 'react';
import {
  Sun, Moon, Menu, X, MessageCircle
} from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Inicialização correta
  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      setIsDarkMode(true);
    } else if (saved === 'light') {
      setIsDarkMode(false);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Sincroniza com HTML + salva
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Detecta mudança do sistema
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setIsDarkMode(media.matches);
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const whatsappLink = "https://wa.me/5548991003589?text=Olá! Fui multado e quero saber se consigo recorrer.";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-zinc-800">
        <h1 className="font-bold text-xl">MultaExpert</h1>

        <div className="flex items-center gap-3">
          {/* BOTÃO DARK MODE */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* MENU MOBILE */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO SIMPLES (TESTE) */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          🚨 Foi multado?
        </h2>

        <p className="mb-6">
          Descubra se você pode recorrer agora mesmo.
        </p>

        <a
          href={whatsappLink}
          className="bg-green-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          <MessageCircle size={20} />
          Falar no WhatsApp
        </a>
      </section>

    </div>
  );
}