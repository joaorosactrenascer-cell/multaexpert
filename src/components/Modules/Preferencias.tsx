import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Globe, 
  Bell, 
  Shield, 
  Eye, 
  Trash2, 
  Download, 
  Moon, 
  Sun, 
  Monitor,
  Check,
  Languages,
  Accessibility,
  Database
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useTheme } from '@/src/context/ThemeContext';

export const Preferencias: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('pt-BR');
  const [fontSize, setFontSize] = useState('medium');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    whatsapp: false,
    marketing: false
  });

  const languages = [
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Palette className="h-4 w-4" />
            <span>Personalização</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Preferências do Sistema</h1>
          <p className="text-slate-500 dark:text-slate-400">Ajuste a interface e o comportamento do MultaExpert ao seu gosto.</p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {/* Appearance Section */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-primary/10 p-2 dark:bg-primary/20">
                <Sun className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aparência e Tema</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'light', name: 'Claro', icon: Sun, active: theme === 'light' },
                { id: 'dark', name: 'Escuro', icon: Moon, active: theme === 'dark' },
                { id: 'system', name: 'Sistema', icon: Monitor, active: false },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => t.id !== 'system' && theme !== t.id && toggleTheme()}
                  className={cn(
                    "flex flex-col items-center gap-4 rounded-2xl border-2 p-6 transition-all",
                    t.active 
                      ? "border-primary bg-primary/5 dark:bg-primary/10" 
                      : "border-slate-100 bg-slate-50 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  )}
                >
                  <t.icon className={cn("h-8 w-8", t.active ? "text-primary" : "text-slate-400")} />
                  <span className={cn("text-sm font-bold", t.active ? "text-primary" : "text-slate-500")}>{t.name}</span>
                  {t.active && (
                    <div className="absolute top-3 right-3 rounded-full bg-primary p-1 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Language & Region */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-secondary/10 p-2 dark:bg-secondary/20">
                <Languages className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Idioma e Região</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Idioma do Sistema</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Fuso Horário</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                    <option>(GMT-03:00) Brasília, São Paulo</option>
                    <option>(GMT-04:00) Manaus, Cuiabá</option>
                    <option>(GMT-05:00) Rio Branco</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-900/20">
                <Accessibility className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Acessibilidade</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tamanho da Fonte</h4>
                  <p className="text-xs text-slate-500">Ajuste o tamanho do texto para melhor leitura.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={cn(
                        "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                        fontSize === size 
                          ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      )}
                    >
                      {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alto Contraste</h4>
                  <p className="text-xs text-slate-500">Aumenta o contraste das cores para facilitar a visão.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-800 p-1 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-white transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-red-50 p-2 dark:bg-red-900/20">
                <Database className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gestão de Dados</h3>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Exportar Meus Dados</h4>
                  <p className="text-xs text-slate-500">Baixe uma cópia de todos os seus processos e defesas em formato JSON.</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all">
                  <Download className="h-4 w-4" />
                  Exportar Agora
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                <div>
                  <h4 className="text-sm font-bold text-red-900 dark:text-red-300">Excluir Conta</h4>
                  <p className="text-xs text-red-700 dark:text-red-400">Esta ação é irreversível e apagará todos os seus dados permanentemente.</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-100 dark:shadow-none hover:bg-red-700 transition-all">
                  <Trash2 className="h-4 w-4" />
                  Excluir Permanentemente
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Save Bar (Floating) */}
        <div className="sticky bottom-6 flex items-center justify-between rounded-2xl bg-slate-900/90 backdrop-blur-md p-4 text-white shadow-2xl dark:bg-primary/90">
          <div className="flex items-center gap-3 px-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium">Alterações são salvas automaticamente</span>
          </div>
          <button className="rounded-xl bg-white px-6 py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-all">
            Restaurar Padrões
          </button>
        </div>
      </div>
    </div>
  );
};
