import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Camera, 
  Save, 
  Lock, 
  Bell, 
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Perfil: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Dr. João Silva',
    email: 'joao.silva@advocacia.com.br',
    phone: '(11) 98765-4321',
    oab: '123.456/SP',
    address: 'Av. Paulista, 1000, Bela Vista, São Paulo - SP',
    bio: 'Advogado especialista em Direito de Trânsito com mais de 10 anos de experiência em recursos administrativos e judiciais.'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Meu Perfil</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie suas informações pessoais e profissionais.</p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 dark:shadow-none"
                >
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </header>

        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-secondary/10 p-4 text-secondary dark:bg-secondary/20 border border-secondary/20 dark:border-secondary/30"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-bold">Perfil atualizado com sucesso!</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Avatar & Quick Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950 shadow-sm">
              <div className="relative mx-auto h-32 w-32">
                <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-4xl font-black text-white shadow-xl">
                  JS
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-slate-600 shadow-lg border border-slate-100 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{profileData.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">OAB: {profileData.oab}</p>
              
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary dark:bg-primary/20">
                  Plano Profissional
                </span>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary dark:bg-secondary/20">
                  Verificado
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Segurança da Conta</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-900">
                      <Lock className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Senha</span>
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline">Alterar</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-900">
                      <Shield className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">2FA Ativo</span>
                  </div>
                  <div className="h-5 w-9 rounded-full bg-secondary p-1">
                    <div className="h-3 w-3 translate-x-4 rounded-full bg-white transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Informações Pessoais</h3>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">E-mail Profissional</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      disabled={!isEditing}
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Registro OAB</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={profileData.oab}
                      onChange={(e) => setProfileData({...profileData, oab: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Endereço Comercial</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Biografia Profissional</label>
                  <textarea 
                    disabled={!isEditing}
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white resize-none"
                  />
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Notificações</h3>
              <div className="space-y-4">
                {[
                  { title: 'E-mail de novos processos', desc: 'Receba um alerta sempre que uma nova multa for detectada.', icon: Bell },
                  { title: 'Relatórios Mensais', desc: 'Resumo de economia e ganhos de causa por e-mail.', icon: Globe },
                  { title: 'Alertas de Vencimento', desc: 'Notificações push sobre prazos de recursos.', icon: AlertCircle },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-primary/10 p-2.5 dark:bg-primary/20">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary p-1 cursor-pointer">
                      <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
