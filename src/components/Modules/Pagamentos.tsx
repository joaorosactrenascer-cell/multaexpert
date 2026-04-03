import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  Filter,
  Receipt,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: 'pago' | 'pendente' | 'cancelado';
  plan: string;
  invoiceUrl: string;
}

const paymentsMock: Payment[] = [
  { id: 'INV-001', date: '2024-03-01', amount: 'R$ 49,90', method: '•••• 4242', status: 'pago', plan: 'Plano Profissional', invoiceUrl: '#' },
  { id: 'INV-002', date: '2024-02-01', amount: 'R$ 49,90', method: '•••• 4242', status: 'pago', plan: 'Plano Profissional', invoiceUrl: '#' },
  { id: 'INV-003', date: '2024-01-01', amount: 'R$ 49,90', method: '•••• 4242', status: 'pago', plan: 'Plano Profissional', invoiceUrl: '#' },
  { id: 'INV-004', date: '2023-12-01', amount: 'R$ 49,90', method: '•••• 4242', status: 'pago', plan: 'Plano Profissional', invoiceUrl: '#' },
];

const StatusBadge = ({ status }: { status: Payment['status'] }) => {
  const configs = {
    pago: { label: 'Pago', icon: CheckCircle2, className: 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary' },
    pendente: { label: 'Pendente', icon: Clock, className: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    cancelado: { label: 'Cancelado', icon: AlertCircle, className: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={cn("flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", config.className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};

export const Pagamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Receipt className="h-4 w-4" />
              <span>Financeiro</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Pagamentos e Faturas</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie seu histórico de faturamento e métodos de pagamento.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900">
              <Download className="h-4 w-4" />
              Exportar CSV
            </button>
          </div>
        </header>

        {/* Payment Methods & Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Active Card */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Métodos de Pagamento</h3>
              <button className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                <Plus className="h-4 w-4" />
                Adicionar Novo
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-primary p-6 text-white shadow-lg shadow-primary/20 dark:shadow-none">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <CreditCard className="h-8 w-8" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Principal</span>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase opacity-60">Titular</p>
                        <p className="text-sm font-bold">JOAO SILVA</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase opacity-60">Validade</p>
                        <p className="text-sm font-bold">12/28</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 dark:border-slate-800 transition-colors hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
                <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                  <Plus className="h-6 w-6 text-slate-400" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-500">Novo Cartão ou PIX</p>
              </div>
            </div>
          </div>

          {/* Billing Summary */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Próxima Cobrança</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Data</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">01 de Abril, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Valor Estimado</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">R$ 49,90</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Plano</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">PROFISSIONAL</span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90">
                  Pagar Agora
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Histórico de Faturas</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar fatura..." 
                  className="rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <button className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">ID da Fatura</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Data</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Plano</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Valor</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paymentsMock.map((payment, i) => (
                  <motion.tr 
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{payment.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{new Date(payment.date).toLocaleDateString('pt-BR')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{payment.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{payment.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1 mx-auto">
              Ver histórico completo
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="flex items-center justify-between rounded-3xl bg-primary/5 p-6 dark:bg-primary/10 border border-primary/10 dark:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white p-2 dark:bg-slate-900">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary dark:text-primary/80">Problemas com sua fatura?</h4>
              <p className="text-xs text-primary/70 dark:text-primary/60">Nossa equipe financeira está pronta para ajudar com qualquer dúvida sobre cobranças.</p>
            </div>
          </div>
          <button className="rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-primary shadow-sm hover:bg-primary/5 dark:bg-slate-900 dark:text-primary dark:hover:bg-slate-800 transition-all">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};
