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
    technical_recommendation: string;
    commercial_hint: string;
    prioridade: string;
  }[];
  contratos?: {
    id: string;
    status: string;
  }[];
}

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
};

export default function MinhasDefesas() {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { user } = useAuth();

  const getStatusInfo = (caso: Caso) => {
    if (caso.pagamento_status === "pago") {
      return {
        text: "Pago",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        icon: <DollarSign size={14} />
      };
    }
    if (caso.assinado) {
      return {
        text: "Assinado",
        color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: <CheckCircle size={14} />
      };
    }
    return {
      text: "Pendente",
      color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
      icon: null
    };
  };

  const fetchCasos = async () => {
    if (!user) return;
    setLoading(true);

    try {
      console.log(" Buscando casos do localStorage");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const casosSalvosLocal = JSON.parse(localStorage.getItem('casos_mockados') || '[]');
      
      const mockCasosFixos: Caso[] = [
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          user_id: user.id,
          cliente_nome: "Maria Santos",
          placa: "XYZ5678",
          descricao: "Multa por estacionamento em local proibido",
          status: "aguardando_analise",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          contrato_gerado: false,
          procuracao_gerada: false,
          assinado: false,
          pagamento_status: "pendente",
          analises: [],
          contratos: []
        }
      ];
      
      const todosCasos = [...casosSalvosLocal, ...mockCasosFixos];
      
      setCasos(todosCasos);
      console.log(" Casos carregados:", todosCasos.length);
      
    } catch (error) {
      console.error("Erro ao buscar casos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasos();
  }, [user]);

  const gerarProcuracao = async (caso: Caso) => {
    setActionLoading(caso.id);
    try {
      // Buscar dados completos do cliente
      let clienteDados = {
        nome: caso.cliente_nome || "Cliente",
        cpf: "000.000.000-00" // Default caso não tenha cliente_id
      };

      if (caso.cliente_id) {
        try {
          const { data: cliente } = await supabase
            .from('clientes')
            .select('nome, cpf')
            .eq('id', caso.cliente_id)
            .single();

          if (cliente) {
            clienteDados = cliente;
          }
        } catch (error) {
          console.error('Erro ao buscar cliente:', error);
          // Continua com dados padrão
        }
      }

      // Verificar se há análises
      if (!caso.analises || caso.analises.length === 0) {
        alert("Nenhuma análise encontrada para este caso. Gere a análise primeiro.");
        return;
      }

      const analise = caso.analises[0];
      const link = `https://app.multaexpert.com.br/assinar/${caso.id}`;

      // Gerar documento de procuração com dados reais do cliente
      const procuracao = `
PROCURAÇÃO DE DEFESA EM PROCESSO ADMINISTRATIVO DE TRÂNSITO

OUTORGANTE:
${clienteDados.nome}
CPF: ${clienteDados.cpf}

PROCURADO(A)(S):
O escritório MULTAEXPERT ADVOCACIA, inscrito no CNPJ sob o nº XX.XXX.XXX/XXXX-XX, com sede na Rua das Flores, 123 - Centro, Cidade/UF, neste ato nomeia como seu procurador(a) que muito lhe honra.

PODERES:
Os outorgantes constituem seus bastantes procuradores, para o foro em geral, com o fim especial de representá-los em processos administrativos de trânsito, podendo assinar petições, recursos, defesas, receber citações, intimações e notificações, apresentar contra-razões e recursos, acompanhar processos em todas as instâncias, requerer vistas, retirar processos, obter certidões, cópias e informações, firmar compromissos, acordos e transações que se fizerem necessárias, praticar todos os atos necessários ao exercício regular do mandato, com poderes especiais inclusive para receber citações iniciais, confessar, reconhecer a procedência ou improcedência do pedido, transigir, desistir, renunciar ao direito sobre que se litiga, firmar compromisso, promover execução judicial e extrajudicial e dar quitação.

OBJETO:
Constitui objeto da presente procuração a defesa administrativa do auto de infração de trânsito nº [Nº DO AUTO], placa ${caso.placa}, imposta ao outorgante em [DATA DA INFRAÇÃO].

FUNDAMENTOS:
${analise.erros.map((erro, index) => `${index + 1}. ${erro}`).join('\n')}

REQUERIMENTOS:
Com base nos fundamentos acima, requer-se:
a) O cancelamento do auto de infração;
b) A aplicação das penalidades cabíveis;
c) A nulidade do processo administrativo, se for o caso;
d) A concessão do direito de defesa ampla, com todos os recursos previstos na legislação de trânsito.

TERMO DE COMPROMISSO:
O outorgante declara estar ciente de que a presente procuração confere plenos poderes ao procurador, assumindo total responsabilidade pelos atos por ele praticados no exercício do mandato.

Local e Data: ${new Date().toLocaleDateString('pt-BR')}

______________________________________
${clienteDados.nome}
OUTORGANTE

______________________________________
MULTAEXPERT ADVOCACIA
PROCURADOR(A)`;

      // Salvar procuração no localStorage
      const procuracoesSalvas = JSON.parse(localStorage.getItem('procuracoes_mockadas') || '[]');
      const novaProcuracao = {
        id: `proc_${caso.id}_${Date.now()}`,
        caso_id: caso.id,
        cliente_id: caso.cliente_id,
        texto: procuracao,
        created_at: new Date().toISOString()
      };
      procuracoesSalvas.unshift(novaProcuracao);
      localStorage.setItem('procuracoes_mockadas', JSON.stringify(procuracoesSalvas));

      // Atualizar caso
      const casosSalvos = JSON.parse(localStorage.getItem('casos_mockados') || '[]');
      const casoIndex = casosSalvos.findIndex(c => c.id === caso.id);
      if (casoIndex !== -1) {
        casosSalvos[casoIndex] = {
          ...casosSalvos[casoIndex],
          procuracao_gerada: true
        };
        localStorage.setItem('casos_mockados', JSON.stringify(casosSalvos));
        setCasos([...casosSalvos]);
      }

      // Redirecionar para WhatsApp
      const encoded = encodeURIComponent(procuracao);
      const phone = "5548991552528"; // Número fixo do operador

      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
      
      console.log(" Procuração gerada com dados do cliente:", clienteDados.nome);
    } catch (error) {
      console.error("Erro ao gerar procuração:", error);
      alert("Erro ao gerar procuração. Tente novamente.");
    } finally {
      setActionLoading(null);
    }
  };

  const gerarContrato = async (caso: Caso) => {
    setActionLoading(caso.id);
    try {
    console.log("Gerando contrato para:", caso.id);
    
    const contrato = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS - multaExpert

CONTRATANTE:
${caso.cliente_nome || "Cliente"}
CPF: ${caso.cliente_id ? caso.cliente_id : "000.000.000-00"}

OBJETO:
${caso.descricao}
Placa: ${caso.placa}

SERVIÇOS:
1. Análise técnica completa
2. Elaboração de recurso administrativo
3. Acompanhamento do processo
4. Representação digital (quando aplicável)

VALOR:
Conforme tabela de honorários

PRAZO:
Até conclusão do processo

ASSINATURA DIGITAL:
Para validar este contrato, acesse:
https://app.multaexpert.com.br/assinar/${caso.id}

---
Este contrato possui validade jurídica digital.
`;

      // Salvar contrato no localStorage
      const contratosSalvos = JSON.parse(localStorage.getItem('contratos_mockados') || '[]');
      const novoContrato = {
        id: `contrato_${caso.id}_${Date.now()}`,
        caso_id: caso.id,
        cliente_id: caso.cliente_id,
        texto: contrato,
        created_at: new Date().toISOString()
      };
      contratosSalvos.unshift(novoContrato);
      localStorage.setItem('contratos_mockados', JSON.stringify(contratosSalvos));

      // Atualizar caso
      const casosSalvos = JSON.parse(localStorage.getItem('casos_mockados') || '[]');
      const casoIndex = casosSalvos.findIndex(c => c.id === caso.id);
      if (casoIndex !== -1) {
        casosSalvos[casoIndex] = {
          ...casosSalvos[casoIndex],
          contrato_gerado: true
        };
        localStorage.setItem('casos_mockados', JSON.stringify(casosSalvos));
        setCasos([...casosSalvos]);
      }

      // Redirecionar para WhatsApp
      const encoded = encodeURIComponent(contrato);
      const phone = "5548991552528"; // Número fixo do operador

      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
      
      console.log("✅ Contrato gerado com dados do cliente:", caso.cliente_nome);
    } catch (error) {
      console.error("Erro ao gerar contrato:", error);
      alert("Erro ao gerar contrato. Tente novamente.");
    } finally {
      setActionLoading(null);
    }
  };

  const enviarWhatsApp = (caso: Caso) => {
    const temProcuracao = caso.procuracao_gerada;
    const temContrato = caso.contrato_gerado;
    
    if (!temProcuracao && !temContrato) {
      alert("É necessário gerar a procuração e/ou contrato antes de enviar via WhatsApp.");
      return;
    }

    let mensagem = `Olá, ${caso.cliente_nome}! ${"\\ud83d\\udc4b"}\n\n`;
    mensagem += `Analisamos sua multa e já preparamos sua defesa.\n\n`;
    mensagem += `Para dar continuidade, preciso da sua autorização.\n\n`;
    mensagem += `Pode me confirmar por aqui que seguimos com o processo? ${"\\u2705"}\n\n`;
    
    // Link opcional (apenas formal)
    if (temProcuracao || temContrato) {
      mensagem += `Caso queira formalizar:\n`;
      mensagem += `https://app.multaexpert.com.br/assinar/${caso.id}\n\n`;
    }
    
    mensagem += `Fico no aguardo!`;

    const encoded = encodeURIComponent(mensagem);
    const phone = "5548991003589";
    
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  // Confirmar assinatura manual (baseado em resposta WhatsApp)
  const confirmarAssinatura = (caso: Caso) => {
    if (!caso.procuracao_gerada && !caso.contrato_gerado) {
      alert("É necessário gerar a procuração e/ou contrato antes de confirmar a assinatura.");
      return;
    }

    // Confirmar manualmente
    const confirmacao = confirm(
      "Confirmar assinatura do cliente?\n\n" +
      "Baseado na resposta recebida via WhatsApp:\n" +
      "\"Ok\", \"Pode seguir\", \"Autorizo\", etc.\n\n" +
      "Deseja confirmar a assinatura?"
    );
    
    if (!confirmacao) return;

    // Atualizar caso localmente
    const casosAtualizados = casos.map(c => 
      c.id === caso.id 
        ? { 
            ...c, 
            assinado: true,
            assinado_em: new Date().toISOString()
          }
        : c
    );
    setCasos(casosAtualizados);
    
    // Salvar no localStorage
    const assinaturasSalvas = JSON.parse(localStorage.getItem('assinaturas_mockadas') || '[]');
    assinaturasSalvas.push({
      id: `sign-${Date.now()}`,
      multa_id: caso.id,
      assinado_em: new Date().toISOString(),
      tipo_confirmacao: "whatsapp_manual"
    });
    localStorage.setItem('assinaturas_mockadas', JSON.stringify(assinaturasSalvas));
    
    alert("Assinatura confirmada com sucesso!\n\nStatus atualizado para: Assinado");
  };

  const confirmarPagamento = async (caso: Caso) => {
    if (!caso.assinado) {
      alert("É necessário que o cliente tenha assinado antes de confirmar o pagamento.");
      return;
    }

    const tipoPagamento = confirm(
      "Tipo de pagamento:\n\n" +
      "OK = Pagamento Total\n" +
      "Cancelar = Pagamento Parcelado"
    ) ? "total" : "parcelado";
    
    let valorPagamento = "";
    let parcelas = 1;
    
    if (tipoPagamento === "parcelado") {
      const numParcelas = prompt("Número de parcelas (2-12):", "3");
      parcelas = parseInt(numParcelas) || 3;
      valorPagamento = `Parcelado em ${parcelas}x`;
    } else {
      valorPagamento = "Pago integralmente";
    }
    
    const casosAtualizados = casos.map(c => 
      c.id === caso.id 
        ? { 
            ...c, 
            pagamento_status: "pago",
            tipo_pagamento: tipoPagamento,
            parcelas: parcelas,
            valor_pagamento: valorPagamento,
            pago_em: new Date().toISOString()
          }
        : c
    );
    setCasos(casosAtualizados);
    
    const pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos_mockados') || '[]');
    pagamentosSalvos.push({
      id: `pag-${Date.now()}`,
      multa_id: caso.id,
      tipo_pagamento: tipoPagamento,
      parcelas: parcelas,
      valor_pagamento: valorPagamento,
      pago_em: new Date().toISOString()
    });
    localStorage.setItem('pagamentos_mockados', JSON.stringify(pagamentosSalvos));
    
    alert(`Pagamento confirmado com sucesso!\n\nTipo: ${tipoPagamento === 'total' ? 'Integral' : `Parcelado em ${parcelas}x`}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir permanentemente este caso?")) return;
    
    setActionLoading(`del-${id}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const casosSalvos = JSON.parse(localStorage.getItem('casos_mockados') || '[]');
      const casosFiltrados = casosSalvos.filter(c => c.id !== id);
      localStorage.setItem('casos_mockados', JSON.stringify(casosFiltrados));
      
      setCasos(casos.filter(c => c.id !== id));
      console.log("Caso excluído com sucesso!");
      alert("Caso excluído com sucesso!");
      
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir caso.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Meus Casos</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
          <table className="min-w-full border text-gray-800 dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nome</th>
                <th className="px-4 py-3 text-left font-semibold">Placa</th>
                <th className="px-4 py-3 text-left font-semibold">Infração</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {casos.map((caso) => {
                  const statusInfo = getStatusInfo(caso);
                  return (
                    <motion.tr
                      key={caso.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        {caso.cliente_nome || "Sem nome"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {caso.placa}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {caso.analises?.[0]?.decisao || "Aguardando..."}
                          </span>
                          <span className="text-xs text-gray-500">
                            Prob: {caso.analises?.[0]?.probabilidade || "0%"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setActionLoading(`proc-${caso.id}`);
                              gerarProcuracao(caso);
                              setTimeout(() => setActionLoading(null), 1000);
                            }}
                            disabled={actionLoading === `proc-${caso.id}` || caso.procuracao_gerada}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              caso.procuracao_gerada 
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-orange-600 hover:bg-orange-700 text-white"
                            } disabled:opacity-50`}
                          >
                            <FileText size={12} className="inline mr-1" />
                            {caso.procuracao_gerada ? "✓" : "Procuração"}
                          </button>

                          <button
                            onClick={() => {
                              setActionLoading(`contract-${caso.id}`);
                              gerarContrato(caso);
                              setTimeout(() => setActionLoading(null), 1000);
                            }}
                            disabled={actionLoading === `contract-${caso.id}` || caso.contrato_gerado}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              caso.contrato_gerado 
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            } disabled:opacity-50`}
                          >
                            <FileText size={12} className="inline mr-1" />
                            {caso.contrato_gerado ? "✓" : "Contrato"}
                          </button>

                          <button
                            onClick={() => enviarWhatsApp(caso)}
                            disabled={!caso.procuracao_gerada && !caso.contrato_gerado}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              (!caso.procuracao_gerada && !caso.contrato_gerado)
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-green-600 hover:bg-green-700 text-white"
                            } disabled:opacity-50`}
                          >
                            <MessageCircle size={12} className="inline mr-1" />
                            WhatsApp
                          </button>

                          <button
                            onClick={() => confirmarAssinatura(caso)}
                            disabled={!caso.procuracao_gerada && !caso.contrato_gerado}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              (!caso.procuracao_gerada && !caso.contrato_gerado)
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : caso.assinado
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-yellow-600 hover:bg-yellow-700 text-white"
                            } disabled:opacity-50`}
                          >
                            <CheckCircle size={12} className="inline mr-1" />
                            {caso.assinado ? "Assinado" : "Assinar"}
                          </button>

                          <button
                            onClick={() => confirmarPagamento(caso)}
                            disabled={!caso.assinado || caso.pagamento_status === "pago"}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              !caso.assinado || caso.pagamento_status === "pago"
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                : "bg-purple-600 hover:bg-purple-700 text-white"
                            } disabled:opacity-50`}
                          >
                            <DollarSign size={12} className="inline mr-1" />
                            {caso.pagamento_status === "pago" ? "✓" : "Pagar"}
                          </button>

                          <button
                            onClick={() => handleDelete(caso.id)}
                            disabled={actionLoading === `del-${caso.id}`}
                            className="p-1 px-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                            title="Excluir"
                          >
                            {actionLoading === `del-${caso.id}` ? "..." : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}