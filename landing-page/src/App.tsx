import React from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

const WHATSAPP_LINK = "https://wa.me/5548991003589?text=Olá,%20vim%20pelo%20site%20da%20MultaExpert";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-green-500/30 font-sans scroll-smooth">
      
      {/* WA BUTTON FIXED */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={32} className="fill-white text-white group-hover:rotate-12 transition-transform" />
      </a>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">M</div>
            <span className="text-xl font-bold tracking-tight uppercase">MultaExpert <span className="text-blue-500">IA</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Como Funciona</a>
            <a href="#beneficios" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Benefícios</a>
            <a 
              href={WHATSAPP_LINK} 
              className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-green-600/20"
            >
              Falar no WhatsApp <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative pt-44 pb-20 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-green-600/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-blue-500/20 uppercase tracking-widest">
                Especialistas em Direito de Trânsito
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
                Recorra sua multa com quem <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent italic underline decoration-blue-500/30">entende do processo.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                Análise rápida, atendimento direto e mais chances de cancelar sua multa sem complicação. Não pague por erros administrativos.
              </p>

              <div className="flex flex-col items-center justify-center gap-6">
                <a 
                  href={WHATSAPP_LINK}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-10 py-5 rounded-2xl text-xl font-black transition-all shadow-2xl shadow-green-600/30 flex items-center justify-center gap-3 group active:scale-95"
                >
                  FALAR NO WHATSAPP <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                </a>
                <p className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                   <Clock size={16} /> Resposta em até 10 minutos (horário comercial)
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="py-24 bg-slate-900/40 border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl relative overflow-hidden">
                  <AlertTriangle className="text-red-500 mb-6" size={48} />
                  <h3 className="text-2xl font-bold mb-4 text-white">Milhares de multas são injustas todos os dias.</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Muitos motoristas acabam pagando multas indevidas por falta de orientação técnica ou por não saberem que erros formais anulam o processo. Não aceite a perda da CNH sem lutar.
                  </p>
                  {/* Watermark icon */}
                  <Shield size={120} className="absolute -bottom-10 -right-10 text-slate-900/50" />
               </div>
               <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-6 italic tracking-tight uppercase">Sua defesa <br /> merece técnica.</h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    A MultaExpert combina perícia jurídica com tecnologia para identificar falhas processuais que anulam multas. Nós cuidamos de tudo para que você mantenha seu direito de dirigir.
                  </p>
                  <ul className="space-y-4">
                     {[
                       "Análise Técnica sem Compromisso",
                       "Equipe Especializada em CTB",
                       "Processo 100% Digital e Rápido"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 font-bold text-slate-300">
                          <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-blue-500" />
                          </div>
                          {item}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black mb-6 italic uppercase tracking-tighter">O Processo é Simples.</h2>
                <p className="text-slate-500 text-lg font-medium">4 passos para sua total tranquilidade.</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Step 
                  number="1"
                  title="Envio da Multa"
                  description="Mande uma foto ou o código da multa pelo WhatsApp em segundos."
                  icon={FileText}
                />
                <Step 
                  number="2"
                  title="Análise do Caso"
                  description="Nossa equipe analisa as falhas formais do seu auto de infração."
                  icon={Shield}
                />
                <Step 
                  number="3"
                  title="Entrada do Recurso"
                  description="Preparamos e protocolamos a defesa técnica fundamentada."
                  icon={Zap}
                />
                <Step 
                  number="4"
                  title="Acompanhamento"
                  description="Você acompanha cada etapa até a decisão final do órgão."
                  icon={CheckCircle}
                />
             </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section id="beneficios" className="py-32 bg-slate-900/20 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                <BenefitCard icon={Clock} title="Atendimento Rápido" description="Respostas ágeis." />
                <BenefitCard icon={CheckCircle} title="Processo Simplificado" description="Sem burocracia." />
                <BenefitCard icon={Zap} title="Mais chances de sucesso" description="Análise técnica." />
                <BenefitCard icon={Shield} title="Sem burocracia" description="Tudo digital." />
                <BenefitCard icon={Users} title="Suporte direto" description="Fale conosco." />
             </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-6">
             <div className="glass rounded-[3rem] p-12 md:p-20 text-center border border-blue-500/20 shadow-3xl">
                <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase leading-none tracking-tighter">Não perca o prazo <br /> para recorrer.</h2>
                <p className="text-slate-400 text-xl mb-12 font-medium max-w-xl mx-auto">
                   Quanto antes agirmos, maiores são as chances de defesa vitoriosa. Fale com um especialista agora.
                </p>
                <a 
                  href={WHATSAPP_LINK}
                  className="bg-green-600 hover:bg-green-700 px-12 py-6 rounded-3xl text-2xl font-black transition-all shadow-2xl shadow-green-600/30 inline-flex items-center gap-4 group hover:scale-105 active:scale-95"
                >
                  FALAR NO WHATSAPP <MessageCircle size={28} />
                </a>
             </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">M</div>
                <span className="text-xl font-bold uppercase tracking-tight">MultaExpert <span className="text-blue-500">IA</span></span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed italic pr-6">
                Reduzindo a burocracia e aumentando as chances de sucesso no seu recurso de trânsito.
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-white font-black text-xl mb-8 uppercase italic underline decoration-blue-600 decoration-4 underline-offset-4">Contato</h4>
                  <ul className="space-y-6 text-slate-400 font-bold">
                    <li className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                          <Phone size={20} className="text-blue-500" />
                       </div>
                       <a href="tel:48991003589" className="hover:text-white transition-colors">(48) 99100-3589</a>
                    </li>
                    <li className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                          <Mail size={20} className="text-blue-500" />
                       </div>
                       <a href="mailto:multaexpert01@gmail.com" className="hover:text-white transition-colors">multaexpert01@gmail.com</a>
                    </li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-black text-xl mb-8 uppercase italic underline decoration-blue-600 decoration-4 underline-offset-4">Endereço</h4>
                  <div className="flex items-start gap-4 text-slate-400 font-bold group">
                     <div className="shrink-0 w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        <MapPin size={20} className="text-blue-500" />
                     </div>
                     <p className="leading-relaxed">
                        Rua José Ferreira, 101 sala 4 <br />
                        Centro, Tubarão - SC
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-900 text-slate-600 text-xs font-black uppercase tracking-widest text-center">
            <p>© {new Date().getFullYear()} MultaExpert. Todos os direitos reservados.</p>
            <p className="mt-4 md:mt-0">Desenvolvido com IA para sua Defesa Jurídica</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Step({ number, title, description, icon: Icon }: { number: string, title: string, description: string, icon: any }) {
  return (
    <div className="relative p-8 glass rounded-3xl border border-slate-800/50 group hover:border-blue-500/30 transition-all shadow-xl">
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-lg shadow-xl shadow-blue-600/30 z-10">
        {number}
      </div>
      <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:bg-blue-600 transition-all">
         <Icon className="text-blue-500 group-hover:text-white" size={28} />
      </div>
      <h4 className="text-xl font-black mb-3 text-white uppercase italic tracking-tighter">{title}</h4>
      <p className="text-slate-500 font-semibold leading-relaxed group-hover:text-slate-400 transition-colors">{description}</p>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
       <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:-translate-y-2 transition-all shadow-lg border border-slate-800 group-hover:border-green-500/50">
          <Icon size={28} className="text-blue-500 group-hover:text-white" />
       </div>
       <h5 className="text-xs font-black uppercase tracking-widest text-slate-300 leading-tight mb-1">{title}</h5>
       <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">{description}</p>
    </div>
  );
}
