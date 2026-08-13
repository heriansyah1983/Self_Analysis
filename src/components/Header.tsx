import React from 'react';
import { 
  BookOpenCheck, 
  Moon, 
  Sun, 
  User, 
  ShieldCheck, 
  Sparkles,
  Menu
} from 'lucide-react';
import { TeacherProfile } from '../types';

interface HeaderProps {
  currentProfile: TeacherProfile | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMobileMenu: () => void;
  onSelectSample: () => void;
  onReset: () => void;
  viewMode: 'Individu' | 'Pengawas';
  onSwitchViewMode: (mode: 'Individu' | 'Pengawas') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  darkMode,
  onToggleDarkMode,
  onOpenMobileMenu,
  onSelectSample,
  onReset,
  viewMode,
  onSwitchViewMode
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-bold text-slate-900 dark:text-white leading-none tracking-tight">
                  GURU<span className="text-blue-600 dark:text-blue-400">SELF-ANALYSIS</span>
                </h1>
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 hidden lg:inline-flex items-center gap-1">
                  <span className="text-slate-400 dark:text-slate-500">Pengembang:</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-bold">Heriansyah, S.Si., S.Pd., M.Pd</strong>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <span className="text-slate-500 dark:text-slate-400">Pengawas Satuan Pendidikan Kab. Sidenreng Rappang</span>
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Dashboard Refleksi & Improvement <span className="lg:hidden">• Heriansyah, S.Si., S.Pd., M.Pd (Pengawas Kab. Sidrap)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Middle/Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mode Switcher: Individu vs Pengawas */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => onSwitchViewMode('Individu')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'Individu'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guru</span>
            </button>
            <button
              onClick={() => onSwitchViewMode('Pengawas')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'Pengawas'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pengawas</span>
            </button>
          </div>

          {/* Quick Demo Sample Button */}
          <button
            onClick={onSelectSample}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition"
            title="Isi dengan contoh data nyata"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Contoh Data</span>
          </button>

          {/* Profile Badge / Name Pill */}
          {currentProfile ? (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                {currentProfile.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                ({currentProfile.educationalLevel})
              </span>
            </div>
          ) : null}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200/80 dark:border-slate-700/80"
            aria-label="Toggle Dark Mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
};
