import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users,
  Scale,
  PlusCircle, 
  History, 
  Bot, 
  Activity,
  Settings, 
  User, 
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
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
  
  // State for collapsible groups based on current path
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    casos: activePage.startsWith('/casos'),
    config: activePage.startsWith('/perfil') || activePage.startsWith('/preferencias')
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
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('/dashboard')}>
          <Logo variant={collapsed ? 'icon' : 'full'} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        <div className="flex flex-col gap-2">
          {/* Dashboard */}
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activePage === '/dashboard' || activePage === '/'} 
            collapsed={collapsed} 
            onClick={() => handleNavigate('/dashboard')}
          />

          {/* Clientes */}
          <SidebarItem 
            icon={Users} 
            label="Clientes" 
            active={activePage === '/clientes'} 
            collapsed={collapsed} 
            onClick={() => handleNavigate('/clientes')}
          />

          {/* Casos Group */}
          <SidebarGroup 
            icon={Scale} 
            label="Casos" 
            collapsed={collapsed} 
            isOpen={openGroups.casos}
            onToggle={() => toggleGroup('casos')}
          >
            <SidebarItem 
              icon={PlusCircle} 
              label="Novo Caso" 
              active={activePage === '/casos/novo'}
              collapsed={collapsed} 
              onClick={() => handleNavigate('/casos/novo')}
            />
            <SidebarItem 
              icon={History} 
              label="Todos os Casos" 
              active={activePage === '/casos'}
              collapsed={collapsed} 
              onClick={() => handleNavigate('/casos')}
            />
          </SidebarGroup>

          {/* IA */}
          <SidebarItem 
            icon={Bot} 
            label="Inteligência IA" 
            active={activePage === '/assistente-ia'}
            collapsed={collapsed} 
            onClick={() => handleNavigate('/assistente-ia')}
          />

          {/* Monitoramento */}
          <SidebarItem 
            icon={Activity} 
            label="Monitoramento" 
            active={activePage === '/monitoramento'} 
            collapsed={collapsed} 
            onClick={() => handleNavigate('/monitoramento')}
          />

          {/* Spacer */}
          <div className="my-4 border-t border-slate-100 dark:border-slate-900" />

          {/* Configurações Group */}
          <SidebarGroup 
            icon={Settings} 
            label="Configurações" 
            collapsed={collapsed} 
            isOpen={openGroups.config}
            onToggle={() => toggleGroup('config')}
          >
            <SidebarItem 
              icon={User} 
              label="Meu Perfil" 
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

      {/* Footer Actions */}
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

          {/* Logout */}
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

      {/* Mobile Drawer Overlay & Content */}
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

      {/* Desktop Sidebar Container */}
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
