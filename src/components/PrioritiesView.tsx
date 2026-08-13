import React from 'react';
import { AnalysisSummary, PriorityLevel } from '../types';
import { Target, AlertOctagon, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface PrioritiesViewProps {
  summary: AnalysisSummary;
  onNavigateToTab: (tab: any) => void;
}

export const PrioritiesView: React.FC<PrioritiesViewProps> = ({
  summary,
  onNavigateToTab
}) => {
  const highPriorityItems = summary.gapAnalysis.filter((g) => g.priorityLevel === 'Tinggi');
  const mediumPriorityItems = summary.gapAnalysis.filter((g) => g.priorityLevel === 'Sedang');
  const lowPriorityItems = summary.gapAnalysis.filter((g) => g.priorityLevel === 'Rendah');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Sistem Prioritas Berbasis Matriks</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Prioritas Perbaikan Kompetensi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dihitung berdasarkan rumus: <strong>URGENSI × DAMPAK × KESENJANGAN SKOR</strong>
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab('rencana_tindak_lanjut')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0"
        >
          <span>Buat Rencana Tindak Lanjut</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Priority Level 1: Prioritas Tinggi */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>PRIORITAS TINGGI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                {highPriorityItems.length} Dimensi
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kesenjangan kompetensi besar dan berdampak langsung terhadap proses belajar siswa di kelas.
            </p>
          </div>
        </div>

        {highPriorityItems.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            Tidak ada dimensi dalam prioritas tinggi.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {highPriorityItems.map((item) => (
              <div
                key={item.dimensionId}
                className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase">
                    Dimensi {item.dimensionId}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Skor: <strong>{item.score}</strong> / 5.00 • Gap: <strong>{item.gap}</strong>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] shrink-0">
                  Tinggi
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Priority Level 2: Prioritas Sedang */}
      <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>PRIORITAS SEDANG</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">
                {mediumPriorityItems.length} Dimensi
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Perlu diperbaiki secara bertahap tetapi belum mendesak.
            </p>
          </div>
        </div>

        {mediumPriorityItems.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            Tidak ada dimensi dalam prioritas sedang.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {mediumPriorityItems.map((item) => (
              <div
                key={item.dimensionId}
                className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                    Dimensi {item.dimensionId}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Skor: <strong>{item.score}</strong> / 5.00 • Gap: <strong>{item.gap}</strong>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold text-[10px] shrink-0">
                  Sedang
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Priority Level 3: Prioritas Rendah */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>PRIORITAS RENDAH (PENGUATAN & SHARING)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                {lowPriorityItems.length} Dimensi
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sudah baik dan berkembang pesat, hanya membutuhkan penguatan rutin dan pembagian praktik baik.
            </p>
          </div>
        </div>

        {lowPriorityItems.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
            Tidak ada dimensi dalam prioritas rendah.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {lowPriorityItems.map((item) => (
              <div
                key={item.dimensionId}
                className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                    Dimensi {item.dimensionId}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Skor: <strong>{item.score}</strong> / 5.00
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] shrink-0">
                  Penguatan
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
