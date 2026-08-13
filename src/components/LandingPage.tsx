import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Info, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp,
  Brain,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onOpenInfo: (type: 'petunjuk' | 'tentang' | 'privasi') => void;
  onLoadSample: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenInfo,
  onLoadSample
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      
      {/* Main Hero Card */}
      <div className="my-auto py-8 text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
          <span>Instrumen Refleksi & Analisis Profesional Guru</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            GURU <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">SELF-ANALYSIS</span>
          </h1>
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs max-w-full">
            <span className="text-slate-500 dark:text-slate-400">Pengembang:</span>
            <strong className="text-blue-600 dark:text-blue-400 font-bold">Heriansyah, S.Si., S.Pd., M.Pd</strong>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-600 dark:text-slate-400">Pengawas Satuan Pendidikan Kabupaten Sidenreng Rappang</span>
          </div>
          <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto pt-1">
            "Kenali Kondisi Anda – Temukan Masalah – Tentukan Perbaikan – Pantau Perkembangan"
          </p>
        </div>

        {/* Hero Description Box */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl shadow-slate-200/50 dark:shadow-none text-left space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
          
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Jawablah setiap pertanyaan berdasarkan kondisi nyata Anda saat ini. <strong>Tidak ada jawaban benar atau salah.</strong> Hasil asesmen digunakan untuk membantu Anda mengenali kekuatan, menemukan area yang perlu diperbaiki, dan menyusun langkah pengembangan profesional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <Brain className="w-4 h-4 text-blue-500 shrink-0" />
              <span>10 Dimensi Kompetensi</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Matriks Prioritas & Root Cause</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <Award className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Rencana Perbaikan Nyata</span>
            </div>
          </div>
        </div>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
          >
            <span>MULAI ANALISIS DIRI</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onLoadSample}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Coba Contoh Data Guru SD/SMP</span>
          </button>
        </div>

        {/* Secondary Info Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium pt-4">
          <button
            onClick={() => onOpenInfo('petunjuk')}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Petunjuk Penggunaan</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            onClick={() => onOpenInfo('tentang')}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Info className="w-4 h-4" />
            <span>Tentang Aplikasi</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            onClick={() => onOpenInfo('privasi')}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privasi Data</span>
          </button>
        </div>

      </div>

      {/* Footer Note */}
      <footer className="text-center text-xs text-slate-400 dark:text-slate-500 py-4 border-t border-slate-200/60 dark:border-slate-800">
        Aplikasi Refleksi & Instructional Coaching Guru SD, SMP, SMA • Kerangka Kerja Refleksi Berkelanjutan
      </footer>

    </div>
  );
};
