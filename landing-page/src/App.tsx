import { useState, useEffect } from 'react';
import {
  Sun, Moon, Menu, X, MessageCircle, AlertTriangle, CheckCircle,
  Search, FileText, Send, Clock, ShieldCheck, Ban, AlertCircle,
  RefreshCw, ChevronRight, Car
} from 'lucide-react';

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok
} from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShowPopup(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  const whatsappLink = "https://wa.me/5548991003589?text=Olá! Fui multado e quero saber se consigo recorrer.";



  return (
    <div className="min-h-screen font-sans selection:bg-brand-blue selection:text-white">
      {/* Popup Inicial */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-200 dark:border-zinc-800"
            >
              <button
                onClick={closePopup}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={32} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                  Aviso Importante
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-8 text-center leading-relaxed">
                  A MultaExpert não realiza trâmites por advogados. Todos os processos são feitos pela nossa equipe oficial de especialistas administrativos.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 text-center border border-blue-100 dark:border-blue-800">
                  <p className="text-brand-blue dark:text-blue-300 font-bold text-lg">
                    Recebeu uma multa? Você pode não precisar pagar!
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full py-5 text-lg shadow-xl shadow-green-500/20"
                    onClick={closePopup}
                  >
                    ANALISAR MINHA MULTA
                  </a>
                  <button
                    onClick={closePopup}
                    className="w-full text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    Continuar para o site
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="text-2xl font-black text-brand-blue dark:text-blue-400 tracking-tighter flex items-center gap-2">
                <img
                  src="/logo.png"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Início</a>
              <a href="#como-funciona" className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Como Funciona</a>
              <a href="#servicos" className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Serviços</a>
              <a href="#duvidas" className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Dúvidas</a>
              <a href="#contato" className="text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Contato</a>

              <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-zinc-800">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-all"
                  aria-label="Alternar tema"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <a href={whatsappLink} className="bg-brand-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                  CONSULTA GRÁTIS
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-8 space-y-1">
                <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl">Início</a>
                <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl">Como Funciona</a>
                <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl">Serviços</a>
                <a href="#duvidas" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl">Dúvidas</a>
                <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block px-4 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl">Contato</a>
                <div className="pt-6 px-4">
                  <a href={whatsappLink} className="btn-whatsapp w-full py-4">
                    <MessageCircle size={20} />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-blue/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-16 lg:mb-0"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-300 text-sm font-bold mb-8 shadow-sm">
                <CheckCircle size={16} className="text-brand-green" />
                <span>+20.000 motoristas ajudados em todo o Brasil</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                🚨 Foi multado? Você <span className="text-brand-blue dark:text-blue-400 relative">
                  pode não precisar pagar!
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-green/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Descubra gratuitamente suas chances de sucesso. Nossa equipe jurídica analisa seu caso e monta a melhor estratégia de defesa.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a href={whatsappLink} className="btn-whatsapp text-xl px-12 py-5 shadow-2xl shadow-green-500/30">
                  Receber Consulta Gratuita
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400 dark:text-zinc-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} />
                  <span className="text-sm font-semibold">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span className="text-sm font-semibold">Análise em 15min</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] dark:shadow-none border-8 border-white dark:border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                  alt="Especialista MultaExpert analisando documentos"
                  className="w-full object-cover aspect-[4/5] lg:aspect-square"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Avatar" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <p className="text-white text-sm font-bold">
                        Junte-se a milhares de motoristas satisfeitos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-32 bg-slate-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Como Funciona?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Simplificamos a burocracia para você. Nosso processo é 100% digital e transparente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <MessageCircle size={32} />, title: "Enviar", desc: "Envie sua multa pelo WhatsApp em segundos. Sem formulários chatos.", color: "bg-green-500" },
              { icon: <Search size={32} />, title: "Analisar", desc: "Nossa equipe técnica analisa as chances reais de vitória do seu caso.", color: "bg-blue-500" },
              { icon: <FileText size={32} />, title: "Preparar", desc: "Montamos sua defesa técnica com base na legislação vigente e jurisprudência.", color: "bg-purple-500" },
              { icon: <Send size={32} />, title: "Enviar", desc: "Protocolamos o recurso nos órgãos competentes (DETRAN, PRF, etc).", color: "bg-orange-500" },
              { icon: <Clock size={32} />, title: "Acompanhar", desc: "Monitoramos o andamento do processo e te mantemos informado de tudo.", color: "bg-indigo-500" },
              { icon: <CheckCircle size={32} />, title: "Finalizar", desc: "Resultado entregue e orientação completa sobre sua situação.", color: "bg-brand-green" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 group hover:border-brand-blue/30 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Nossas Especialidades</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Cobertura completa para qualquer tipo de infração ou problema com sua Carteira Nacional de Habilitação.
              </p>
            </div>
            <a href={whatsappLink} className="text-brand-blue dark:text-blue-400 font-bold flex items-center gap-2 hover:gap-3 transition-all group">
              Ver todos os serviços <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Car size={40} />, title: "Recurso de Multas", desc: "Recebeu uma multa e acha que foi injusta? Analisamos seu caso e buscamos a melhor forma de recorrer.", tag: "Novo" },
              { icon: <Ban size={40} />, title: "CNH Suspensa", desc: "Atingiu o limite de pontos? Revertemos a suspensão para você não parar de dirigir.", tag: "Mais Procurado" },
              { icon: <AlertCircle size={40} />, title: "CNH Cassada", desc: "Tratamento jurídico rigoroso para processos de cassação de direito de dirigir.", tag: "Urgente" },
              { icon: <ShieldCheck size={40} />, title: "CNH Bloqueada", desc: "Desbloqueio rápido para problemas no prontuário ou divergências de dados.", tag: "Rápido" },
              { icon: <AlertTriangle size={40} />, title: "Lei Seca (Bafômetro)", desc: "Recursos especializados para bafômetro e recusa, com foco em falhas técnicas.", tag: "Especializado" },
              { icon: <RefreshCw size={40} />, title: "Renovação de CNH", desc: "Assessoria completa para renovação simples ou com EAR, mesmo vencida há muito tempo.", tag: "Prático" },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-brand-blue/5 transition-all relative overflow-hidden group"
              >
                {service.tag && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-300 text-[10px] font-black uppercase tracking-widest">
                    {service.tag}
                  </div>
                )}
                <div className="text-brand-blue dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform origin-left">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-10 flex-grow leading-relaxed font-medium">{service.desc}</p>
                <a href={whatsappLink} className="btn-whatsapp w-full py-4 text-base">
                  Saiba mais
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="py-32 bg-slate-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Dúvidas Frequentes</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Tudo o que você precisa saber para recuperar sua tranquilidade no trânsito.
            </p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="Como falar com a MultaExpert?"
              answer="Você pode entrar em contato conosco clicando em qualquer botão de WhatsApp neste site. Nosso atendimento é imediato e funciona em horário comercial estendido."
            />
            <FaqItem
              question="O que preciso enviar para análise?"
              answer="Basta enviar uma foto da notificação da multa ou o número da placa e RENAVAM. Nossa análise inicial é gratuita e serve para identificar nulidades no auto de infração."
            />
            <FaqItem
              question="Quando os pontos saem do meu prontuário?"
              answer="Os pontos saem do prontuário assim que o recurso é deferido (ganho). Enquanto o recurso está em julgamento, os pontos ficam suspensos e não te impedem de dirigir."
            />
            <FaqItem
              question="Posso dirigir enquanto o recurso está em andamento?"
              answer="Sim! O recurso administrativo garante o efeito suspensivo da penalidade. Isso significa que você mantém seu direito de dirigir normalmente até a decisão final."
            />
            <FaqItem
              question="CNH suspensa tem solução?"
              answer="Com certeza. A maioria dos processos de suspensão possui falhas administrativas que podem ser exploradas para anular a penalidade. Analisamos cada detalhe do processo."
            />
            <FaqItem
              question="Recusar o bafômetro gera multa mesmo sem beber?"
              answer="Sim, a recusa é considerada uma infração gravíssima pelo CTB. No entanto, existem protocolos rígidos que os agentes devem seguir, e falhas nesses protocolos são comuns e anulam a multa."
            />
            <FaqItem
              question="Quanto tempo demora o processo de recurso?"
              answer="O tempo varia conforme o órgão julgador, mas geralmente leva de 3 a 12 meses. O importante é que durante todo esse tempo você continua com sua CNH regularizada."
            />
            <FaqItem
              question="E se o recurso for negado em primeira instância?"
              answer="Ainda temos a segunda instância (CETRAN). Muitos casos que são negados na JARI são ganhos no conselho estadual, onde a análise costuma ser mais técnica e rigorosa."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 text-center shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ainda com dúvidas?</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">Nossos consultores estão online agora para te ajudar.</p>
            <a href={whatsappLink} className="btn-whatsapp inline-flex px-12 py-5 text-lg">
              Fale no WhatsApp agora
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-brand-blue rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand-blue/30">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
                Não perca dinheiro com <br className="hidden md:block" /> <span className="text-blue-200">multa injusta</span>
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-16 max-w-2xl mx-auto font-medium">
                Proteja seu bolso e sua carteira de motorista. Comece sua análise gratuita agora mesmo.
              </p>
              <a href={whatsappLink} className="bg-white text-brand-blue hover:bg-slate-100 font-black py-6 px-16 rounded-2xl text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl inline-flex items-center gap-4">
                FAZER ANÁLISE GRATUITA
                <MessageCircle size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-slate-950 text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-4 gap-16 mb-24">

            {/* LOGO + DESCRIÇÃO */}
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="mb-8 block">
                <img
                  src="/logo.png"
                  alt="MultaExpert"
                  className="h-12 w-auto"
                />
              </a>

              <p className="text-slate-400 max-w-md leading-relaxed text-lg font-medium mb-10">
                Especialistas em recursos de multas e regularização de CNH.
                Atendimento rápido, direto e com alta taxa de sucesso.
              </p>

              {/* REDES SOCIAIS */}
              <div className="flex gap-4 text-2xl">

                <a href="https://instagram.com/multaexpertia" target="_blank"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all border border-white/10 hover:scale-110">
                  <FaInstagram />
                </a>

                <a href="https://tiktok.com/@multaexpert" target="_blank"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 hover:scale-110">
                  <FaTiktok />
                </a>

                <a href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/10 hover:scale-110">
                  <FaYoutube />
                </a>

                <a href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 hover:scale-110">
                  <FaFacebook />
                </a>

              </div>
            </div>

            {/* CONTATO */}
            <div>
              <h4 className="text-xl font-bold mb-8">Contato</h4>
              <ul className="space-y-6 text-slate-400 font-medium">

                <li>
                  <p className="text-white font-bold mb-1">WhatsApp</p>
                  <p>(48) 99100-3589</p>
                </li>

                <li>
                  <p className="text-white font-bold mb-1">E-mail</p>
                  <p>multaexpert01@gmail.com</p>
                </li>

                <li>
                  <p className="text-white font-bold mb-1">Endereço</p>
                  <p>
                    Rua José Ferreira - 101 - Sala 04<br />
                    Tubarão - SC
                  </p>
                </li>

              </ul>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="text-xl font-bold mb-8">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#inicio" className="hover:text-white">Início</a></li>
                <li><a href="#como-funciona" className="hover:text-white">Como Funciona</a></li>
                <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
                <li><a href="#duvidas" className="hover:text-white">Dúvidas</a></li>
              </ul>
            </div>

          </div>

          {/* COPY */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
            <p>© {new Date().getFullYear()} MultaExpert. Todos os direitos reservados.</p>

            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Política de Privacidade</a>
              <a href="#" className="hover:text-white">Termos de Uso</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-brand-green text-white p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(40,167,69,0.3)] hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100 dark:border-zinc-800">
          Análise Gratuita Agora!
        </div>
        <MessageCircle size={32} />
      </motion.a>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex justify-between items-center gap-4 group"
      >
        <span className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#ef4444' : '#0056b3' }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 transition-colors"
        >
          <X size={18} className={isOpen ? "" : "rotate-45"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8"
          >
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
