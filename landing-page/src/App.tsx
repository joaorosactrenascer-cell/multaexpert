import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  FileText, 
  Check,
  MessageCircle,
  Clock,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  HelpCircle,
  AlertTriangle,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_LINK = "https://wa.me/5548991003589?text=Olá,%20recebi%20uma%20multa%20e%20quero%20saber%20se%20posso%20recorrer.";

// Cores extraídas da logo
const COLORS = {
  primaryBlue: "#0B2F5E",
  secondaryGreen: "#598B2C",
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-500/30 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* WA BUTTON FIXED */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group active:scale-95"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={32} className="text-white fill-white group-hover:rotate-12 transition-transform" />
      </a>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-all ${isDark ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img src="/logo.png" alt="MultaExpert Logo" className="h-12 w-auto" />
             <div className="h-8 w-px bg-slate-300 dark:bg-slate-800 hidden sm:block"></div>
             <span className="text-lg font-bold tracking-tighter uppercase hidden sm:block">
               Multa<span style={{ color: COLORS.secondaryGreen }}>Expert</span>
             </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${isDark ? 'border-slate-800 bg-slate-900 text-yellow-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
              aria-label="Alternar Tema"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href={WHATSAPP_LINK} 
              className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
            >
              Consultar <span className="hidden sm:inline">Grátis</span> <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative pt-44 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1]">
                Recebeu uma multa? <br />
                <span style={{ color: COLORS.primaryBlue }} className="dark:text-blue-400">Você pode não precisar pagar.</span>
              </h1>
              <p className={`text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Descubra agora se sua multa pode ser cancelada. Análise rápida, técnica e gratuita pelo WhatsApp.
              </p>

              <div className="flex flex-col items-center justify-center gap-6">
                <a 
                  href={WHATSAPP_LINK}
                  className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-12 py-5 rounded-2xl text-xl font-black text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group shadow-blue-700/20"
                >
                  QUERO ANALISAR MINHA MULTA <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BLOCO DE URGÊNCIA */}
        <section className={`py-4 transition-colors ${isDark ? 'bg-red-950/30' : 'bg-red-50'}`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
             <p className="text-red-600 dark:text-red-400 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                <Clock size={16} /> O prazo para recorrer é limitado. Quanto antes agir, maiores as chances.
             </p>
          </div>
        </section>

        {/* PROBLEMA / SOLUÇÃO */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Muitas multas são aplicadas <span className="text-red-600 italic">com erro</span>.</h2>
                  <p className={`text-lg mb-8 leading-relaxed font-medium transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Pagou a multa sem nem ler? Você pode ter perdido dinheiro. Órgãos autuadores cometem erros formais constantemente: radares sem aferição, sinalização incorreta ou erros no preenchimento do auto.
                  </p>
                  <p className={`text-lg mb-8 leading-relaxed font-medium transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    A MultaExpert analisa cada detalhe técnico para garantir que você não seja punido injustamente.
                  </p>
               </div>
               <div className={`p-10 rounded-[3rem] border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Cuidamos de tudo para você:</h3>
                  <div className="space-y-6">
                     <FeatureItem text="Análise detalhada do Auto de Infração" isDark={isDark} />
                     <FeatureItem text="Busca por falhas na sinalização ou no radar" isDark={isDark} />
                     <FeatureItem text="Protocolo e acompanhamento do recurso" isDark={isDark} />
                     <FeatureItem text="Defesa fundamentada no CTB e Resoluções" isDark={isDark} />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className={`py-32 transition-colors ${isDark ? 'bg-slate-900/40' : 'bg-blue-50/40'}`}>
          <div className="max-w-7xl mx-auto px-6 text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black mb-6 italic uppercase tracking-tighter">Seu Recurso em 4 Etapas.</h2>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             <Step 
                number="01"
                title="Fale Conosco"
                description="Clique no botão e envie sua multa pelo WhatsApp."
                icon={MessageCircle}
                isDark={isDark}
             />
             <Step 
                number="02"
                title="Análise IA"
                description="Nossos especialistas analisam viabilidade sem compromisso."
                icon={Zap}
                isDark={isDark}
             />
             <Step 
                number="03"
                title="Defesa"
                description="Montamos o recurso jurídico totalmente fundamentado."
                icon={Shield}
                isDark={isDark}
             />
             <Step 
                number="04"
                title="Decisão"
                description="Acompanhamos o julgamento até a decisão final."
                icon={CheckCircle}
                isDark={isDark}
             />
          </div>
        </section>

        {/* BENEFICIOS / PROVA */}
        <section id="beneficios" className="py-32 border-t border-slate-100 dark:border-slate-900">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                 <div className="lg:col-span-2">
                    <h2 className="text-4xl font-black mb-12 italic uppercase tracking-tighter underline decoration-blue-600 decoration-8 underline-offset-8">Por que escolher especialistas?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <Benefit icon={Users} title="Atendimento Humano" desc="Suporte direto, sem robôs travados." isDark={isDark} />
                       <Benefit icon={Shield} title="Garantia de Técnica" desc="Base jurídica atualizada com o CTB." isDark={isDark} />
                       <Benefit icon={CheckCircle} title="Mais de 5.000 Casos" desc="Experiência comprovada em todo Brasil." isDark={isDark} />
                       <Benefit icon={Clock} title="Rapidez" desc="Análise em minutos via WhatsApp." isDark={isDark} />
                    </div>
                 </div>
                 <div className={`p-10 rounded-[2.5rem] transition-all sticky top-28 ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-2xl border border-slate-100'}`}>
                    <div className="text-blue-600 mb-6 font-black text-xs uppercase tracking-widest">Confiança MultaExpert</div>
                    <p className={`text-xl font-bold italic mb-8 leading-relaxed ${isDark ? 'text-white' : 'text-slate-800'}`}>
                       "Nossa missão não é apenas recorrer, é garantir que o processo legal de trânsito seja seguido com rigor técnico."
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl uppercase">ME</div>
                       <div>
                          <p className="font-black text-sm uppercase">Equipe Jurídica</p>
                          <p className="text-slate-500 text-xs font-bold uppercase">MultaExpert Especialistas</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-6">
             <div style={{ backgroundColor: COLORS.primaryBlue }} className="rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl transition-transform hover:scale-[1.01]">
                <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter">Não perca dinheiro com multa injusta.</h2>
                <p className="text-blue-100 text-lg md:text-xl mb-12 font-bold max-w-xl mx-auto opacity-90">
                   Muitas vezes o valor da multa é o de menos. A pontuação pode tirar seu sustento. Recorra hoje!
                </p>
                <a 
                  href={WHATSAPP_LINK}
                  className="bg-white hover:scale-105 px-12 py-6 rounded-3xl text-2xl font-black transition-all shadow-xl inline-flex items-center gap-4 active:scale-95 group"
                >
                  <span style={{ color: COLORS.primaryBlue }}>ANÁLISE GRÁTIS POR WHATSAPP</span> 
                  <MessageCircle size={28} className="text-green-600" />
                </a>
             </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`py-20 border-t transition-colors ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
            <div className="col-span-1">
              <img src="/logo.png" alt="Logo" className="h-16 w-auto mx-auto md:mx-0 mb-8" />
              <p className={`font-semibold italic transition-colors ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                Tecnologia e perícia em defesa de trânsito.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-xl mb-8 uppercase italic transition-colors">Atendimento</h4>
              <ul className={`space-y-4 font-bold transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li className="flex items-center justify-center md:justify-start gap-4">
                   <Phone size={18} style={{ color: COLORS.primaryBlue }} /> (48) 99100-3589
                </li>
                <li className="flex items-center justify-center md:justify-start gap-4">
                   <Mail size={18} style={{ color: COLORS.primaryBlue }} /> multaexpert01@gmail.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8 uppercase italic transition-colors">Onde Estamos</h4>
              <div className={`flex items-start justify-center md:justify-start gap-4 font-bold transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                 <MapPin size={24} style={{ color: COLORS.primaryBlue }} className="mt-1 shrink-0" />
                 <p className="leading-relaxed">
                    Rua José Ferreira, 101 sala 4 <br />
                    Centro, Tubarão - SC
                 </p>
              </div>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center justify-between pt-12 border-t text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDark ? 'border-slate-900 text-slate-700' : 'border-slate-200 text-slate-400'}`}>
            <p>© {new Date().getFullYear()} MultaExpert IA. Todos os direitos reservados.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
               <span>Defesa de Multas com Especialistas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ text, isDark }: { text: string, isDark: boolean }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-6 h-6 bg-green-500 flex items-center justify-center rounded-full shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
        <Check size={14} className="text-white" />
      </div>
      <span className={`font-bold transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{text}</span>
    </div>
  );
}

function Step({ number, title, description, icon: Icon, isDark }: { number: string, title: string, description: string, icon: any, isDark: boolean }) {
  return (
    <div className="text-center group">
       <div className={`w-20 h-20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 border transition-all ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-xl group-hover:shadow-2xl'}`}>
          <Icon size={32} />
       </div>
       <div className="text-blue-600 font-black mb-2 flex items-center justify-center gap-2">
          <span>{number}</span> <ChevronRight size={14} />
       </div>
       <h4 className="text-xl font-black mb-4 uppercase italic tracking-tighter">{title}</h4>
       <p className={`font-semibold leading-relaxed transition-colors ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{description}</p>
    </div>
  );
}

function Benefit({ icon: Icon, title, desc, isDark }: { icon: any, title: string, desc: string, isDark: boolean }) {
  return (
    <div className="flex gap-6 items-start group">
       <div className={`p-4 rounded-2xl transition-all ${isDark ? 'bg-slate-900 text-blue-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
          <Icon size={24} />
       </div>
       <div>
          <h4 className="font-black text-lg uppercase italic mb-1 tracking-tighter">{title}</h4>
          <p className={`font-bold text-sm transition-colors ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{desc}</p>
       </div>
    </div>
  );
}
