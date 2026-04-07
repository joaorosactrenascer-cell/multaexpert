/**
 * Estratégias de Defesa com IA
 * Sistema modular para prompts específicos por estratégia
 */

export type EstrategiaDefesa = 'conservador' | 'equilibrado' | 'agressivo';

export interface EstrategiaConfig {
  nome: string;
  descricao: string;
  prompt: string;
  tom: string;
  nivelRisco: 'baixo' | 'medio' | 'alto';
  foco: string[];
}

/**
 * Retorna o prompt específico para a estratégia de defesa
 * @param estrategia - Estratégia a ser utilizada
 * @returns Configuração completa da estratégia
 */
export function getEstrategiaPrompt(estrategia: EstrategiaDefesa): EstrategiaConfig {
  const estrategias: Record<EstrategiaDefesa, EstrategiaConfig> = {
    conservador: {
      nome: 'Conservador',
      descricao: 'Abordagem cautelosa, focada em segurança jurídica',
      tom: 'Cauteloso, formal, técnico, sem arriscar',
      nivelRisco: 'baixo',
      foco: ['Segurança jurídica', 'Precedentes sólidos', 'Argumentos clássicos', 'Minimização de riscos'],
      prompt: `
Você é um advogado especialista em trânsito com abordagem CONSERVADORA.

ANÁLISE DE MULTA - ESTRATÉGIA CONSERVADORA:

Tom: Cauteloso, formal, técnico, sem arriscar.
Foco: Segurança jurídica máxima, argumentos irrefutáveis.

Analise a multa seguindo estas diretrizes:
1. Identifique apenas falhas FORMAIS E OBJETIVAS
2. Use apenas jurisprudência CONSOLIDADA
3. Evite argumentos inovadores ou arriscados
4. Priorize defesas com 95%+ de chance de sucesso
5. Seja rigoroso na análise de provas

Estrutura da resposta:
- Decisão: "Recorrer" / "Analisar Melhor" / "Não Recorrer"
- Probabilidade: Realista e conservadora
- Erros: Apenas os mais evidentes
- Recomendação: Técnica e segura
- Dica: Focada em segurança

IMPORTANTE: Prefera "Não Recorrer" a arriscar uma defesa fraca.
      `.trim()
    },

    equilibrado: {
      nome: 'Equilibrado',
      descricao: 'Abordagem técnica, equilibrada, com base legal sólida',
      tom: 'Técnico, profissional, linguagem jurídica clara, argumentação consistente',
      nivelRisco: 'medio',
      foco: ['Linguagem jurídica clara', 'Tom técnico profissional', 'Argumentação consistente', 'Base lógica estruturada'],
      prompt: `
Você é um advogado especialista em trânsito com abordagem EQUILIBRADA.

ANÁLISE DE MULTA - ESTRATÉGIA EQUILIBRADA:

ESTILO OBRIGATÓRIO:
- Linguagem jurídica clara e profissional
- Tom técnico e consistente
- Argumentação fundamentada e lógica
- Sem exageros ou adjetivos desnecessários
- Base técnica, mesmo sem citar lei específica

EXEMPLO DE ESTILO:
"A presente defesa fundamenta-se na análise técnica da autuação, identificando inconsistências que comprometem a validade do auto de infração..."

EVITAR ABSOLUTAMENTE:
- Linguagem emocional ("injustiça", "abuso")
- Excesso de adjetivos ("gravíssimo", "absoluto")
- Tom agressivo ou acusatório
- Argumentos vagos ou sem base

ANÁLISE TÉCNICA:
1. Identifique falhas formais E materiais relevantes
2. Use jurisprudência consolidada e entendimentos técnicos
3. Mantenha objetividade e precisão técnica
4. Avalie realisticamente as chances (50-85% é aceitável)
5. Considere o custo-benefício para o cliente

ESTRUTURA DA RESPOSTA:
- Decisão: "Recorrer" / "Analisar Melhor" / "Não Recorrer"
- Probabilidade: Realista e tecnicamente fundamentada
- Erros: Principais falhas com base técnica clara
- Recomendação: Técnica, profissional e equilibrada
- Dica: Prática, focada em qualidade técnica

IMPORTANTE: A defesa deve ser profissional, confiável e tecnicamente sólida.
      `.trim()
    },

    agressivo: {
      nome: 'Agressivo',
      descricao: 'Abordagem ousada, focada em maximizar chances',
      tom: 'Ousado, inovador, estratégico, máximo impacto',
      nivelRisco: 'alto',
      foco: ['Inovação técnica', 'Argumentos ousados', 'Máximo impacto', 'Fronteiras jurídicas'],
      prompt: `
Você é um advogado especialista em trânsito com abordagem AGRESSIVA.

ANÁLISE DE MULTA - ESTRATÉGIA AGRESSIVA:

Tom: Ousado, inovador, estratégico, máximo impacto.
Foco: Maximizar chances, explorar brechas, inovar.

Analise a multa seguindo estas diretrizes:
1. Identifique TODAS as possíveis falhas (formais, materiais, processuais)
2. Use jurisprudência inovadora e teses recentes
3. Explore brechas e interpretações favoráveis
4. Considere argumentos criativos e estratégicos
5. Assuma riscos calculados para melhores resultados

Estrutura da resposta:
- Decisão: "Recorrer" / "Analisar Melhor" / "Não Recorrer"
- Probabilidade: Otimista mas fundamentada
- Erros: Todas as falhas possíveis
- Recomendação: Ousada e estratégica
- Dica: Focada em máximo impacto

IMPORTANTE: Use todos os recursos técnicos disponíveis, mesmo que inovadores.
      `.trim()
    }
  };

  return estrategias[estrategia] || estrategias.equilibrado;
}

/**
 * Retorna a estratégia padrão do sistema
 */
export function getEstrategiaPadrao(): EstrategiaDefesa {
  return 'equilibrado';
}

/**
 * Valida se a estratégia é suportada
 */
export function isEstrategiaValida(estrategia: string): estrategia is EstrategiaDefesa {
  return ['conservador', 'equilibrado', 'agressivo'].includes(estrategia);
}

/**
 * Lista todas as estratégias disponíveis
 */
export function getEstrategiasDisponiveis(): EstrategiaConfig[] {
  return [
    getEstrategiaPrompt('conservador'),
    getEstrategiaPrompt('equilibrado'),
    getEstrategiaPrompt('agressivo')
  ];
}

/**
 * Gera mensagem WhatsApp simplificada e focada em conversão
 * @param resultadoAnalise - Resultado da análise da IA
 * @param nomeCliente - Nome do cliente
 * @returns Mensagem otimizada para WhatsApp
 */
export function gerarMensagemWhatsApp(
  resultadoAnalise: {
    decision: string;
    probability: string;
    errors: string[];
    technicalRecommendation: string;
  },
  nomeCliente: string
): string {
  const podeRecorrer = resultadoAnalise.decision === 'Recorrer';
  const probabilidade = resultadoAnalise.probability;
  const principalErro = resultadoAnalise.errors[0] || 'aspectos formais';
  
  // Mensagem focada em conversão, não apenas informação
  let mensagem = `Olá, ${nomeCliente}! ${"\\ud83d\\udc4b"}\\n\\n`;
  
  if (podeRecorrer) {
    mensagem += `Analisamos sua multa e identificamos pontos importantes para defesa. `;
    mensagem += `Com ${probabilidade} de chance de sucesso, já deixei tudo pronto.\\n\\n`;
    mensagem += `Preciso apenas da sua autorização para seguir com o recurso. ${"\\u2705"}\\n\\n`;
    mensagem += `Posso avançar?`;
  } else if (resultadoAnalise.decision === 'Analisar Melhor') {
    mensagem += `Analisamos preliminarmente sua multa e identifiquei algumas possibilidades. `;
    mensagem += `O caso tem potencial, mas preciso de mais detalhes técnicos.\\n\\n`;
    mensagem += `Posso fazer uma análise completa para você?`;
  } else {
    mensagem += `Analisamos sua multa e, sendo transparente, as chances técnicas são limitadas.\\n\\n`;
    mensagem += `Recomendo focar no pagamento com desconto, mas se tiver alguma prova nova, posso reavaliar.\\n\\n`;
    mensagem += `Quer que eu verifique novamente com mais informações?`;
  }
  
  return mensagem;
}

/**
 * Gera resumo executivo da análise para comunicação rápida
 * @param resultadoAnalise - Resultado da análise
 * @returns Resumo conciso
 */
export function gerarResumoExecutivo(resultadoAnalise: {
  decision: string;
  probability: string;
  errors: string[];
  technicalRecommendation: string;
}): string {
  const podeRecorrer = resultadoAnalise.decision === 'Recorrer';
  
  if (podeRecorrer) {
    return `Viável (${resultadoAnalise.probability}) - Principais falhas: ${resultadoAnalise.errors.slice(0, 2).join(', ')}`;
  } else if (resultadoAnalise.decision === 'Analisar Melhor') {
    return `Potencial (${resultadoAnalise.probability}) - Requer análise técnica aprofundada`;
  } else {
    return `Limitado (${resultadoAnalise.probability}) - Indicado pagamento com desconto`;
  }
}
