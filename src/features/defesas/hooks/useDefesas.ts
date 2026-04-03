import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';
import type { Database } from '@/src/types/database';

type Defesa = Database['public']['Tables']['defesas']['Row'];
type DefesaInsert = Database['public']['Tables']['defesas']['Insert'];

export function useDefesas() {
  const { user } = useAuth();
  const [defesas, setDefesas] = useState<Defesa[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDefesas = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('defesas')
      .select('*, multas(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar defesas:', error);
    } else {
      setDefesas(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchDefesas();
    }
  }, [user]);

  const createDefesa = async (novaDefesa: Omit<DefesaInsert, 'user_id'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('defesas')
      .insert([{ ...novaDefesa, user_id: user.id }])
      .select()
      .single();

    if (!error && data) {
      // Refresh das defesas para trazer o join da multa também (caso tenha)
      fetchDefesas();
    }
    return { data, error };
  };

  const updateDefesa = async (id: string, updates: Partial<DefesaInsert>) => {
    const { data, error } = await supabase
      .from('defesas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      fetchDefesas();
    }
    return { data, error };
  };

  const createDefesaFromMulta = async (multaId: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    // 1. Criar defesa
    const { data: defesaData, error: defesaError } = await supabase
      .from('defesas')
      .insert([{
        user_id: user.id,
        multa_id: multaId,
        status: 'pendente',
      }])
      .select()
      .single();

    if (defesaError) throw new Error(defesaError.message);

    // 2. Atualizar o status da multa conectada
    const { error: multaError } = await supabase
      .from('multas')
      .update({ status: 'defesa_criada' })
      .eq('id', multaId);

    if (multaError) throw new Error(multaError.message);

    fetchDefesas();
    return defesaData;
  };

  const updateStatus = async (id: string, status: string) => {
    return updateDefesa(id, { status });
  }

  const deleteDefesa = async (id: string) => {
    const { error } = await supabase
      .from('defesas')
      .delete()
      .eq('id', id);

    if (!error) {
      setDefesas(prev => prev.filter(d => d.id !== id));
    }
    return { error };
  };

  return { defesas, loading, fetchDefesas, createDefesa, updateDefesa, deleteDefesa, createDefesaFromMulta, updateStatus };
}
