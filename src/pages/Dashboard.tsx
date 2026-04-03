import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  Plus,
  ArrowRight,
  Car,
  CheckCircle2,
  Clock,
  Scale
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useDashboard } from '@/src/features/dashboard/hooks/useDashboard';
import { useAuth } from '@/src/context/AuthContext';
import { cn } from '@/src/lib/utils';

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800", className)} />
);

// ─── Status Style Map ─────────────────────────────────────────────────────────
const statusStyle: Record<string, { label: string; className: string }> = {
  nova:         { label: 'Nova',         className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
  em_analise:   { label: 'Em Análise',   className: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  pendente:     { label: 'Pendente',     className: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  deferida:     { label: 'Deferida',     className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  indeferida:   { label: 'Indeferida',   className: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  defesa_criada:{ label: 'Def. Criada',  className: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
};

// ─── Activity Icon ────────────────────────────────────────────────────────────
const ActivityIcon = ({ tipo }: { tipo: string }) => {
  if (tipo === 'multa_criada') return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20">
      <Car className="h-4 w-4 text-red-500" />
    </div>
  );
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
      <Scale className="h-4 w-4 text-primary" />
    </div>
  );
};

const PIE_COLORS = ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444'];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { metrics, loading } = useDashboard();

  const chartData = [
    { name: 'Pendente',    value: metrics.defesasPendentes },
    { name: 'Em Análise',  value: metrics.defesasEmAnalise },
    { name: 'Deferida',    value: metrics.defesasDeferidas },
    { name: 'Indeferida',  value: metrics.defesasIndeferidas },
  ].filter(item => item.value > 0);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';

  const cards = [
    {
      label: 'Total de Multas',
      value: loading ? null : metrics.totalMultas,
      icon: Car,
      color: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-500',
      suffix: '',
      action: () => navigate('/multas'),
      actionLabel: 'Ver multas',
    },
    {
      label: 'Defesas Criadas',
      value: loading ? null : metrics.totalDefesas,
      icon: FileText,
      color: 'bg-primary/10 dark:bg-primary/20',
      iconColor: 'text-primary',
      suffix: '',
      action: () => navigate('/defesa/minhas'),
      actionLabel: 'Ver defesas',
    },
    {
      label: 'Taxa de Sucesso',
      value: loading ? null : metrics.taxaSucesso,
      icon: TrendingUp,
      color: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-500',
      suffix: '%',
      action: null,
      actionLabel: null,
    },
    {
      label: 'Economia Gerada',
      value: loading ? null : metrics.valorEconomizado,
      icon: ShieldCheck,
      color: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-500',
      prefix: 'R$',
      suffix: '',
      action: null,
      actionLabel: null,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl space-y-8 p-6">

        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Visão Geral</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Olá, {displayName} 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Aqui está um resumo do seu painel MultaExpert.
            </p>
          </div>

          <button
            onClick={() => navigate('/multas/nova')}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            Nova Multa
          </button>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className={cn("mb-4 inline-flex rounded-xl p-2", card.color)}>
                <card.icon className={cn("h-5 w-5", card.iconColor)} />
              </div>

              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {(card as any).prefix ? `${(card as any).prefix} ` : ''}
                    {typeof card.value === 'number' && (card as any).prefix
                      ? card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : card.value}
                    {card.suffix}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                </>
              )}

              {card.action && (
                <button
                  onClick={card.action}
                  className="mt-4 flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  {card.actionLabel}
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
          >
            <h2 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Defesas por Status</h2>
            <p className="mb-6 text-xs text-slate-500">Distribuição das suas defesas</p>

            {loading ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Skeleton className="h-40 w-40 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                  <Scale className="h-8 w-8 text-slate-400" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-500">Nenhuma defesa criada</p>
                <p className="text-xs text-slate-400">Crie defesas a partir das suas multas</p>
              </div>
            )}
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Últimas Atividades</h2>
                <p className="text-xs text-slate-500">Movimentações recentes no sistema</p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : metrics.ultimasAtividades.length > 0 ? (
              <div className="space-y-4">
                {metrics.ultimasAtividades.map((atividade, i) => {
                  const style = statusStyle[atividade.status || ''] || statusStyle['nova'];
                  return (
                    <motion.div
                      key={atividade.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <ActivityIcon tipo={atividade.tipo} />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {atividade.descricao}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(atividade.data).toLocaleDateString('pt-BR', {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold", style.className)}>
                        {style.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                  <AlertCircle className="h-8 w-8 text-slate-400" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-500">Nenhuma atividade ainda</p>
                <p className="text-xs text-slate-400">Cadastre multas para começar</p>
                <button
                  onClick={() => navigate('/multas/nova')}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Cadastrar Multa
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats Row */}
        {!loading && metrics.totalMultas > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.defesasPendentes}</p>
                  <p className="text-xs text-slate-500">Defesas Pendentes</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.defesasEmAnalise}</p>
                  <p className="text-xs text-slate-500">Em Análise</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{metrics.defesasDeferidas}</p>
                  <p className="text-xs text-slate-500">Deferidas (Ganhos)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
