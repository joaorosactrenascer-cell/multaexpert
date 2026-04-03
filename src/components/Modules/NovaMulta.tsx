import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Car, 
  MapPin, 
  Calendar, 
  CreditCard,
  Hash,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { useMultas } from '@/src/features/multas/hooks/useMultas';

export const NovaMulta: React.FC = () => {
  const navigate = useNavigate();
  const { createMulta } = useMultas();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    placa: '',
    orgao_autuador: '',
    numero_auto: '',
    valor: '',
    data_infracao: '',
    tipo_infracao: '',
    descricao: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setErrorMsg('');

    try {
      const valorNumerico = parseFloat(formData.valor.replace(',', '.'));
      if (isNaN(valorNumerico)) {
        throw new Error("Valor da multa inválido.");
      }

      await createMulta({
        placa: formData.placa,
        orgao_autuador: formData.orgao_autuador,
        numero_auto: formData.numero_auto,
        valor: valorNumerico,
        data_infracao: formData.data_infracao,
        tipo_infracao: formData.tipo_infracao,
        descricao: formData.descricao || null,
        desconto_disponivel: false,
      });

      navigate('/multas');
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao registrar multa.');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <header className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cadastrar Multa</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Insira as informações da notificação recebida</p>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          {errorMsg && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm font-semibold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Placa do Veículo</label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ABC-1234"
                    value={formData.placa}
                    onChange={(e) => setFormData({...formData, placa: e.target.value.toUpperCase()})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Órgão Autuador</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ex: DETRAN, PRF, DER"
                    value={formData.orgao_autuador}
                    onChange={(e) => setFormData({...formData, orgao_autuador: e.target.value.toUpperCase()})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Número do Auto da Infração</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ex: E123456789"
                    value={formData.numero_auto}
                    onChange={(e) => setFormData({...formData, numero_auto: e.target.value.toUpperCase()})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Data da Infração</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="date"
                    value={formData.data_infracao}
                    onChange={(e) => setFormData({...formData, data_infracao: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Valor (R$)</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="number"
                    step="0.01" 
                    placeholder="130.16"
                    value={formData.valor}
                    onChange={(e) => setFormData({...formData, valor: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tipo de Infração</label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={formData.tipo_infracao}
                    onChange={(e) => setFormData({...formData, tipo_infracao: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    required
                  >
                    <option value="" disabled>Selecione uma infração...</option>
                    <option value="Excesso de velocidade">Excesso de velocidade</option>
                    <option value="Estacionamento irregular">Estacionamento irregular</option>
                    <option value="Avanço de sinal">Avanço de sinal</option>
                    <option value="Uso de celular">Uso de celular</option>
                    <option value="Documento irregular">Documento irregular</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Descrição Opcional</label>
              <div className="relative">
                <FolderOpen className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                <textarea
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Alguma nota adicional sobre o caso..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="mr-4 px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Salvando Multa...
                  </>
                ) : (
                  'Salvar Multa'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
