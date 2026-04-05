import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import { NovaDefesa } from './components/Modules/NovaDefesa';
import { MinhasDefesas } from './components/Modules/MinhasDefesas';
import { AssistenteIA } from './components/Modules/AssistenteIA';
import { ConsultarMultas } from './components/Modules/ConsultarMultas';
import { NovaMulta } from './components/Modules/NovaMulta';
import { AnaliseAutomatica } from './components/Modules/AnaliseAutomatica';
import { Assinatura } from './components/Modules/Assinatura';
import { Pagamentos } from './components/Modules/Pagamentos';
import { Perfil } from './components/Modules/Perfil';
import { Preferencias } from './components/Modules/Preferencias';
import { Dashboard } from './pages/Dashboard';
import { TesteIA } from './pages/TesteIA';
import Login from './components/Modules/Login';
import { useAuth } from './context/AuthContext';

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center dark:bg-slate-950 dark:text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      {!user ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden">
          <Sidebar />

          <main className="flex-1 min-w-0 flex flex-col relative">
            <div className="h-16 lg:hidden" />

            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/multas" element={<ConsultarMultas />} />
              <Route path="/multas/nova" element={<NovaMulta />} />

              <Route path="/defesa/nova" element={<NovaDefesa />} />
              <Route path="/defesa/minhas" element={<MinhasDefesas />} />
              <Route path="/defesas" element={<MinhasDefesas />} />

              <Route path="/assistente-ia" element={<AssistenteIA />} />
              <Route path="/analise-automatica" element={<AnaliseAutomatica />} />
              <Route path="/teste-ia" element={<TesteIA />} />

              <Route path="/assinatura" element={<Assinatura />} />
              <Route path="/pagamentos" element={<Pagamentos />} />

              <Route path="/perfil" element={<Perfil />} />
              <Route path="/preferencias" element={<Preferencias />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}