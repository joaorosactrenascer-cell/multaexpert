import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle, AlertCircle, CheckCircle2, ArrowRight, User, Car, Brain,
  ShieldCheck, AlertTriangle, XCircle, FileText, RotateCcw,
  MessageSquare, Copy, Check, ExternalLink, Cpu, Users, Search, Plus, X
} from 'lucide-react';

import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/context/AuthContext';
import { supabase } from '@/src/lib/supabase';
import {
  getEstrategiaPrompt,
  getEstrategiaPadrao,
  gerarMensagemWhatsApp,
  type EstrategiaDefesa
} from '@/src/lib/estrategias';

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  created_at: string;
}

type Decision = 'Recorrer' | 'Analisar Melhor' | 'Não Recorrer';
type Priority = 'alta' | 'media' | 'baixa';
type CaseStatus = 'novo' | 'analise_concluida' | 'defesa_gerada' | 'enviado' | 'finalizado';

interface AnalysisResult {
  decision: Decision;
  probability: string;
  errors: string[];
  technicalRecommendation: string;
  commercialHint: string;
}

export default function NovaDefesa() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dadosMulta: '',
    nomeCliente: '',
    placa: '',
    cliente_id: '',
    novoCliente: { nome: '', cpf: '', telefone: '' }
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    // mock por enquanto (depois ligamos no banco)
    setClientes([]);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const realizarAnaliseReal = async () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setAnalysisResult({
        decision: 'Recorrer',
        probability: '85%',
        errors: [
          "Falta de descrição detalhada da infração",
          "Equipamento medidor não aferido corretamente"
        ],
        technicalRecommendation: "Auto com indícios de nulidade. Recomenda-se recurso.",
        commercialHint: "Alta chance de conversão."
      });

      setStep(2);
      setIsAnalyzing(false);
    }, 2000);
  };

  const saveCase = async () => {
    if (!analysisResult) return;

    if (!formData.nomeCliente.trim() || !formData.dadosMulta.trim()) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não autenticado");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      const { error } = await supabase
        .from("multas")
        .insert({
          user_id: user.id,
          tenant_id: profile?.tenant_id,
          cliente_nome: formData.nomeCliente,
          descricao: formData.dadosMulta,
          placa: formData.placa || "ABC1234",
          status: "nova",
          data_infracao: new Date().toISOString().split("T")[0],
        });

      if (error) throw error;

      alert("Salvo com sucesso 🚀");
      navigate('/casos');

    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">

      {step === 1 && (
        <div className="space-y-4">

          <textarea
            name="dadosMulta"
            value={formData.dadosMulta}
            onChange={handleInputChange}
            placeholder="Cole a multa aqui"
            className="w-full p-4 border rounded"
          />

          <input
            name="nomeCliente"
            value={formData.nomeCliente}
            onChange={handleInputChange}
            placeholder="Nome do cliente"
            className="w-full p-4 border rounded"
          />

          <button
            onClick={realizarAnaliseReal}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Analisar
          </button>

        </div>
      )}

      {step === 2 && analysisResult && (
        <div className="space-y-4">

          <h2>Resultado: {analysisResult.decision}</h2>

          <button
            onClick={saveCase}
            disabled={isSaving}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>

        </div>
      )}

    </div>
  );
}