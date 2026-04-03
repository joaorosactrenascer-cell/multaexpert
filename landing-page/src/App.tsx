import React from 'react';
import { 
  Shield, 
  Zap, 
  Scale, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  FileText, 
  BarChart3, 
  Bot,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const APP_URL = "https://app.multaexpert.com.br";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">M</div>
            <span className="text-xl font-bold tracking-tight">MultaExpert <span className="text-blue-500">IA</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Benefícios</a>
            <a href="#como-funciona" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Como Funciona</a>
            <div className="h-4 w-px bg-slate-800"></div>
            <a href={`${APP_URL}/login`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Entrar</a>
            <a 
              href={`${APP_URL}/login?mode=register`} 
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              Criar Conta Grátis
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium">Benefícios</a>
              <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium">Como Funciona</a>
              <div className="h-px bg-slate-800"></div>
              <a href={`${APP_URL}/login`} className="text-xl font-medium">Entrar</a>
              <a 
                href={`${APP_URL}/login?mode=register`} 
                className="bg-blue-600 p-4 rounded-2xl text-xl font-bold"
              >
                Criar Conta Grátis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-blue-500/20">
                <Bot size={16} /> Inteligência Artificial Jurídica
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                Anule multas injustas <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">em menos de 2 minutos.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                A tecnologia definitiva para especialistas em trânsito e motoristas. 
                Gere recursos jurídicos profissionais usando o poder da nossa IA especializada.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`${APP_URL}/login?mode=register`}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group"
                >
                  Começar Agora Grátis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href={`${APP_URL}/login`}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all border border-slate-800"
                >
                  Já sou usuário
                </a>
              </div>

              {/* Preview UI */}
              <div className="mt-20 relative px-4">
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-3xl pointer-events-none"></div>
                <div className="glass rounded-[2rem] p-4 p-x-0 border border-slate-800/50 shadow-2xl overflow-hidden aspect-video max-w-5xl mx-auto flex items-center justify-center">
                   <div className="flex items-center gap-4 text-slate-500 animate-pulse">
                      <BarChart3 size={48} />
                      <span className="text-2xl font-bold">Dashboard do Especialista</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUST */}
        <section className="py-20 border-y border-slate-900">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                 <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">+50k</div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Defesas Geradas</p>
                 </div>
                 <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">94%</div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Taxa de Sucesso</p>
                 </div>
                 <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">+12k</div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Especialistas</p>
                 </div>
                 <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">R$ 5M+</div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Economizados</p>
                 </div>
              </div>
           </div>
        </section>

        {/* BENEFICIOS */}
        <section id="beneficios" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tight">O que sua consultoria ganha?</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Deixamos o trabalho pesado para a IA para que você foque em escalar o seu faturamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Zap}
                title="Velocidade Impensável"
                description="O que levava 3 horas para pesquisar e redigir agora leva 60 segundos com precisão técnica superior."
              />
              <FeatureCard 
                icon={Shield}
                title="Fundamentação Sólida"
                description="Acesse uma base de dados atualizada com o CTB, resoluções do CONTRAN e jurisprudências recentes."
              />
              <FeatureCard 
                icon={Scale}
                title="Profissionalismo Jurídico"
                description="Documentos gerados em alta qualidade, estruturados e prontos para o protocolo imediato."
              />
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-32 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">Menos burocracia, <br /> mais resultados.</h2>
                  
                  <div className="space-y-8">
                     <Step 
                        number="01"
                        title="Informe os Dados"
                        description="Cole o auto de infração ou anexe a notificação direto no painel do especialista."
                     />
                     <Step 
                        number="02"
                        title="Inteligência IA"
                        description="Nossa IA analisa as falhas formais e processuais do órgão autuador instantaneamente."
                     />
                     <Step 
                        number="03"
                        title="Recurso Pronto"
                        description="Baixe o arquivo profissional PDF/DOCX pronto para ser protocolado e assinado."
                     />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
                  <div className="glass p-10 rounded-[2.5rem] border border-blue-500/20 relative z-10 shadow-3xl">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                           <span className="font-bold">Análise Processual</span>
                        </div>
                        <CheckCircle className="text-green-500" />
                     </div>
                     <div className="space-y-4">
                        <div className="h-3 bg-slate-800 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-800 rounded-full w-4/5"></div>
                        <div className="h-3 bg-slate-800 rounded-full w-2/3"></div>
                     </div>
                     <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <p className="text-sm text-blue-400 font-bold mb-2 uppercase">Conclusão IA</p>
                        <p className="text-slate-300 italic">"Detectada inconsistência técnica na aferição do radar conforme Resolução 798 do CONTRAN..."</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-40 relative">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 md:p-20 text-center shadow-3xl shadow-blue-600/30">
               <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white">Escala sua produção hoje.</h2>
               <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
                  Junte-se a milhares de especialistas que estão faturando mais com menos esforço braçal.
               </p>
               <a 
                href={`${APP_URL}/login?mode=register`}
                className="bg-white text-blue-700 hover:scale-105 px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl inline-flex items-center gap-3"
               >
                 Criar Conta Agora <Zap size={24} fill="currentColor" />
               </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">M</div>
                <span className="text-xl font-bold uppercase tracking-widest">MultaExpert <span className="text-blue-500">IA</span></span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed font-medium">
                Sua parceira tecnológica para o sucesso no direito de trânsito. Otimização, precisão e resultado.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 italic">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href={`${APP_URL}/login`} className="hover:text-blue-500 transition-colors">Acessar App</a></li>
                <li><a href="#beneficios" className="hover:text-blue-500 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Consultoria</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Especilistas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 italic">Suporte</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Ajuda</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-900 text-slate-600 text-sm font-bold tracking-widest uppercase">
            <p>© {new Date().getFullYear()} MultaExpert IA. Todos os direitos reservados.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
               <span>Feito com ❤️ por Especialistas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="glass p-10 rounded-[2rem] border border-slate-800/50 hover:border-blue-500/30 transition-all hover:-translate-y-2 group shadow-lg">
      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
        <Icon className="text-blue-500 group-hover:text-white" size={32} />
      </div>
      <h3 className="text-2xl font-bold mb-4 italic tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-4xl font-extrabold text-slate-800 group-hover:text-blue-500 transition-colors leading-none tracking-tighter">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2 italic tracking-tight">{title}</h4>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
