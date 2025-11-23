import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export const CyberButton = ({ children, onClick, variant = 'primary', className = '' }: { children: ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' | 'danger', className?: string }) => {
  const baseStyle = "relative px-6 py-2 font-display text-sm font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border";
  
  const variants = {
    primary: "border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    secondary: "border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary hover:text-white shadow-[0_0_10px_rgba(112,0,255,0.3)]",
    danger: "border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
    </button>
  );
};

export const CyberCard = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <div className={`relative bg-cyber-dark/80 backdrop-blur-md border border-cyber-primary/30 p-6 ${className}`}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-primary"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-primary"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary"></div>
    {children}
  </div>
);

export const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary uppercase tracking-tighter mb-2">
      {title}
    </h2>
    {subtitle && <div className="w-24 h-1 bg-cyber-primary mx-auto mb-4 shadow-[0_0_10px_#00f0ff]"></div>}
    {subtitle && <p className="text-gray-400 font-sans tracking-wide max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

export const StatCard = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string | number }) => (
  <div className="bg-cyber-panel border border-cyber-primary/20 p-4 flex items-center gap-4">
    <div className="p-3 bg-cyber-primary/10 rounded">
      <Icon className="w-6 h-6 text-cyber-primary" />
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-display font-bold text-white">{value}</p>
    </div>
  </div>
);