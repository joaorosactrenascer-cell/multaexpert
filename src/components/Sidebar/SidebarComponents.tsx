import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils'; // I'll create this utility later

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  badge?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  collapsed,
  onClick,
  badge,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        active
          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
          : "text-slate-600 dark:text-slate-400"
      )}
      aria-label={label}
    >
      <Icon className={cn("h-5 w-5 shrink-0", active ? "text-primary" : "text-slate-500 dark:text-slate-400")} />
      
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 text-left text-sm font-medium"
        >
          {label}
        </motion.span>
      )}

      {!collapsed && badge && (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">
          {badge}
        </span>
      )}

      {collapsed && (
        <div className="invisible absolute left-full ml-3 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100 dark:bg-slate-700">
          {label}
        </div>
      )}
    </button>
  );
};

interface SidebarGroupProps {
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  icon: Icon,
  label,
  collapsed,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={onToggle}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
          "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        )}
        aria-expanded={isOpen}
      >
        <Icon className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
        
        {!collapsed && (
          <>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-left text-sm font-medium"
            >
              {label}
            </motion.span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen ? "rotate-180" : ""
              )}
            />
          </>
        )}

        {collapsed && (
          <div className="invisible absolute left-full ml-3 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100 dark:bg-slate-700">
            {label}
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-slate-200 pl-4 dark:border-slate-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
