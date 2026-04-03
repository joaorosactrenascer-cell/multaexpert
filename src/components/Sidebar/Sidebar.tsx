import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  History, 
  Bot, 
  Search, 
  FileSearch,
  FlaskConical,
  BarChart3, 
  CreditCard, 
  Settings, 
  User, 
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Scale,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SidebarItem, SidebarGroup } from './SidebarComponents';
import { useTheme } from '@/src/context/ThemeContext';
import { useAuth } from '@/src/context/AuthContext';
import { Logo } from '../Logo';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  
  // State for collapsible groups
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    defesas: activePage.startsWith('/defesa'),
    multas: activePage.startsWith('/multas'),
    consulta: false,
    financeiro: false,
    config: false
  });

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleNavigate = (page: string) => {
    navigate(page);
    setMobileOpen(false);
  };

  // Close mobile sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Header */}
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
          <Logo variant={collapsed ? 'icon' : 'full'} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        <div className="flex flex-col gap-6">
          {/* Main Group */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <span className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Principal
              </span>
            )}
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activePage === '/dashboard' || activePage === '/'} 
              collapsed={collapsed} 
              onClick={() => handleNavigate('/dashboard')}
            />
            
            <SidebarGroup 
              icon={FileText} 
              label="Defesas" 
              collapsed={collapsed} 
              isOpen={openGroups.defesas}
              onToggle={() => toggleGroup('defesas')}
            >
              <SidebarItem 
                icon={PlusCircle} 
                label="Nova Defesa" 
                active={activePage === '/defesa/nova'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/defesa/nova')}
              />
              <SidebarItem 
                icon={History} 
                label="Minhas Defesas" 
                active={activePage === '/defesa/minhas'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/defesa/minhas')}
              />
            </SidebarGroup>

            <SidebarGroup 
              icon={FileSearch}
              label="Multas" 
              collapsed={collapsed} 
              isOpen={openGroups.multas}
              onToggle={() => toggleGroup('multas')}
            >
              <SidebarItem 
                icon={PlusCircle} 
                label="Nova Multa" 
                active={activePage === '/multas/nova'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/multas/nova')}
              />
              <SidebarItem 
                icon={History} 
                label="Minhas Multas" 
                active={activePage === '/multas'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/multas')}
              />
            </SidebarGroup>

            <SidebarItem 
              icon={Bot} 
              label="Assistente IA" 
              active={activePage === '/assistente-ia'}
              collapsed={collapsed} 
              badge="Beta" 
              onClick={() => handleNavigate('/assistente-ia')}
            />
            <SidebarItem 
              icon={FlaskConical} 
              label="Teste da IA" 
              active={activePage === '/teste-ia'}
              collapsed={collapsed} 
              badge="Lab"
              onClick={() => handleNavigate('/teste-ia')}
            />
          </div>

          {/* Tools Group */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <span className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Ferramentas
              </span>
            )}
            <SidebarGroup 
              icon={BarChart3} 
              label="Ferramentas" 
              collapsed={collapsed} 
              isOpen={openGroups.consulta}
              onToggle={() => toggleGroup('consulta')}
            >
              <SidebarItem 
                icon={BarChart3} 
                label="Análise Automática" 
                active={activePage === '/analise-automatica'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/analise-automatica')}
              />
            </SidebarGroup>

            <SidebarGroup 
              icon={CreditCard} 
              label="Financeiro" 
              collapsed={collapsed} 
              isOpen={openGroups.financeiro}
              onToggle={() => toggleGroup('financeiro')}
            >
              <SidebarItem 
                icon={CreditCard} 
                label="Assinatura" 
                active={activePage === '/assinatura'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/assinatura')}
              />
              <SidebarItem 
                icon={History} 
                label="Pagamentos" 
                active={activePage === '/pagamentos'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/pagamentos')}
              />
            </SidebarGroup>
          </div>

          {/* System Group */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <span className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Sistema
              </span>
            )}
            <SidebarGroup 
              icon={Settings} 
              label="Configurações" 
              collapsed={collapsed} 
              isOpen={openGroups.config}
              onToggle={() => toggleGroup('config')}
            >
              <SidebarItem 
                icon={User} 
                label="Perfil" 
                active={activePage === '/perfil'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/perfil')}
              />
              <SidebarItem 
                icon={Palette} 
                label="Preferências" 
                active={activePage === '/preferencias'}
                collapsed={collapsed} 
                onClick={() => handleNavigate('/preferencias')}
              />
            </SidebarGroup>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-col gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
              "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {!collapsed && (
              <span className="text-sm font-medium">
                Modo {theme === 'dark' ? 'Claro' : 'Escuro'}
              </span>
            )}
          </button>

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "hidden lg:flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
              "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            {!collapsed && <span className="text-sm font-medium">Recolher</span>}
          </button>

          {/* Logout Toggle */}
          <button
            onClick={async () => {
              await signOut();
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
              "hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="text-sm font-medium">Sair da Conta</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        <div className="flex items-center gap-2">
          <Logo variant="full" className="scale-75 origin-left" />
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 z-[60] rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <X className="h-6 w-6" />
                </button>
                {SidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="hidden lg:relative lg:z-40 lg:block h-screen sticky top-0"
      >
        {SidebarContent}
      </motion.aside>
    </>
  );
};
