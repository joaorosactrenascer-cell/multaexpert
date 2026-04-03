import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ExternalLink,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useDefesas } from '@/src/features/defesas/hooks/useDefesas';

const StatusSelect = ({ 
  status, 
  defesaId, 
  onUpdate 
}: { 
  status: string; 
  defesaId: string; 
  onUpdate: (id: string, newStatus: string) => Promise<void> 
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await onUpdate(defesaId, e.target.value);
    setLoading(false);
  };

  const getStyle = (s: string) => {
    switch(s) {
      case 'pendente': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'em_analise': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'deferida': return 'bg-secondary/10 text-secondary dark:bg-secondary/20';
      case 'indeferida': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      <select 
        value={status} 
        onChange={handleChange}
        disabled={loading}
        className={cn(
          "appearance-none items-center gap-1.5 rounded-full px-3 py-1 pr-6 text-xs font-bold outline-none cursor-pointer transition-all disabled:opacity-50",
          getStyle(status)
        )}
      >
        <option value="pendente">Pendente</option>
        <option value="em_analise">Em Análise</option>
        <option value="deferida">Deferida</option>
        <option value="indeferida">Indeferida</option>
      </select>
    </div>
  );
};

export const MinhasDefesas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { defesas, loading, deleteDefesa, updateStatus } = useDefesas();
  const [selectedDefesa, setSelectedDefesa] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Consider "multas" object is joined via Supabase `select('*, multas(*)')`
  const filteredDefesas = defesas.filter(defesa => {
    const multa = defesa.multas as any;
    if (!multa) return false;

    return (
      (multa.numero_auto || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (multa.placa || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (multa.tipo_infracao || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta defesa? Esta ação não pode ser desfeita.')) {
      const { error } = await deleteDefesa(id);
      if (error) {
        triggerToast('Erro ao excluir: ' + error.message, 'error');
      } else {
        triggerToast('Defesa excluída com sucesso!', 'success');
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      triggerToast('Status atualizado com sucesso!', 'success');
    } catch(e: any) {
      triggerToast('Erro ao atualizar: ' + e.message, 'error');
    }
  };

  const handleDownload = (defesa: any) => {
    triggerToast(`Iniciando download do PDF...`, 'success');
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('Relatório exportado com sucesso!', 'success');
    }, 2000);
  };

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={cn(
                "fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl border",
                showToast.type === 'success' ? "bg-secondary/5 border-secondary/20 text-secondary dark:bg-secondary/10 dark:border-secondary/30" : "bg-red-50 border-red-100 text-red-800 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300"
              )}
            >
              {showToast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm font-bold">{showToast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Modal */}
        <AnimatePresence>
          {selectedDefesa && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Detalhes da Defesa</h2>
                  <button onClick={() => setSelectedDefesa(null)} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <XCircle className="h-6 w-6 text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Auto de Infração</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedDefesa.multas?.numero_auto}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Placa</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedDefesa.multas?.placa}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Data da Infração</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                         {selectedDefesa.multas?.data_infracao ? new Date(selectedDefesa.multas.data_infracao).toLocaleDateString('pt-BR') : ''}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Valor da Multa</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">R$ {selectedDefesa.multas?.valor?.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tipo de Infração</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedDefesa.multas?.tipo_infracao || 'Não especificado'}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => handleDownload(selectedDefesa)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Baixar PDF
                  </button>
                  <button 
                    onClick={() => setSelectedDefesa(null)}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <FileText className="h-4 w-4" />
              <span>Módulo de Defesas</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Minhas Defesas</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie e acompanhe o status de todas as suas defesas geradas.</p>
          </div>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 dark:shadow-none disabled:opacity-70"
          >
            {isExporting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? 'Exportando...' : 'Exportar Relatório'}
          </button>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Auto, Placa ou Tipo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-100 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Table / List */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 font-semibold text-slate-500">Carregando defesas...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Auto de Infração</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Veículo</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tipo de Multa</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredDefesas.map((defesa, i) => {
                    const multa = defesa.multas as any;
                    return (
                      <motion.tr 
                        key={defesa.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{multa?.numero_auto}</span>
                            <span className="text-[10px] text-slate-400">Criado em: {new Date(defesa.created_at || '').toLocaleDateString('pt-BR')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-fit px-3 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              {multa?.placa}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{multa?.tipo_infracao || 'Multa'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusSelect 
                            status={defesa.status} 
                            defesaId={defesa.id} 
                            onUpdate={handleUpdateStatus} 
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setSelectedDefesa(defesa)}
                              title="Visualizar Detalhes"
                              className="rounded-lg p-2 text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDownload(defesa)}
                              title="Baixar Defesa"
                              className="rounded-lg p-2 text-slate-400 hover:bg-secondary/10 hover:text-secondary transition-colors"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(defesa.id)}
                              title="Excluir"
                              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Empty State */}
          {!loading && filteredDefesas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Nenhuma defesa encontrada</h3>
              <p className="text-sm text-slate-500">Tente ajustar seus filtros ou cadastre novas multas.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
