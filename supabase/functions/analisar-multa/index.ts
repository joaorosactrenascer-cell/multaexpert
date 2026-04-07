import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// ===============================
// CONFIG CORS
// ===============================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ===============================
// MAIN HANDLER
// ===============================
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("[DEBUG] Request received:", req.method);
    
    const body = await req.json();
    console.log("[DEBUG] Request body:", JSON.stringify(body, null, 2));

    const { action, nome, placa, descricao } = body;

    if (!nome || !placa || !descricao) {
      return new Response(JSON.stringify({
        error: "Campos obrigatórios: nome, placa, descricao",
        received: { action, nome, placa, descricao }
      }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      });
    }

    console.log(`[ACTION] ${action}`);

    // ===============================
    // ANALYZE (MODO TESTE)
    // ===============================
    if (action === "analyze") {
      const analysis = {
        decision: "Recorrer",
        probability: "85%",
        errors: [
          "Ausência de aferição pelo INMETRO (Art. 280 CTB)",
          "Inconsistência no horário de registro",
          "Falta de descrição detalhada da infração",
        ],
        technicalRecommendation: "Auto com indícios de nulidade por ausência de aferição do equipamento e inconsistência temporal. Recomenda-se recurso administrativo.",
        commercialHint: "Alta chance de conversão. Cliente com argumento forte. Destacar urgência.",
        priority: "alta",
      };

      console.log("[SUCCESS] Analysis completed");

      return new Response(JSON.stringify(analysis), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ===============================
    // SAVE (MODO TESTE)
    // ===============================
    if (action === "save") {
      // Simulação de salvamento bem-sucedido
      const mockMultaId = "550e8400-e29b-41d4-a716-446655440000";
      
      console.log("[SUCCESS] Mock save completed");

      return new Response(JSON.stringify({
        success: true,
        multa_id: mockMultaId
      }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      });
    }

    return new Response(JSON.stringify({
      error: "Ação inválida",
      action: action
    }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400 
    });

  } catch (error: any) {
    console.log("[ERROR]", error);

    return new Response(JSON.stringify({
      error: error.message,
      details: error
    }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400 
    });
  }
});