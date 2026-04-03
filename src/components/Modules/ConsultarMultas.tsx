import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Car, 
  FileSearch, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  History,
  MapPin,
  Calendar,
  CreditCard,
  Trash2,
  FileText
} from 'lucide-react';
import { useMultas } from '@/src/features/multas/hooks/useMultas';
import { useDefesas } from '@/src/features/defesas/hooks/useDefesas';

export const ConsultarMultas: React.FC = () => {
  const navigate = useNavigate();
  const { multas, loading, deleteMulta, fetchMultas } = useMultas();
  const { createDefesaFromMulta } = useDefesas();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [creatingDefesaId, setCreatingDefesaId] = useState<string | null>(null);

  const handleExcluir = async (id: string) => {
    if (confirm('Deseja excluir esta multa do seu painel?')) {
      setDeletingId(id);
      try {
        await deleteMulta(id);
      } catch(e) {
        console.error("Erro ao deletar multa", e);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleCriarDefesa = async (id: string) => {
    setCreatingDefesaId(id);
    try {
      await createDefesaFromMulta(id);
      await fetchMultas(); // Atualiza a lista atual de multas para refletir o status novo
      // Redirecionar opcional:
      // navigate('/defesa/minhas');
    } catch(e: any) {
      alert("Erro ao criar defesa: " + e.message);
    } finally {
      setCreatingDefesaId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-[60vh] flex-col items-center justify-center p-6 text-slate-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 font-semibold">Carregando suas multas...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <FileSearch className="h-4 w-4" />
              <span>Gestão de Multas</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Minhas Multas</h1>
            <p className="text-slate-500 dark:text-slate-400">Controle e gerencie todas as multas registradas.</p>
          </div>
          
          <button 
            onClick={() => navigate('/multas/nova')}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 dark:shadow-none"
          >
            <Plus className="h-5 w-5" />
            Nova Multa
          </button>
        </header>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Registros Ativos
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {multas.length} multas
              </span>
            </h2>
            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              <History className="h-4 w-4" />
              Ver Arquivadas
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {multas.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {multas.map((multa) => (
                  <motion.div 
                    key={multa.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{multa.tipo_infracao || 'Multa - Não especificada'}</h4>
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                {multa.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">Auto: <span className="font-mono font-bold">{multa.numero_auto}</span></p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(multa.data_infracao).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 line-clamp-1" title={multa.orgao_autuador || ''}>
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            {multa.orgao_autuador}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                            <Car className="h-3.5 w-3.5 text-slate-400" />
                            {multa.placa}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                            <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                            R$ {multa.valor?.toFixed(2)}
                          </div>
                        </div>

                        {multa.descricao && (
                          <div className="mt-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900/50 dark:text-slate-400">
                            <span className="font-bold block mb-1">Nota da infração:</span>
                            {multa.descricao}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
                        {multa.status !== 'defesa_criada' && (
                          <button 
                            onClick={() => handleCriarDefesa(multa.id)}
                            disabled={creatingDefesaId === multa.id}
                            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
                          >
                            {creatingDefesaId === multa.id ? 'Gerando...' : (
                              <>
                                Criar Defesa
                                <ArrowRight className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        )}
                        <button 
                          onClick={() => handleExcluir(multa.id)}
                          disabled={deletingId === multa.id}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-6 py-2.5 text-xs font-bold text-red-600 transition-all hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/50 disabled:opacity-50"
                        >
                          {deletingId === multa.id ? 'Excluindo...' : (
                            <>
                              <Trash2 className="h-3.5 w-3.5" />
                              Excluir
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20"
              >
                <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                  <FileText className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Nenhuma multa cadastrada</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm text-center">Você não possui multas registradas no sistema. Clique no botão acima para adicionar sua primeira multa.</p>
                <button 
                  onClick={() => navigate('/multas/nova')}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/80"
                >
                  <Plus className="h-4 w-4" />
                  Cadastrar Primeira Multa
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
