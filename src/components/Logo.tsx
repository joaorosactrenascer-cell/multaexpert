import React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  mode?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  variant = 'full',
  mode = 'auto'
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary shadow-lg shadow-primary/20">
        {/* Circular Background with subtle gradient/pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        
        {/* Technology Elements (Lines and Points) */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 h-full w-full opacity-30"
        >
          <circle cx="20" cy="30" r="2" fill="white" />
          <circle cx="80" cy="40" r="2" fill="white" />
          <circle cx="50" cy="20" r="2" fill="white" />
          <line x1="20" y1="30" x2="50" y2="20" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="80" y2="40" stroke="white" strokeWidth="0.5" />
        </svg>

        {/* The Car (Stylized Side View) */}
        <svg 
          viewBox="0 0 100 100" 
          className="relative h-7 w-7 text-white"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Car Body */}
          <path d="M15 65 L25 65 L30 55 L70 55 L75 65 L85 65 L85 75 L15 75 Z" fill="currentColor" />
          <path d="M30 55 L40 40 L60 40 L70 55" fill="none" stroke="currentColor" strokeWidth="4" />
          
          {/* Wheels */}
          <circle cx="30" cy="75" r="5" fill="currentColor" stroke="white" strokeWidth="1" />
          <circle cx="70" cy="75" r="5" fill="currentColor" stroke="white" strokeWidth="1" />
          
          {/* Tech Detail on Car */}
          <circle cx="50" cy="48" r="1.5" className="fill-secondary" />
        </svg>

        {/* Curved Road */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute bottom-1 h-full w-full text-secondary"
        >
          <path 
            d="M10 85 Q50 75 90 85" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "text-xl font-black tracking-tight transition-colors",
            mode === 'light' ? "text-slate-900" : 
            mode === 'dark' ? "text-white" : 
            "text-slate-900 dark:text-white"
          )}>
            Multa<span className="text-primary">Expert</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Inteligência Jurídica
          </span>
        </div>
      )}
    </div>
  );
};
