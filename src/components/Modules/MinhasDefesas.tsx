import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

export default function MinhasDefesas() {
  const [casos, setCasos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCasos = async () => {
    setLoading(true);

    try {
      // 🔐 pega usuário logado
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não autenticado");
        return;
      }

      // 🚀 busca do banco
      const { data, error } = await supabase
        .from("multas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCasos(data || []);

    } catch (error) {
      console.error("Erro ao buscar casos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Minhas Defesas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : casos.length === 0 ? (
        <p>Nenhum caso encontrado</p>
      ) : (
        <ul>
          {casos.map((caso) => (
            <li key={caso.id} style={{ marginBottom: 10 }}>
              <strong>{caso.cliente_nome}</strong>
              <br />
              {caso.descricao}
              <br />
              <small>Status: {caso.status}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}