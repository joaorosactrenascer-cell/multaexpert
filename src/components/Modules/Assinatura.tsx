import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Zap, 
  Shield, 
  Star, 
  CreditCard, 
  Calendar, 
  ArrowRight,
  Info,
  History,
  Download,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
  bg: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 'R$ 0',
    description: 'Para motoristas que precisam de uma consulta ocasional.',
    features: [
      '1 consulta de multa por mês',
      'Análise básica de infração',
      'Acesso ao Assistente IA (limitado)',
      'Suporte via e-mail'
    ],
    color: 'text-slate-600',
    bg: 'bg-slate-50 dark:bg-slate-900'
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 'R$ 49,90',
    description: 'O plano ideal para quem quer segurança total no trânsito.',
    features: [
      'Consultas ilimitadas',
      'Análise automática avançada',
      'Geração de recursos ilimitada',
      'Assistente IA Prioritário',
      'Monitoramento de CNH automático',
      'Suporte via WhatsApp'
    ],
    isPopular: true,
    color: 'text-primary',
    bg: 'bg-primary/10 dark:bg-primary/20'
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 'R$ 199,90',
    description: 'Gestão completa para frotas e empresas de transporte.',
    features: [
      'Até 50 veículos monitorados',
      'Dashboard de frota exclusivo',
      'Relatórios gerenciais mensais',
      'API de integração',
      'Gerente de conta dedicado',
      'Treinamento jurídico para equipe'
    ],
    color: 'text-secondary',
    bg: 'bg-secondary/10 dark:bg-secondary/20'
  }
];

export const Assinatura: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const currentPlanId = 'free'; // Simulação de plano atual

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary dark:bg-primary/20">
            <Zap className="h-3.5 w-3.5" />
            Planos e Preços
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Escolha o plano ideal para você</h1>
          <p className="mx-auto max-w-2xl text-slate-500 dark:text-slate-400">
            Economize tempo e dinheiro com nossa tecnologia jurídica. Escolha o plano que melhor se adapta às suas necessidades.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={cn("text-sm font-bold", billingCycle === 'monthly' ? "text-slate-900 dark:text-white" : "text-slate-400")}>Mensal</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative h-7 w-12 rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-800"
            >
              <div className={cn(
                "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                billingCycle === 'yearly' ? "translate-x-5" : "translate-x-0"
              )} />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-bold", billingCycle === 'yearly' ? "text-slate-900 dark:text-white" : "text-slate-400")}>Anual</span>
              <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary dark:bg-secondary/20">
                Economize 20%
              </span>
            </div>
          </div>
        </header>

        {/* Current Plan Status */}
        <div className="rounded-3xl border border-primary/20 bg-white p-6 shadow-sm dark:border-primary/30 dark:bg-slate-950">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-3 dark:bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Seu Plano Atual: <span className="text-primary">Gratuito</span></h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Você está usando a versão básica do MultaExpert.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próxima Cobrança</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">N/A</p>
              </div>
              <button className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
                Gerenciar Faturas
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8 transition-all hover:shadow-xl",
                plan.isPopular 
                  ? "border-primary bg-white shadow-lg shadow-primary/10 dark:bg-slate-950 dark:shadow-none scale-105 z-10" 
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  Mais Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn("text-xl font-bold", plan.color)}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">/mês</span>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">O que está incluso:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className={cn("mt-0.5 rounded-full p-0.5", plan.bg)}>
                        <Check className={cn("h-3.5 w-3.5", plan.color)} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={cn(
                "mt-8 w-full rounded-2xl py-4 text-sm font-bold transition-all",
                plan.id === currentPlanId
                  ? "bg-slate-100 text-slate-400 cursor-default dark:bg-slate-800"
                  : plan.isPopular
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 dark:shadow-none"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
              )}>
                {plan.id === currentPlanId ? 'Plano Atual' : `Assinar ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ / Info Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <CreditCard className="h-5 w-5 text-primary" />
              Métodos de Pagamento
            </h3>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Aceitamos as principais bandeiras de cartão de crédito, PIX e boleto bancário. Todas as transações são processadas com segurança máxima.
            </p>
            <div className="mt-6 flex items-center gap-4 opacity-50 grayscale dark:invert">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" alt="PIX" className="h-5" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Política de Cancelamento
            </h3>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. O acesso aos recursos PRO continuará ativo até o final do período já pago.
            </p>
            <button className="mt-6 text-sm font-bold text-primary hover:underline">
              Ver termos de uso completos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
