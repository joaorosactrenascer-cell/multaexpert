export interface CasoAlerta {
  id: string;
  cliente_nome: string;
  placa?: string;
  infracao?: string;
  data_infracao?: string;
  status: string;
  descricao?: string;
}

type TipoAlerta = 'urgente' | 'vencido';

// Número do operador (pode ser movido para configurações depois)
const NUMERO_OPERADOR = '554899152528';

/**
 * Calcula a urgência de um caso baseado na data da infração
 */
const calcularUrgencia = (dataInfracao?: string): TipoAlerta | 'normal' | 'atencao' => {
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

/**
 * Calcula dias restantes para o prazo
 */
const calcularDiasRestantes = (dataInfracao?: string): number => {
  if (!dataInfracao) return 0;
  
  const dataInfracaoDate = new Date(dataInfracao);
  const dataLimite = new Date(dataInfracaoDate.getTime() + (30 * 24 * 60 * 60 * 1000));
  const hoje = new Date();
  return Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Gera mensagem de alerta para o WhatsApp
 */
const gerarMensagemAlerta = (caso: CasoAlerta, tipo: TipoAlerta): string => {
  const diasRestantes = calcularDiasRestantes(caso.data_infracao);
  const dataFormatada = caso.data_infracao 
    ? new Date(caso.data_infracao).toLocaleDateString('pt-BR')
    : 'Data não informada';

  if (tipo === 'vencido') {
    return `🚨 *ALERTA DE CASO VENCIDO* 🚨

*Cliente:* ${caso.cliente_nome}
${caso.placa ? `*Placa:* ${caso.placa}` : ''}
${caso.infracao ? `*Infração:* ${caso.infracao}` : ''}
*Data da Infração:* ${dataFormatada}
*Dias Vencidos:* ${Math.abs(diasRestantes)} dias

⚠️ *AÇÃO IMEDIATA NECESSÁRIA* ⚠️

O prazo deste caso expirou. É necessário tomar providências urgentes para evitar perda de direitos e possíveis penalidades adicionais.

📱 *Ações Recomendadas:*
• Entrar em contato com o cliente imediatamente
• Verificar possibilidade de recurso extraordinário
• Documentar todas as tentativas de contato

🔗 *Acessar Sistema:* ${window.location.origin}/monitoramento

---
*MultaExpert System* 🤖
Automatizando sua gestão de multas`;
  }

  if (tipo === 'urgente') {
    return `⏰ *ALERTA DE CASO URGENTE* ⏰

*Cliente:* ${caso.cliente_nome}
${caso.placa ? `*Placa:* ${caso.placa}` : ''}
${caso.infracao ? `*Infração:* ${caso.infracao}` : ''}
*Data da Infração:* ${dataFormatada}
*Dias Restantes:* ${diasRestantes} dias

⚡ *PRIORIDADE ALTA* ⚡

Este caso atinge o prazo limite em ${diasRestantes} dias. Ação recomendada para evitar perda do prazo.

📱 *Ações Recomendadas:*
• Entrar em contato com o cliente hoje
• Preparar documentação necessária
• Iniciar processo de defesa imediatamente

🔗 *Acessar Sistema:* ${window.location.origin}/monitoramento

---
*MultaExpert System* 🤖
Monitoramento inteligente de prazos`;
  }

  return '';
};

/**
 * Envia alerta automático via WhatsApp
 */
export const enviarAlertaWhatsApp = async (caso: CasoAlerta, tipo: TipoAlerta): Promise<boolean> => {
  try {
    const mensagem = gerarMensagemAlerta(caso, tipo);
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Constrói a URL do WhatsApp
    const whatsappURL = `https://wa.me/${NUMERO_OPERADOR}?text=${mensagemCodificada}`;
    
    // Abre o WhatsApp em nova janela
    const novaJanela = window.open(whatsappURL, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    // Retorna true se a janela foi aberta
    const sucesso = !!novaJanela;
    
    if (sucesso) {
      console.log(`✅ Alerta ${tipo} enviado para o operador:`, caso.cliente_nome);
      
      // Fecha a janela após alguns segundos (opcional)
      setTimeout(() => {
        novaJanela?.close();
      }, 3000);
    } else {
      console.error(`❌ Falha ao abrir WhatsApp para alerta ${tipo}`);
    }
    
    return sucesso;
    
  } catch (error) {
    console.error('❌ Erro ao enviar alerta WhatsApp:', error);
    return false;
  }
};

/**
 * Verifica e envia alertas automáticos para múltiplos casos
 */
export const verificarEEnviarAlertas = async (casos: CasoAlerta[]): Promise<{
  urgentes: number;
  vencidos: number;
  erros: number;
}> => {
  let urgentes = 0;
  let vencidos = 0;
  let erros = 0;

  for (const caso of casos) {
    const urgencia = calcularUrgencia(caso.data_infracao);
    
    if (urgencia === 'vencido') {
      const sucesso = await enviarAlertaWhatsApp(caso, 'vencido');
      if (sucesso) {
        vencidos++;
      } else {
        erros++;
      }
    } else if (urgencia === 'urgente') {
      const sucesso = await enviarAlertaWhatsApp(caso, 'urgente');
      if (sucesso) {
        urgentes++;
      } else {
        erros++;
      }
    }
  }

  return {
    urgentes,
    vencidos,
    erros
  };
};

/**
 * Formata número de telefone para o WhatsApp
 */
export const formatarNumeroWhatsApp = (numero: string): string => {
  // Remove caracteres não numéricos
  const numeros = numero.replace(/\D/g, '');
  
  // Se não começar com 55 (Brasil), adiciona
  if (!numeros.startsWith('55')) {
    return `55${numeros}`;
  }
  
  return numeros;
};

/**
 * Testa conexão com WhatsApp
 */
export const testarConexaoWhatsApp = (): boolean => {
  try {
    const testURL = `https://wa.me/${NUMERO_OPERADOR}?text=${encodeURIComponent('Teste de conexão - MultaExpert')}`;
    const testJanela = window.open(testURL, '_blank', 'width=400,height=300');
    
    if (testJanela) {
      setTimeout(() => testJanela.close(), 2000);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Erro ao testar conexão WhatsApp:', error);
    return false;
  }
};
