import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';
import type { Database } from '@/src/types/database';

type IATeste = Database['public']['Tables']['ia_testes']['Row'];

// ─── Gerador de Defesa Jurídica (Template) ────────────────────────────────────
// Esta função pode ser substituída por uma chamada real a OpenAI/Gemini no futuro.
export function gerarDefesaJuridica(entrada: string): string {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  return `DEFESA ADMINISTRATIVA — MultaExpert IA
Data de geração: ${dataAtual}

───────────────────────────────────────────────────────
RESUMO DA INFRAÇÃO DESCRITA
───────────────────────────────────────────────────────
${entrada.trim()}

───────────────────────────────────────────────────────
ARGUMENTOS JURÍDICOS
───────────────────────────────────────────────────────

1. DA NULIDADE DO AUTO DE INFRAÇÃO
   Conforme disposto no art. 280 do CTB, o auto de infração lavrado sem a observância dos requisitos formais enseja nulidade absoluta. Caso o auto não identifique com precisão o local, data/hora, placa e agente autuador, deve ser cancelado de ofício.

2. DO CONTRADITÓRIO E AMPLA DEFESA
   A Constituição Federal, em seu art. 5º, LV, garante ao autuado o pleno direito ao contraditório e à ampla defesa nos processos administrativos. O presente recurso é exercício deste direito.

3. DO MÉRITO
   Com base na descrição fornecida, cabem os seguintes argumentos:

   a) Ausência de sinalização adequada no local da suposta infração;
   b) Impossibilidade de identificação inequívoca do condutor infrator;
   c) Falta de prova técnica robusta (laudo metrológico, certificação do equipamento, se aplicável);
   d) Circunstâncias atenuantes descritas na narrativa do condutor.

4. DO PRINCIPIO DA PROPORCIONALIDADE
   A penalidade aplicada deve ser proporcional ao grau de lesividade da conduta. Na ausência de dano objetivo à segurança viária, impõe-se a revisão da penalidade ou seu cancelamento.

───────────────────────────────────────────────────────
PEDIDO
───────────────────────────────────────────────────────

Ante o exposto, requer-se:

I.  O cancelamento do auto de infração por nulidade formal; ou
II. A redução da penalidade aplicada, considerando as circunstâncias atenuantes; ou
III. A suspensão dos efeitos do auto até julgamento final do recurso.

Nestes termos, requer-se o deferimento.

───────────────────────────────────────────────────────
⚠️ NOTA: Esta defesa foi gerada automaticamente pelo MultaExpert IA como modelo base.
   Revise os argumentos e personalize de acordo com o caso concreto antes de protocolar.
───────────────────────────────────────────────────────`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useIATestes() {
  const { user } = useAuth();
  const [testes, setTestes] = useState<IATeste[]>([]);
  const [loading, setLoading] = useState(true);
  const [gerando, setGerando] = useState(false);

  const fetchTestes = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('ia_testes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error) setTestes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchTestes();
  }, [user]);

  const gerarTesteIA = async (entrada: string): Promise<IATeste> => {
    if (!user) throw new Error('Não autenticado');
    setGerando(true);

    try {
      // Simula latência de processamento da IA
      await new Promise(resolve => setTimeout(resolve, 1500));

      const resposta = gerarDefesaJuridica(entrada);

      const { data, error } = await supabase
        .from('ia_testes')
        .insert([{ user_id: user.id, entrada, resposta }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      setTestes(prev => [data, ...prev]);
      return data;
    } finally {
      setGerando(false);
    }
  };

  const avaliarTeste = async (id: string, nota: number, observacao?: string) => {
    const { data, error } = await supabase
      .from('ia_testes')
      .update({ nota, observacao: observacao || null })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    setTestes(prev => prev.map(t => t.id === id ? data : t));
    return data;
  };

  const deletarTeste = async (id: string) => {
    const { error } = await supabase
      .from('ia_testes')
      .delete()
      .eq('id', id);

    if (!error) setTestes(prev => prev.filter(t => t.id !== id));
    return { error };
  };

  return { testes, loading, gerando, gerarTesteIA, avaliarTeste, deletarTeste, refetch: fetchTestes };
}
