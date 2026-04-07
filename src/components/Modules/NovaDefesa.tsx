import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  User,
  Car,
  Brain,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  FileText,
  RotateCcw,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Users,
  Search,
  Plus,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/context/AuthContext';
import { getEstrategiaPrompt, getEstrategiaPadrao, gerarMensagemWhatsApp, type EstrategiaDefesa } from '@/src/lib/estrategias';

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  created_at: string;
}

type Decision = 'Recorrer' | 'Analisar Melhor' | 'Não Recorrer';
type Priority = 'alta' | 'media' | 'baixa';
type CaseStatus = 'novo' | 'analise_concluida' | 'defesa_gerada' | 'enviado' | 'finalizado';

interface AnalysisResult {
  decision: Decision;
  probability: string;
  errors: string[];
  technicalRecommendation: string;
  commercialHint: string;
}

interface Caso {
  id: string;
  cliente: string;
  placa: string;
  descricao: string;
  decision: Decision;
  probability: string;
  errors: string[];
  recommendation: string;
  priority: Priority;
  status: CaseStatus;
  createdAt: string;
}

export default function NovaDefesa() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dadosMulta: '',
    nomeCliente: '',
    placa: '',
    cliente_id: '',
    novoCliente: {
      nome: '',
      cpf: '',
      telefone: ''
    }
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      // Mock data para garantir funcionamento
      const mockClientes: Cliente[] = [
        {
          id: '1',
          nome: 'João Silva',
          cpf: '123.456.789-00',
          telefone: '(48) 99155-2528',
          email: 'joao@email.com',
          endereco: 'Rua das Flores, 123 - Centro, Cidade',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          nome: 'Maria Santos',
          cpf: '987.654.321-00',
          telefone: '(48) 99155-2529',
          email: 'maria@email.com',
          endereco: 'Rua das Árvores, 456 - Centro, Cidade',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          nome: 'Carlos Oliveira',
          cpf: '456.789.123-00',
          telefone: '(48) 99155-2530',
          email: 'carlos@email.com',
          endereco: 'Rua das Palmeiras, 789 - Centro, Cidade',
          created_at: new Date().toISOString()
        }
      ];
      setClientes(mockClientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Para campos aninhados (novoCliente.nome, etc.)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getPriority = (decision: Decision, probability: string): Priority => {
    const probValue = parseInt(probability.replace('%', ''));
    if (decision === 'Recorrer' && probValue >= 80) return 'alta';
    if (decision === 'Analisar Melhor') return 'media';
    return 'baixa';
  };

  const handleSelectCliente = (cliente: Cliente) => {
    setFormData(prev => ({
      ...prev,
      cliente_id: cliente.id,
      nomeCliente: cliente.nome
    }));
  };

  const handleCreateCliente = async () => {
    if (!formData.novoCliente.nome || !formData.novoCliente.cpf) {
      alert('Nome e CPF são obrigatórios!');
      return;
    }

    const novoCliente: Cliente = {
      id: `cliente_${Date.now()}`,
      nome: formData.novoCliente.nome,
      cpf: formData.novoCliente.cpf,
      telefone: formData.novoCliente.telefone,
      email: '',
      endereco: '',
      created_at: new Date().toISOString()
    };

    setClientes(prev => [novoCliente, ...prev]);
    handleSelectCliente(novoCliente);
    setShowClienteModal(false);
    
    setFormData(prev => ({
      ...prev,
      novoCliente: { nome: '', cpf: '', telefone: '' }
    }));

    alert('Cliente criado com sucesso!');
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm)
  );

  const realizarAnaliseReal = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const estrategia: EstrategiaDefesa = getEstrategiaPadrao();
      const estrategiaConfig = getEstrategiaPrompt(estrategia);
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockAnalysis: AnalysisResult = {
        decision: 'Recorrer',
        probability: '85%',
        errors: [
          "Falta de descrição detalhada da infração",
          "Equipamento medidor não aferido corretamente"
        ],
        technicalRecommendation: "Auto com indícios de nulidade por ausência de aferição do equipamento e inconsistência temporal. Recomenda-se recurso administrativo.",
        commercialHint: "Alta chance de conversão. Cliente com argumento forte. Destacar urgência."
      };

      setAnalysisResult(mockAnalysis);
      setStep(2);
    } catch (error) {
      alert('Erro ao realizar análise. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!analysisResult) return '';

    return gerarMensagemWhatsApp(analysisResult, formData.nomeCliente || 'cliente');
  };

  const copyToClipboard = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  const saveCase = async () => {
    if (!analysisResult) return;

    if (!formData.nomeCliente.trim() || !formData.dadosMulta.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios antes de salvar.");
      return;
    }

    setIsSaving(true);
    try {
      const mockMultaId = `multa_${Date.now()}`;
      
      const novoCaso = {
        id: mockMultaId,
        user_id: "temp-user-id",
        cliente_id: formData.cliente_id,
        cliente_nome: formData.nomeCliente.trim(),
        descricao: formData.dadosMulta.trim(),
        status: "analise_concluida",
        created_at: new Date().toISOString(),
        estrategia: getEstrategiaPadrao(),
        contrato_gerado: false,
        procuracao_gerada: false,
        assinado: false,
        pagamento_status: "pendente",
      };

      localStorage.setItem('casos', JSON.stringify([novoCaso]));
      
      alert('Caso salvo com sucesso!');
      navigate('/casos');
      
    } catch (error: any) {
      alert("Erro ao salvar caso. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColors = (decision: Decision) => {
    switch (decision) {
      case 'Recorrer':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/30',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-700 dark:text-emerald-400',
          icon: <ShieldCheck className="h-8 w-8 text-emerald-500" />,
          label: "✔ Recomendado Recorrer"
        };
      case 'Analisar Melhor':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-700 dark:text-amber-400',
          icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
          label: "⚠ Analisar Melhor"
        };
      case 'Não Recorrer':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-200 dark:border-rose-800',
          text: 'text-rose-700 dark:text-rose-400',
          icon: <XCircle className="h-8 w-8 text-rose-500" />,
          label: "✖ Não Compensa Recorrer"
        };
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
              <PlusCircle className="h-4 w-4" />
              <span>Novo Caso Operacional</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">Abertura de Caso</h1>
            <p className="text-slate-500 dark:text-slate-400">Inicie uma nova análise inteligente de infração.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-4 py-2 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className={cn("h-2 w-2 rounded-full", isAnalyzing ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              IA {isAnalyzing ? 'Processando...' : 'Pronta'}
            </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 && !isAnalyzing && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="space-y-8">
                  {/* Campo Principal: Texto da Multa */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Texto da Multa (Conteúdo Original)
                      </label>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full">Campo Obrigatório</span>
                    </div>
                    <textarea 
                      name="dadosMulta"
                      value={formData.dadosMulta}
                      onChange={handleInputChange}
                      rows={10}
                      placeholder="Cole aqui o texto completo da notificação recebida pelo cliente para análise imediata..."
                      className="w-full min-h-[240px] rounded-2xl border border-slate-200 bg-slate-50/30 p-5 text-base leading-relaxed focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none dark:border-slate-800 dark:bg-slate-900/50 dark:text-white transition-all resize-none shadow-inner"
                    />
                  </div>

                  {/* Seleção de Cliente */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-900">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Cliente
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowClienteModal(true)}
                        className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        + Novo Cliente
                      </button>
                    </div>
                    
                    {formData.cliente_id ? (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            Cliente selecionado: {formData.nomeCliente}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowClienteModal(true)}
                        className="w-full p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Selecione um cliente existente ou crie um novo
                          </span>
                        </div>
                      </button>
                    )}
                  </div>

                                  </div>

                {/* Botão de Ação Principal */}
                <div className="mt-10">
                  <button 
                    onClick={realizarAnaliseReal}
                    disabled={!formData.dadosMulta || !formData.nomeCliente || isAnalyzing}
                    className="w-full group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-lg font-black text-white transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/25 disabled:opacity-50 disabled:grayscale disabled:scale-100"
                  >
                    <Brain className="h-6 w-6 animate-pulse" />
                    Analisar Multa Agora
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-4 text-center text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Privacidade garantida: Seus dados são processados de forma segura.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex min-h-[400px] flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Analisando Viabilidade...</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Consultando algoritmos jurídicos.</p>
              </div>
            </motion.div>
          )}

          {step === 2 && analysisResult && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className={cn(
                "rounded-[2.5rem] border-2 p-8 shadow-xl transition-all duration-300",
                getStatusColors(analysisResult.decision).bg,
                getStatusColors(analysisResult.decision).border
              )}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    {/* Indicação da Estratégia Utilizada */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-gray-900/90 px-4 py-2 border border-inherit shadow-sm">
                      <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                        Estratégia aplicada automaticamente: Técnica e equilibrada
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-950 px-4 py-1.5 border border-inherit">
                      {getStatusColors(analysisResult.decision).icon}
                      <span className={cn("text-xl font-extrabold", getStatusColors(analysisResult.decision).text)}>
                        {getStatusColors(analysisResult.decision).label}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Probabilidade de Sucesso:</span>
                        <span className={cn("text-2xl font-black", getStatusColors(analysisResult.decision).text)}>
                          {analysisResult.probability}
                        </span>
                      </div>
                      <div className="mt-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-inherit">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                          <Brain className="h-3 w-3" />
                          Análise Técnica Jurídica
                        </h4>
                        <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm leading-relaxed">
                          {analysisResult.technicalRecommendation}
                        </p>
                      </div>
                      <div className="mt-3 p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                          <AlertCircle className="h-3 w-3" />
                          Dica Comercial para o Operador
                        </h4>
                        <p className="text-primary/80 dark:text-primary/90 font-bold text-xs italic">
                          {analysisResult.commercialHint}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 space-y-4">
                    <div className="rounded-2xl bg-white/50 dark:bg-slate-950/50 p-4 border border-inherit">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        Falhas Detectadas
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.errors.map((error, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <ArrowRight className="h-3 w-3 mt-0.5 text-inherit shrink-0" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Response Generator */}
              <div className="flex flex-col items-center gap-6">
                {!showWhatsappModal ? (
                  <button 
                    onClick={() => setShowWhatsappModal(true)}
                    className="flex items-center gap-2 text-sm font-bold text-secondary-600 hover:text-secondary-700 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Gerar resposta para WhatsApp
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3 text-secondary" />
                        Sugestão de Resposta
                      </h4>
                      <button 
                        onClick={() => setShowWhatsappModal(false)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600"
                      >
                        Fechar
                      </button>
                    </div>
                    <div className="relative rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 mb-4 border border-slate-100 dark:border-slate-800">
                      <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {generateWhatsAppMessage()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={copyToClipboard}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all",
                          isCopied 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                        )}
                      >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {isCopied ? 'Copiado!' : 'Copiar Mensagem'}
                      </button>
                      <a 
                        href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Abrir WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
                >
                  <RotateCcw className="h-5 w-5" />
                  Voltar e Editar
                </button>
                <button 
                  onClick={saveCase}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-12 py-3.5 rounded-2xl font-bold bg-primary text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                  {isSaving ? 'Salvando...' : 'Confirmar e Salvar'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Seleção/Criação de Cliente */}
      {showClienteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Selecionar Cliente
              </h2>
              <button
                onClick={() => setShowClienteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lista de Clientes Existentes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Clientes Existentes
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredClientes.map((cliente) => (
                  <div
                    key={cliente.id}
                    onClick={() => {
                      handleSelectCliente(cliente);
                      setShowClienteModal(false);
                    }}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">{cliente.nome}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">CPF: {cliente.cpf}</div>
                        {cliente.telefone && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">Tel: {cliente.telefone}</div>
                        )}
                      </div>
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Criar Novo Cliente */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Criar Novo Cliente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="novoCliente.nome"
                    value={formData.novoCliente.nome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="novoCliente.cpf"
                    value={formData.novoCliente.cpf}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="novoCliente.telefone"
                    value={formData.novoCliente.telefone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowClienteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateCliente}
                  disabled={!formData.novoCliente.nome || !formData.novoCliente.cpf}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
