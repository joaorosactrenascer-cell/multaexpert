import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  FileText, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Gavel,
  Calendar,
  MapPin,
  Car
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useDefesas } from '@/src/features/defesas/hooks/useDefesas';

export const NovaDefesa: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    autoInfracao: '',
    placa: '',
    dataOcorrencia: '',
    tipoMulta: '',
    descricao: ''
  });
  const [loading, setLoading] = useState(false);
  const { createDefesa } = useDefesas();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleGerarDefesa = async () => {
    setLoading(true);
    // Simula a geracao de IA (vai ser o modulo de IA real no futuro)
    setTimeout(async () => {
      await createDefesa({
        status: 'analise',
        conteudo_gerado: { model: 'gpt-4', version: '1.0' },
        url_documento: null,
      });
      alert('Defesa gerada com sucesso e enviada para análise!');
      setStep(1);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Gavel className="h-4 w-4" />
            <span>Módulo de Defesas</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Nova Defesa Jurídica</h1>
          <p className="text-slate-500 dark:text-slate-400">Siga os passos abaixo para gerar sua defesa personalizada com auxílio de IA.</p>
        </header>

        {/* Stepper */}
        <div className="relative flex justify-between before:absolute before:top-5 before:left-0 before:h-0.5 before:w-full before:bg-slate-200 dark:before:bg-slate-800">
          {[
            { s: 1, label: 'Identificação', icon: Search },
            { s: 2, label: 'Documentação', icon: Upload },
            { s: 3, label: 'Revisão IA', icon: FileText },
          ].map((item) => (
            <div key={item.s} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                step >= item.s 
                  ? "border-primary bg-primary text-white" 
                  : "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-950"
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                step >= item.s ? "text-primary" : "text-slate-400"
              )}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Auto de Infração</label>
                  <div className="relative">
                    <AlertCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Ex: A1234567"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Placa do Veículo</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Ex: ABC-1234"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Data da Ocorrência</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="date" 
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Local (Cidade/UF)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Ex: São Paulo / SP"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-900/20">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-amber-600" />
                  <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-400">
                    Certifique-se de que os dados acima coincidem exatamente com a Notificação de Autuação recebida para garantir a validade jurídica da defesa.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-12 transition-colors hover:border-primary dark:border-slate-800">
                <div className="rounded-full bg-primary/10 p-4 dark:bg-primary/20">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Upload da Notificação</h3>
                <p className="mt-1 text-sm text-slate-500">Arraste o PDF ou imagem aqui, ou clique para selecionar</p>
                <button className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90">
                  Selecionar Arquivo
                </button>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Documentos Sugeridos:</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'CNH do Condutor',
                    'CRLV do Veículo',
                    'Notificação de Autuação',
                    'Provas Adicionais (Fotos/Vídeos)'
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
                      <div className="h-2 w-2 rounded-full bg-slate-300" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 rounded-2xl bg-primary p-6 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Pronto para Análise IA</h3>
                  <p className="text-sm text-white/80">Nossa inteligência artificial jurídica processará seus dados.</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sua versão dos fatos (Opcional)</label>
                <textarea 
                  rows={4}
                  placeholder="Descreva brevemente o que aconteceu para ajudar a IA a construir argumentos mais fortes..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 dark:border-primary/20 dark:bg-primary/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Argumentos que serão analisados:</h4>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <ArrowRight className="h-3 w-3 text-primary" />
                    Verificação de erros formais no auto de infração
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <ArrowRight className="h-3 w-3 text-primary" />
                    Análise de tempestividade (prazos legais)
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <ArrowRight className="h-3 w-3 text-primary" />
                    Enquadramento no Código de Trânsito Brasileiro (CTB)
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-8 dark:border-slate-800">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-xl px-6 py-2.5 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-900"
            >
              Voltar
            </button>
            <button 
              onClick={step === 3 ? handleGerarDefesa : nextStep}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 dark:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : (step === 3 ? 'Gerar Defesa com IA' : 'Continuar')}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
