import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';
import { Database } from '@/src/types/database';

type Multa = Database['public']['Tables']['multas']['Row'];
type MultaInsert = Database['public']['Tables']['multas']['Insert'];

export function useMultas() {
  const { user } = useAuth();
  const [multas, setMultas] = useState<Multa[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMultas = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('multas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar multas:', error);
    } else {
      setMultas(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchMultas();
    }
  }, [user]);

  const createMulta = async (novaMulta: Omit<MultaInsert, 'user_id' | 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    // Status padrão conforme regra de negócio
    const payload = {
      ...novaMulta,
      user_id: user.id,
      status: 'nova',
    };

    const { data, error } = await supabase
      .from('multas')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      setMultas(prev => [data, ...prev]);
    } else if (error) {
      console.error('Erro ao criar multa:', error.message);
      throw new Error(error.message);
    }
    return { data, error };
  };

  const updateMulta = async (id: string, updates: Partial<MultaInsert>) => {
    const { data, error } = await supabase
      .from('multas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setMultas(prev => prev.map(m => m.id === id ? data : m));
    }
    return { data, error };
  };

  const deleteMulta = async (id: string) => {
    const { error } = await supabase
      .from('multas')
      .delete()
      .eq('id', id);

    if (!error) {
      setMultas(prev => prev.filter(m => m.id !== id));
    }
    return { error };
  };

  return { multas, loading, fetchMultas, createMulta, updateMulta, deleteMulta };
}
