import { useEffect, useState } from "react";
import { Trash2, CheckCircle, FileText, MessageCircle, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "@/src/lib/supabase";

interface Caso {
  id: string;
  user_id: string;
  cliente_id?: string;
  cliente_nome: string;
  placa: string;
  descricao: string;
  status: string;
  created_at: string;
  estrategia?: string;
  contrato_gerado?: boolean;
  procuracao_gerada?: boolean;
  assinado?: boolean;
  pagamento_status?: string;
  analises?: {
    decisao: string;
    probabilidade: string;
    erros: string[];
  }[];
}

export default function MinhasDefesas() {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCasos = async () => {
    if (!user) return;

    const casosSalvos = JSON.parse(localStorage.getItem("casos_mockados") || "[]");

    setCasos(casosSalvos);
    setLoading(false);
  };

  useEffect(() => {
    fetchCasos();
  }, [user]);

  const gerarProcuracao = async (caso: Caso) => {
    setActionLoading(caso.id);

    try {
      const texto = `PROCURAÇÃO

Cliente: ${caso.cliente_nome}
Placa: ${caso.placa}

${caso.analises?.[0]?.erros?.join("\n") || "Sem análise"}

Data: ${new Date().toLocaleDateString()}
`;

      const lista = JSON.parse(localStorage.getItem("procuracoes_mockadas") || "[]");

      lista.unshift({
        id: `proc_${Date.now()}`,
        caso_id: caso.id,
        texto
      });

      localStorage.setItem("procuracoes_mockadas", JSON.stringify(lista));

      atualizarCaso(caso.id, { procuracao_gerada: true });

      const encoded = encodeURIComponent(texto);
      window.open(`https://wa.me/5548991552528?text=${encoded}`);
    } catch (e) {
      alert("Erro ao gerar procuração");
    }

    setActionLoading(null);
  };

  const gerarContrato = async (caso: Caso) => {
    setActionLoading(caso.id);

    try {
      const texto = `CONTRATO

Cliente: ${caso.cliente_nome}
Placa: ${caso.placa}
Descrição: ${caso.descricao}

`;

      const lista = JSON.parse(localStorage.getItem("contratos_mockados") || "[]");

      lista.unshift({
        id: `cont_${Date.now()}`,
        caso_id: caso.id,
        texto
      });

      localStorage.setItem("contratos_mockados", JSON.stringify(lista));

      atualizarCaso(caso.id, { contrato_gerado: true });

      const encoded = encodeURIComponent(texto);
      window.open(`https://wa.me/5548991552528?text=${encoded}`);
    } catch {
      alert("Erro contrato");
    }

    setActionLoading(null);
  };

  const atualizarCaso = (id: string, dados: any) => {
    const lista = JSON.parse(localStorage.getItem("casos_mockados") || "[]");

    const nova = lista.map((c: Caso) =>
      c.id === id ? { ...c, ...dados } : c
    );

    localStorage.setItem("casos_mockados", JSON.stringify(nova));
    setCasos(nova);
  };

  const confirmarAssinatura = (caso: Caso) => {
    atualizarCaso(caso.id, { assinado: true });
    alert("Assinado!");
  };

  const confirmarPagamento = (caso: Caso) => {
    atualizarCaso(caso.id, { pagamento_status: "pago" });
    alert("Pagamento confirmado!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Excluir?")) return;

    const lista = JSON.parse(localStorage.getItem("casos_mockados") || "[]");
    const nova = lista.filter((c: Caso) => c.id !== id);

    localStorage.setItem("casos_mockados", JSON.stringify(nova));
    setCasos(nova);
  };

  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Meus Casos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Placa</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {casos.map((caso) => (
                <motion.tr key={caso.id}>
                  <td className="p-2">{caso.cliente_nome}</td>
                  <td className="p-2">{caso.placa}</td>

                  <td className="p-2">
                    {caso.pagamento_status === "pago"
                      ? "Pago"
                      : caso.assinado
                      ? "Assinado"
                      : "Pendente"}
                  </td>

                  <td className="p-2 flex gap-2 flex-wrap">
                    <button
                      onClick={() => gerarProcuracao(caso)}
                      className="bg-orange-500 text-white px-2 py-1 rounded"
                    >
                      Procuração
                    </button>

                    <button
                      onClick={() => gerarContrato(caso)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Contrato
                    </button>

                    <button
                      onClick={() => confirmarAssinatura(caso)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Assinar
                    </button>

                    <button
                      onClick={() => confirmarPagamento(caso)}
                      className="bg-purple-500 text-white px-2 py-1 rounded"
                    >
                      Pagar
                    </button>

                    <button
                      onClick={() => handleDelete(caso.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
}