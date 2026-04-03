import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';

export interface DashboardMetrics {
  totalMultas: number;
  totalDefesas: number;
  defesasDeferidas: number;
  defesasIndeferidas: number;
  defesasPendentes: number;
  defesasEmAnalise: number;
  taxaSucesso: number;
  valorTotalMultas: number;
  valorEconomizado: number;
  ultimasAtividades: Atividade[];
}

export interface Atividade {
  id: string;
  tipo: 'multa_criada' | 'defesa_criada' | 'status_alterado';
  descricao: string;
  data: string;
  status?: string;
}

export function useDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalMultas: 0,
    totalDefesas: 0,
    defesasDeferidas: 0,
    defesasIndeferidas: 0,
    defesasPendentes: 0,
    defesasEmAnalise: 0,
    taxaSucesso: 0,
    valorTotalMultas: 0,
    valorEconomizado: 0,
    ultimasAtividades: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Buscar multas do usuário
      const { data: multas } = await supabase
        .from('multas')
        .select('id, placa, numero_auto, valor, status, created_at, tipo_infracao')
        .order('created_at', { ascending: false });

      // Buscar defesas com join das multas
      const { data: defesas } = await supabase
        .from('defesas')
        .select('id, status, created_at, multa_id, multas(placa, numero_auto, valor)')
        .order('created_at', { ascending: false });

      const multasList = multas || [];
      const defesasList = defesas || [];

      // Calcular métricas
      const totalMultas = multasList.length;
      const totalDefesas = defesasList.length;

      const defesasDeferidas = defesasList.filter(d => d.status === 'deferida').length;
      const defesasIndeferidas = defesasList.filter(d => d.status === 'indeferida').length;
      const defesasPendentes = defesasList.filter(d => d.status === 'pendente').length;
      const defesasEmAnalise = defesasList.filter(d => d.status === 'em_analise').length;

      // Taxa de sucesso = deferidas / (deferidas + indeferidas) * 100
      const encerradas = defesasDeferidas + defesasIndeferidas;
      const taxaSucesso = encerradas > 0 ? Math.round((defesasDeferidas / encerradas) * 100) : 0;

      // Valor total das multas
      const valorTotalMultas = multasList.reduce((acc, m) => acc + (m.valor || 0), 0);

      // Valor economizado = valor das multas com defesa deferida
      const defesasDeferidasList = defesasList.filter(d => d.status === 'deferida');
      const valorEconomizado = defesasDeferidasList.reduce((acc, d) => {
        const multa = d.multas as any;
        return acc + (multa?.valor || 0);
      }, 0);

      // Últimas 5 atividades (mistura de multas e defesas)
      const atividadesMultas: Atividade[] = multasList.slice(0, 5).map(m => ({
        id: `multa-${m.id}`,
        tipo: 'multa_criada' as const,
        descricao: `Multa registrada — ${m.placa} (${m.tipo_infracao || m.numero_auto})`,
        data: m.created_at,
        status: m.status,
      }));

      const atividadesDefesas: Atividade[] = defesasList.slice(0, 5).map(d => ({
        id: `defesa-${d.id}`,
        tipo: 'defesa_criada' as const,
        descricao: `Defesa iniciada — ${(d.multas as any)?.placa || 'Multa vinculada'}`,
        data: d.created_at,
        status: d.status,
      }));

      // Ordenar por data decrescente e pegar 5
      const ultimasAtividades = [...atividadesMultas, ...atividadesDefesas]
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        .slice(0, 8);

      setMetrics({
        totalMultas,
        totalDefesas,
        defesasDeferidas,
        defesasIndeferidas,
        defesasPendentes,
        defesasEmAnalise,
        taxaSucesso,
        valorTotalMultas,
        valorEconomizado,
        ultimasAtividades,
      });
    } catch (err) {
      console.error('Erro ao carregar métricas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMetrics();
    }
  }, [user]);

  return { metrics, loading, refetch: fetchMetrics };
}
