import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { signIn, signUp } = useAuth();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            if (mode === "login") {
                const { error } = await signIn(email, password);
                if (error) setError(error);
            } else {
                const { error } = await signUp(email, password, name);
                if (error) {
                    setError(error);
                } else {
                    setMessage("Conta criada! Verifique seu e-mail para confirmar.");
                    // Opcional: Limpar campos ou mudar para login
                }
            }
        } catch (err: any) {
            setError(err.message || "Erro inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* ESQUERDA */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-10 flex-col justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-8">
                        <img src="/logo.png" alt="MultaExpert Logo" className="h-12 w-auto" />
                        <h1 className="text-xl font-bold tracking-tight uppercase">MultaExpert</h1>
                   </div>

                    <div className="mt-20">
                        <h2 className="text-4xl font-bold leading-tight">
                            Defesas de multas <br />
                            <span style={{ color: "#0B2F5E" }} className="dark:text-blue-400">inteligentes e rápidas.</span>
                        </h2>
                        <p className="text-slate-400 mt-6 text-lg max-w-md">
                            A plataforma definitiva para especialistas em trânsito automatizarem seus processos com o poder da Inteligência Artificial.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} MultaExpert IA
                    </p>
                    <div className="flex gap-4">
                        <span className="text-xs text-slate-600">Privacidade</span>
                        <span className="text-xs text-slate-600">Termos</span>
                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
                <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {mode === "login" ? "Bem-vindo de volta" : "Criar sua conta"}
                        </h2>
                        <p className="text-slate-500 mt-2">
                            {mode === "login" 
                                ? "Entre com suas credenciais para acessar." 
                                : "Comece agora sua jornada com IA."}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Como quer ser chamado?"
                                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-slate-800 dark:text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                            <input
                                type="email"
                                required
                                placeholder="exemplo@email.com"
                                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-slate-800 dark:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:bg-slate-800 dark:text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm border border-green-100 dark:border-green-900/30">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {loading 
                                ? "Processando..." 
                                : (mode === "login" ? "Entrar" : "Criar conta")}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setMode(mode === "login" ? "register" : "login");
                                setError("");
                                setMessage("");
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                            {mode === "login" 
                                ? "Não tem uma conta? Crie agora" 
                                : "Já tem uma conta? Faça login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}