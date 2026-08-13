import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Brain,
  BarChart3,
  Search,
  Target,
  FileSpreadsheet,
  TrendingUp,
  RotateCcw,
  Users2,
  FileText,
  Settings,
  X,
  Sparkles
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'profil'
  | 'analisis_diri'
  | 'hasil_analisis'
  | 'temuan'
  | 'prioritas'
  | 'rencana_tindak_lanjut'
  | 'progress'
  | 'reassessment'
  | 'pengawas'
  | 'laporan'
  | 'pengaturan';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  assessmentCompleted: boolean;
  progressPercent: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
  assessmentCompleted,
  progressPercent
}) => {
  const menuItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'profil', label: 'Profil Guru', icon: UserCheck },
    { id: 'analisis_diri', label: 'Analisis Diri (10 Dimensi)', icon: Brain, badge: assessmentCompleted ? 'Selesai' : 'Isi' },
    { id: 'hasil_analisis', label: 'Hasil Analisis', icon: BarChart3 },
    { id: 'temuan', label: 'Temuan & Penyebab', icon: Search },
    { id: 'prioritas', label: 'Prioritas Perbaikan', icon: Target },
    { id: 'rencana_tindak_lanjut', label: 'Rencana Tindak Lanjut', icon: FileSpreadsheet },
    { id: 'progress', label: 'Progress & Monitoring', icon: TrendingUp },
    { id: 'reassessment', label: 'Re-Assessment', icon: RotateCcw },
    { id: 'pengawas', label: 'Pendampingan Pengawas', icon: Users2 },
    { id: 'laporan', label: 'Laporan Otomatis', icon: FileText },
    { id: 'pengaturan', label: 'Pengaturan & Data', icon: Settings },
  ];

  const handleNavClick = (id: NavTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#1e293b] border-r border-slate-800 w-60 py-4 text-slate-200 select-none">
      
      {/* Mobile close button */}
      <div className="flex lg:hidden items-center justify-between px-4 pb-3 mb-2 border-b border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Menu Navigasi</span>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-md text-slate-400 hover:bg-slate-800"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Widget in Sidebar */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white">
        <div className="flex items-center justify-between text-xs font-semibold mb-1">
          <span className="flex items-center gap-1.5 text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Asesmen Diri
          </span>
          <span className="font-bold text-xs">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
          {assessmentCompleted
            ? 'Asesmen selesai! Lihat rekomendasi.'
            : 'Selesaikan 10 dimensi untuk diagnosis.'}
        </p>
      </div>

      {/* Navigation Links with High Density border-l-4 active indicator */}
      <div className="flex-1 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition duration-150 border-l-4 ${
                isActive
                  ? 'bg-white/10 text-white font-bold border-blue-500'
                  : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isActive 
                    ? 'bg-blue-500/30 text-blue-300 border border-blue-400/40' 
                    : item.badge === 'Selesai'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-3 px-3 mt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center font-medium leading-relaxed">
        <p className="font-semibold text-slate-300">Pengembang:</p>
        <p className="text-blue-400 font-bold">Heriansyah, S.Si., S.Pd., M.Pd</p>
        <p className="text-slate-500 text-[9px]">Pengawas Satuan Pendidikan Kab. Sidenreng Rappang</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 max-w-full h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
