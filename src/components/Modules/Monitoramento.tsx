import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Calendar,
  User,
  Car,
  FileText,
  MessageCircle,
  ExternalLink,
  Check,
  Bell,
  AlertTriangle
} from 'lucide-react';
import { enviarAlertaWhatsApp, verificarEEnviarAlertas, CasoAlerta } from '../../utils/whatsappAlerts';

interface CasoMonitorado {
  id: string;
  cliente_id: string;
  cliente_nome: string;
  placa?: string;
  infracao?: string;
  status: string;
  created_at: string;
  data_infracao?: string;
  descricao?: string;
}

type FiltroType = 'todos' | 'urgentes' | 'vencidos' | 'andamento';

type UrgenciaType = 'normal' | 'atencao' | 'urgente' | 'vencido';

export function Monitoramento() {
  const navigate = useNavigate();
  const [casos, setCasos] = useState<CasoMonitorado[]>([]);
  const [filtro, setFiltro] = useState<FiltroType>('todos');
  const [loading, setLoading] = useState(true);
  const [enviandoAlertas, setEnviandoAlertas] = useState(false);
  const [alertasEnviados, setAlertasEnviados] = useState<{ urgentes: number; vencidos: number }>({ urgentes: 0, vencidos: 0 });

  // Dados mockados para desenvolvimento
  const mockCasos: CasoMonitorado[] = [
    {
      id: '1',
      cliente_id: '1',
      cliente_nome: 'João Silva',
      placa: 'ABC-1234',
      infracao: 'Estacionamento proibido',
      status: 'analise_concluida',
      created_at: '2024-03-01',
      data_infracao: '2024-03-15',
      descricao: 'Multa por estacionar em local proibido'
    },
    {
      id: '2',
      cliente_id: '2',
      cliente_nome: 'Maria Santos',
      placa: 'XYZ-5678',
      infracao: 'Excesso de velocidade',
      status: 'novo',
      created_at: '2024-03-10',
      data_infracao: '2024-03-25',
      descricao: 'Multa por excesso de velocidade acima do permitido'
    },
    {
      id: '3',
      cliente_id: '3',
      cliente_nome: 'Carlos Oliveira',
      placa: 'DEF-9012',
      infracao: 'Avanço de sinal',
      status: 'defesa_gerada',
      created_at: '2024-02-20',
      data_infracao: '2024-02-25',
      descricao: 'Multa por avanço de sinal vermelho'
    }
  ];

  useEffect(() => {
    // Simular carregamento dos casos
    setTimeout(() => {
      setCasos(mockCasos);
      setLoading(false);
    }, 1000);
  }, []);

  // Função para enviar alertas automáticos
  const handleEnviarAlertasAutomaticos = async () => {
    setEnviandoAlertas(true);
    
    try {
      const resultado = await verificarEEnviarAlertas(casos as CasoAlerta[]);
      setAlertasEnviados(resultado);
      
      // Mostrar feedback ao usuário
      const totalEnviados = resultado.urgentes + resultado.vencidos;
      if (totalEnviados > 0) {
        alert(`✅ Alertas enviados com sucesso!\n\n📊 Resumo:\n• ${resultado.urgentes} casos urgentes\n• ${resultado.vencidos} casos vencidos${resultado.erros > 0 ? `\n\n⚠️ ${resultado.erros} erro(s) ao enviar` : ''}`);
      } else {
        alert('ℹ️ Nenhum caso urgente ou vencido encontrado para alertar.');
      }
    } catch (error) {
      console.error('Erro ao enviar alertas:', error);
      alert('❌ Erro ao enviar alertas. Tente novamente.');
    } finally {
      setEnviandoAlertas(false);
    }
  };

  // Calcular urgência baseado na data da infração
  const calcularUrgencia = (dataInfracao?: string): UrgenciaType => {
    if (!dataInfracao) return 'normal';
    
    const dataInfracaoDate = new Date(dataInfracao);
    const dataLimite = new Date(dataInfracaoDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias
    const hoje = new Date();
    const diasRestantes = Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 0) return 'vencido';
    if (diasRestantes <= 3) return 'urgente';
    if (diasRestantes <= 10) return 'atencao';
    return 'normal';
  };

  // Calcular dias restantes
  const calcularDiasRestantes = (dataInfracao?: string): number => {
    if (!dataInfracao) return 0;
    
    const dataInfracaoDate = new Date(dataInfracao);
    const dataLimite = new Date(dataInfracaoDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    const hoje = new Date();
    return Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Obter cor e ícone baseado na urgência
  const getUrgenciaInfo = (urgencia: UrgenciaType) => {
    switch (urgencia) {
      case 'normal':
        return {
          cor: 'bg-green-100 text-green-800 border-green-200',
          icone: <CheckCircle className="h-4 w-4" />,
          texto: 'Normal'
        };
      case 'atencao':
        return {
          cor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icone: <AlertCircle className="h-4 w-4" />,
          texto: 'Atenção'
        };
      case 'urgente':
        return {
          cor: 'bg-orange-100 text-orange-800 border-orange-200',
          icone: <Clock className="h-4 w-4" />,
          texto: 'Urgente'
        };
      case 'vencido':
        return {
          cor: 'bg-red-100 text-red-800 border-red-200',
          icone: <XCircle className="h-4 w-4" />,
          texto: 'Vencido'
        };
    }
  };

  // Filtrar casos baseado no filtro selecionado
  const casosFiltrados = casos.filter(caso => {
    const urgencia = calcularUrgencia(caso.data_infracao);
    
    switch (filtro) {
      case 'todos':
        return true;
      case 'urgentes':
        return urgencia === 'urgente' || urgencia === 'vencido';
      case 'vencidos':
        return urgencia === 'vencido';
      case 'andamento':
        return caso.status !== 'finalizado';
      default:
        return true;
    }
  });

  // Ações rápidas
  const handleAbrirCaso = (id: string) => {
    navigate(`/casos`);
  };

  const handleGerarDefesa = (id: string) => {
    navigate(`/casos/novo`);
  };

  const handleEnviarWhatsApp = (clienteNome: string) => {
    const mensagem = `Olá ${clienteNome}, estamos entrando em contato sobre o seu caso. Como podemos ajudar?`;
    window.open(`https://wa.me/554899152528?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const handleEnviarAlertaIndividual = async (caso: CasoMonitorado) => {
    const urgencia = calcularUrgencia(caso.data_infracao);
    
    if (urgencia === 'urgente' || urgencia === 'vencido') {
      const sucesso = await enviarAlertaWhatsApp(caso as CasoAlerta, urgencia as 'urgente' | 'vencido');
      
      if (sucesso) {
        alert(`✅ Alerta ${urgencia} enviado para o operador!\n\nCliente: ${caso.cliente_nome}`);
      } else {
        alert(`❌ Falha ao enviar alerta ${urgencia}.\n\nTente novamente.`);
      }
    } else {
      alert('ℹ️ Este caso não requer alerta automático (prazo dentro do normal).');
    }
  };

  const handleMarcarResolvido = (id: string) => {
    setCasos(prev => prev.map(caso => 
      caso.id === id ? { ...caso, status: 'finalizado' } : caso
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Monitoramento de Casos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Acompanhe prazos e evite perdas de datas limite
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Botão de Alertas Automáticos */}
          <button
            onClick={handleEnviarAlertasAutomaticos}
            disabled={enviandoAlertas || loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {enviandoAlertas ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Enviando...
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" />
                Enviar Alertas
              </>
            )}
          </button>
          
          {/* Filtros */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
            <Filter className="h-4 w-4 text-slate-500" />
            {[
              { value: 'todos', label: 'Todos' },
              { value: 'urgentes', label: 'Urgentes' },
              { value: 'vencidos', label: 'Vencidos' },
              { value: 'andamento', label: 'Em andamento' }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFiltro(item.value as FiltroType)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filtro === item.value
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo de Alertas Enviados */}
      {(alertasEnviados.urgentes > 0 || alertasEnviados.vencidos > 0) && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 rounded-xl p-2 bg-green-100 dark:bg-green-900/30">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                ✅ Alertas Enviados com Sucesso
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {alertasEnviados.urgentes > 0 && `${alertasEnviados.urgentes} alerta(s) de urgência enviados`}
                {alertasEnviados.urgentes > 0 && alertasEnviados.vencidos > 0 && ' • '}
                {alertasEnviados.vencidos > 0 && `${alertasEnviados.vencidos} alerta(s) de vencimento enviados`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total de Casos',
            value: casos.length,
            cor: 'bg-blue-100 text-blue-800'
          },
          {
            label: 'Urgentes',
            value: casos.filter(c => calcularUrgencia(c.data_infracao) === 'urgente').length,
            cor: 'bg-orange-100 text-orange-800'
          },
          {
            label: 'Vencidos',
            value: casos.filter(c => calcularUrgencia(c.data_infracao) === 'vencido').length,
            cor: 'bg-red-100 text-red-800'
          },
          {
            label: 'Em Andamento',
            value: casos.filter(c => c.status !== 'finalizado').length,
            cor: 'bg-green-100 text-green-800'
          }
        ].map((stat, index) => (
          <div key={index} className={`${stat.cor} rounded-xl p-4`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Lista de Casos */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Casos Monitorados
          </h2>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {casosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              Nenhum caso encontrado para o filtro selecionado.
            </div>
          ) : (
            casosFiltrados.map((caso) => {
              const urgencia = calcularUrgencia(caso.data_infracao);
              const diasRestantes = calcularDiasRestantes(caso.data_infracao);
              const urgenciaInfo = getUrgenciaInfo(urgencia);
              
              return (
                <div key={caso.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Informações do Caso */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${urgenciaInfo.cor}`}>
                          {urgenciaInfo.icone}
                          {urgenciaInfo.texto}
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {diasRestantes > 0 ? `${diasRestantes} dias restantes` : `${Math.abs(diasRestantes)} dias vencido`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <User className="h-4 w-4" />
                        <span>{caso.cliente_nome}</span>
                        {caso.placa && (
                          <>
                            <Car className="h-4 w-4 ml-2" />
                            <span>{caso.placa}</span>
                          </>
                        )}
                      </div>
                      
                      {caso.infracao && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <FileText className="h-4 w-4" />
                          <span>{caso.infracao}</span>
                        </div>
                      )}
                      
                      {caso.data_infracao && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>Infração: {new Date(caso.data_infracao).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Ações Rápidas */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleAbrirCaso(caso.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Abrir
                      </button>
                      
                      <button
                        onClick={() => handleGerarDefesa(caso.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <FileText className="h-4 w-4" />
                        Defesa
                      </button>
                      
                      <button
                        onClick={() => handleEnviarWhatsApp(caso.cliente_nome)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </button>
                      
                      {(urgencia === 'urgente' || urgencia === 'vencido') && (
                        <button
                          onClick={() => handleEnviarAlertaIndividual(caso)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:opacity-80 transition-colors text-sm ${
                            urgencia === 'vencido' 
                              ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                              : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                          }`}
                        >
                          <Bell className="h-4 w-4" />
                          {urgencia === 'vencido' ? 'Alertar Vencido' : 'Alertar Urgente'}
                        </button>
                      )}
                      
                      {caso.status !== 'finalizado' && (
                        <button
                          onClick={() => handleMarcarResolvido(caso.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                        >
                          <Check className="h-4 w-4" />
                          Resolver
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
