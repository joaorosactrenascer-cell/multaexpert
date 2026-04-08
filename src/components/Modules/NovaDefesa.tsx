import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function NovaDefesa() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeCliente: "",
    dadosMulta: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(true); // simula que análise já existe

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveCase = async () => {
    if (!analysisResult) return;

    if (!formData.nomeCliente.trim() || !formData.dadosMulta.trim()) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setIsSaving(true);

    try {
      // 🔐 pega usuário logado
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não autenticado");
        return;
      }

      // 🔥 pega tenant_id
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("Erro ao buscar tenant");
      }

      // 🚀 INSERT REAL
      const { error } = await supabase
        .from("multas")
        .insert({
          user_id: user.id,
          tenant_id: profile.tenant_id,
          cliente_nome: formData.nomeCliente.trim(),
          descricao: formData.dadosMulta.trim(),
          placa: "ABC1234", // depois podemos pegar do form
          status: "nova",
          data_infracao: new Date().toISOString().split("T")[0],
        });

      if (error) throw error;

      alert("Caso salvo com sucesso 🚀");

      navigate("/casos");

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar no banco");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Nova Defesa</h1>

      <input
        type="text"
        name="nomeCliente"
        placeholder="Nome do cliente"
        value={formData.nomeCliente}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="dadosMulta"
        placeholder="Descreva a multa"
        value={formData.dadosMulta}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={saveCase} disabled={isSaving}>
        {isSaving ? "Salvando..." : "Salvar Caso"}
      </button>
    </div>
  );
}