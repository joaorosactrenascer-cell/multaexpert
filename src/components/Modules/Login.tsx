import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const { error } = await signIn(email, password);

        if (error) {
            setError(error);
        }

        setLoading(false);
    };

    return (
        <div className="flex min-h-screen">
            {/* ESQUERDA */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-10 flex-col justify-between">
                <h1 className="text-2xl font-bold">MultaExpert</h1>

                <div>
                    <h2 className="text-3xl font-bold">
                        Automatize defesas de multas com IA
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Plataforma moderna para especialistas em trânsito.
                    </p>
                </div>

                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()}
                </p>
            </div>

            {/* DIREITA */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-slate-100 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-xl font-bold text-center mb-6">
                        Entrar
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-3 p-3 border rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full mb-3 p-3 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-2">{error}</p>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </div>
        </div>
    );
}