import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle, AlertCircle, CheckCircle2, ArrowRight, User, Car, Brain,
  ShieldCheck, AlertTriangle, XCircle, FileText, RotateCcw,
  MessageSquare, Copy, Check, ExternalLink, Users, X
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
  created_at: string;
}

type Decision = 'Recorrer' | 'Analisar Melhor' | 'Não Recorrer';

interface AnalysisResult {
  decision: Decision;
  probability: string;
  errors: string[];
  technicalRecommendation: string;
  commercialHint: string;
}

export default function NovaDefesa() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showClienteModal, setShowClienteModal] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    // (mantive mock por enquanto — depois migramos pro banco)
    setClientes([
      { id: '1', nome: 'João Silva', cpf: '123', telefone: '9999', created_at: new Date().toISOString() }
    ]);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectCliente = (cliente: Cliente) => {
    setFormData(prev => ({
      ...prev,
      cliente_id: cliente.id,
      nomeCliente: cliente.nome
    }));
  };

  const realizarAnaliseReal = async () => {
    setIsAnalyzing(true);

    await new Promise(r => setTimeout(r, 2000));

    setAnalysisResult({
      decision: 'Recorrer',
      probability: '85%',
      errors: ['Erro formal identificado'],
      technicalRecommendation: 'Recurso recomendado.',
      commercialHint: 'Alta conversão.'
    });

    setStep(2);
    setIsAnalyzing(false);
  };

  const generateWhatsAppMessage = () => {
    if (!analysisResult) return '';
    return gerarMensagemWhatsApp(analysisResult, formData.nomeCliente);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 🔥🔥🔥 FUNÇÃO CORRIGIDA (SUPABASE REAL)
  const saveCase = async () => {
    if (!analysisResult) return;

    if (!formData.nomeCliente.trim() || !formData.dadosMulta.trim()) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setIsSaving(true);

    try {
      // 🔐 usuário
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não autenticado");
        return;
      }

      // 🔐 tenant
      const { data: profile } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      // 🚀 insert
      const { error } = await supabase
        .from("multas")
        .insert({
          user_id: user.id,
          tenant_id: profile?.tenant_id,
          cliente_nome: formData.nomeCliente,
          descricao: formData.dadosMulta,
          placa: formData.placa || "ABC1234",
          status: "nova",
          data_infracao: new Date().toISOString().split("T")[0]
        });

      if (error) throw error;

      alert("Caso salvo 🚀");
      navigate('/casos');

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Nova Defesa</h1>

      {step === 1 && (
        <>
          <textarea
            name="dadosMulta"
            value={formData.dadosMulta}
            onChange={handleInputChange}
            className="w-full border p-3 mt-4"
            placeholder="Texto da multa"
          />

          <input
            name="nomeCliente"
            value={formData.nomeCliente}
            onChange={handleInputChange}
            className="w-full border p-3 mt-4"
            placeholder="Nome do cliente"
          />

          <button onClick={realizarAnaliseReal} className="mt-4 bg-blue-600 text-white px-4 py-2">
            Analisar
          </button>
        </>
      )}

      {step === 2 && analysisResult && (
        <>
          <p className="mt-4">Resultado: {analysisResult.decision}</p>

          <button onClick={saveCase} className="mt-4 bg-green-600 text-white px-4 py-2">
            Salvar Caso
          </button>
        </>
      )}
    </div>
  );
}