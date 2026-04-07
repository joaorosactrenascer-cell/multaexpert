import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AssinarContrato() {
    const { id } = useParams();

    const [contrato, setContrato] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [assinado, setAssinado] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (id) {
            fetchContrato();
        } else {
            setErro("ID do contrato inválido");
            setLoading(false);
        }
    }, [id]);

    const fetchContrato = async () => {
        try {
            const { data, error } = await supabase
                .from("contratos")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                setErro("Erro ao buscar contrato");
                return;
            }

            if (!data) {
                setErro("Contrato não encontrado");
                return;
            }

            setContrato(data);

            if (data.status === "assinado") {
                setAssinado(true);
            }
        } catch (err) {
            setErro("Erro inesperado");
        } finally {
            setLoading(false);
        }
    };

    const assinarContrato = async () => {
        try {
            const { error } = await supabase
                .from("contratos")
                .update({
                    status: "assinado",
                    assinado_em: new Date().toISOString(),
                })
                .eq("id", id);

            if (error) {
                alert("Erro ao assinar contrato");
                return;
            }

            setAssinado(true);
        } catch (err) {
            alert("Erro inesperado ao assinar");
        }
    };

    if (loading)
        return (
            <div className="p-6 text-gray-800 dark:text-white">
                Carregando contrato...
            </div>
        );

    if (erro)
        return (
            <div className="p-6 text-red-600 font-semibold">
                {erro}
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xl w-full">

                <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Contrato de Prestação de Serviços
                </h1>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p><strong>Cliente:</strong> {contrato.nome}</p>
                    <p><strong>Placa:</strong> {contrato.placa}</p>
                    <p><strong>Infração:</strong> {contrato.infracao}</p>

                    <p className="mt-4">
                        Ao clicar em assinar, você concorda com os termos do serviço.
                    </p>
                </div>

                {!assinado ? (
                    <button
                        onClick={assinarContrato}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                    >
                        Assinar Contrato
                    </button>
                ) : (
                    <div className="mt-6 text-green-600 font-bold text-center">
                        ✅ Contrato assinado com sucesso!
                    </div>
                )}
            </div>
        </div>
    );
}