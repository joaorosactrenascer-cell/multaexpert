import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Star,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useIATestes } from '@/src/features/ia/hooks/useIATestes';

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({
  value,
  onChange,
  disabled = false
}: {
  value: number | null;
  onChange: (n: number) => void;
  disabled?: boolean;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={cn(
            "transition-colors disabled:cursor-not-allowed",
            (hover || value || 0) >= n ? "text-amber-400" : "text-slate-300 dark:text-slate-600"
          )}
        >
          <Star className="h-5 w-5 fill-current" />
        </button>
      ))}
    </div>
  );
};

// ─── Teste Card ──────────────────────────────────────────────────────────────
const TesteCard = ({
  teste,
  onAvaliar,
  onDeletar
}: {
  teste: any;
  onAvaliar: (id: string, nota: number, observacao?: string) => Promise<any>;
  onDeletar: (id: string) => Promise<any>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [nota, setNota] = useState<number>(teste.nota || 0);
  const [obs, setObs] = useState(teste.observacao || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!nota) return;
    setSaving(true);
    try {
      await onAvaliar(teste.id, nota, obs);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(teste.resposta || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm('Excluir este teste?')) return;
    setDeleting(true);
    await onDeletar(teste.id);
  };

  const notaColor =
    !teste.nota ? 'text-slate-400' :
    teste.nota >= 4 ? 'text-green-500' :
    teste.nota >= 3 ? 'text-amber-500' :
    'text-red-500';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {teste.entrada.length > 80 ? teste.entrada.slice(0, 80) + '…' : teste.entrada}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {new Date(teste.created_at).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {teste.nota ? (
            <span className={cn("text-sm font-bold flex items-center gap-1", notaColor)}>
              <Star className="h-3.5 w-3.5 fill-current" />
              {teste.nota}/5
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
              Sem nota
            </span>
          )}
          {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-slate-100 dark:border-slate-800 p-5 space-y-5">
              {/* Entrada */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Entrada</p>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {teste.entrada}
                </div>
              </div>

              {/* Resposta */}
              {teste.resposta && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resposta da IA</p>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono max-h-80 overflow-y-auto">
                    {teste.resposta}
                  </div>
                </div>
              )}

              {/* Avaliação */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Avaliar esta resposta</p>
                <StarRating value={nota} onChange={setNota} />
                <textarea
                  rows={2}
                  value={obs}
                  onChange={e => setObs(e.target.value)}
                  placeholder="Observação opcional..."
                  className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    disabled={!nota || saving}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : saved ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : null}
                    {saved ? 'Salvo!' : 'Salvar Avaliação'}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deleting ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const TesteIA: React.FC = () => {
  const { testes, loading, gerando, gerarTesteIA, avaliarTeste, deletarTeste } = useIATestes();
  const [entrada, setEntrada] = useState('');
  const [erroMsg, setErroMsg] = useState('');

  const handleGerar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entrada.trim() || gerando) return;
    setErroMsg('');
    try {
      await gerarTesteIA(entrada.trim());
      setEntrada('');
    } catch (err: any) {
      setErroMsg(err.message || 'Erro ao gerar defesa.');
    }
  };

  // Estatísticas rápidas
  const comNota = testes.filter(t => t.nota);
  const mediaNotas = comNota.length
    ? (comNota.reduce((s, t) => s + (t.nota || 0), 0) / comNota.length).toFixed(1)
    : null;
  const notasAltas = comNota.filter(t => (t.nota || 0) >= 4).length;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-5xl space-y-8 p-6">

        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Bot className="h-4 w-4" />
            <span>Laboratório IA</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Teste da IA Jurídica</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gere e avalie respostas da IA antes de usá-la em defesas reais.
          </p>
        </header>

        {/* Stats */}
        {testes.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: FileText, label: 'Testes realizados', value: testes.length, color: 'bg-primary/10 text-primary' },
              { icon: Star,     label: 'Nota média',        value: mediaNotas ? `${mediaNotas}/5` : '—', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500' },
              { icon: CheckCircle2, label: 'Nota ≥ 4',      value: notasAltas, color: 'bg-green-50 dark:bg-green-900/20 text-green-500' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className={cn("mb-3 inline-flex rounded-lg p-1.5", s.color)}>
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Gerador */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="mb-4 text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            Gerar Nova Defesa
          </h2>

          {erroMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {erroMsg}
            </div>
          )}

          <form onSubmit={handleGerar} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Descreva a multa / situação
              </label>
              <textarea
                rows={5}
                value={entrada}
                onChange={e => setEntrada(e.target.value)}
                placeholder={`Ex: Recebi uma multa por excesso de velocidade (art. 218, II do CTB) na Rodovia Anhanguera km 45, no dia 15/03/2024 às 14h32. O radar não tinha placa de sinalização visível antes do ponto de medição. A velocidade registrada foi de 82km/h com limite de 60km/h.`}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
              <p className="mt-1 text-right text-xs text-slate-400">{entrada.length} caracteres</p>
            </div>

            <button
              type="submit"
              disabled={gerando || !entrada.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {gerando ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Gerando defesa jurídica...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4" />
                  Gerar Defesa com IA
                </>
              )}
            </button>
          </form>
        </div>

        {/* Histórico */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Histórico de Testes
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {testes.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-3 text-sm">Carregando testes...</p>
            </div>
          ) : testes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 dark:border-slate-800">
              <Bot className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="mt-3 text-sm font-semibold text-slate-500">Nenhum teste realizado</p>
              <p className="text-xs text-slate-400">Use o formulário acima para gerar a primeira defesa.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {testes.map(teste => (
                <div key={teste.id}>
                  <TesteCard
                    teste={teste}
                    onAvaliar={avaliarTeste}
                    onDeletar={deletarTeste}
                  />
                </div>
              ))}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
};
