import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Upload, 
  FileText, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scale,
  BrainCircuit,
  FileSearch
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AnalysisResult {
  infraction: string;
  probability: number;
  errorsFound: string[];
  legalBasis: string[];
  recommendation: string;
}

export const AnaliseAutomatica: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI Analysis
    setTimeout(() => {
      setResult({
        infraction: "Excesso de Velocidade (Art. 218, I do CTB)",
        probability: 85,
        errorsFound: [
          "Aferição do radar vencida (última em 14/02/2023)",
          "Ausência de foto nítida da placa do veículo",
          "Divergência no endereço da autuação"
        ],
        legalBasis: [
          "Resolução CONTRAN nº 798/2020",
          "Artigo 280 do Código de Trânsito Brasileiro",
          "Súmula 312 do STJ"
        ],
        recommendation: "Recomendamos o protocolo de Defesa Prévia focando na nulidade do equipamento medidor de velocidade."
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <BrainCircuit className="h-4 w-4" />
            <span>Inteligência Artificial Jurídica</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Análise Automática de Multas</h1>
          <p className="text-slate-500 dark:text-slate-400">Nossa IA escaneia seu documento em busca de erros formais e brechas legais para anulação.</p>
        </header>

        {!result && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Upload Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 transition-all hover:border-primary dark:border-slate-800 dark:bg-slate-950">
                <div className="rounded-2xl bg-primary/10 p-4 dark:bg-primary/20">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Upload da Notificação</h3>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Arraste o PDF ou foto da sua multa aqui.<br />
                  Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
                </p>
                <button 
                  onClick={startAnalysis}
                  className="mt-8 flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90"
                >
                  <FileSearch className="h-4 w-4" />
                  Selecionar e Analisar
                </button>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300">Privacidade Garantida</h4>
                    <p className="mt-1 text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                      Seus documentos são processados de forma anônima e criptografada. Não compartilhamos seus dados com órgãos de trânsito.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">O que analisamos?</h4>
              {[
                { icon: Search, title: 'Erros Formais', desc: 'Dados incorretos no auto de infração.' },
                { icon: Scale, title: 'Base Legal', desc: 'Enquadramento correto no CTB e Resoluções.' },
                { icon: Zap, title: 'Probabilidade', desc: 'Cálculo estatístico de sucesso do recurso.' },
                { icon: FileText, title: 'Argumentação', desc: 'Sugestão dos melhores termos jurídicos.' },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{feature.title}</h5>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                <div className="absolute inset-4 animate-pulse rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
                  <BrainCircuit className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">IA Escaneando Documento...</h3>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-slate-500 animate-pulse">Identificando caracteres (OCR)...</p>
                  <p className="text-sm text-slate-500 animate-pulse" style={{ animationDelay: '500ms' }}>Cruzando com jurisprudência atualizada...</p>
                  <p className="text-sm text-slate-500 animate-pulse" style={{ animationDelay: '1000ms' }}>Calculando chances de vitória...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results View */}
        {result && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {/* Main Result Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resultado da Análise</h2>
                  <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 dark:bg-secondary/20">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-xs font-bold text-secondary">Análise Concluída</span>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Infração Detectada</h4>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{result.infraction}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brechas Legais Encontradas ({result.errorsFound.length})</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.errorsFound.map((error, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                          <span className="text-sm font-medium text-red-800 dark:text-red-300">{error}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fundamentação Sugerida</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.legalBasis.map((basis, i) => (
                        <span key={i} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          {basis}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-primary p-8 text-white shadow-xl shadow-primary/20 dark:shadow-none">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Pronto para recorrer?</h3>
                    <p className="text-sm text-white/80">Nossa IA pode gerar o texto completo da sua defesa agora mesmo.</p>
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/5">
                    Gerar Defesa Completa
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Probability Sidebar */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400">Chance de Sucesso</h4>
                <div className="relative mt-6 flex items-center justify-center">
                  <svg className="h-32 w-32 -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * result.probability) / 100}
                      strokeLinecap="round"
                      className="text-primary transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{result.probability}%</span>
                    <span className="text-[10px] font-bold uppercase text-primary">Alta Chance</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                  Baseado em 12.400 casos similares analisados em nossa base de dados.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recomendação Final</h4>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {result.recommendation}
                </p>
                <button 
                  onClick={() => {setResult(null); setFile(null);}}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                >
                  Analisar Outra Multa
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
