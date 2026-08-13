import React from 'react';
import { FindingItem } from '../types';
import { 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface FindingsViewProps {
  findings: FindingItem[];
  onAddToActionPlan: (finding: FindingItem) => void;
  onNavigateToPlan: () => void;
}

export const FindingsView: React.FC<FindingsViewProps> = ({
  findings,
  onAddToActionPlan,
  onNavigateToPlan
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Search className="w-4 h-4" />
            <span>Analisis "Mengapa" & Diagnosis Temuan</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Temuan Utama & Analisis Akar Penyebab
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sistem tidak hanya menampilkan nilai, tetapi mengidentifikasi akar penyebab dan merekomendasikan aksi spesifik.
          </p>
        </div>

        <button
          onClick={onNavigateToPlan}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0"
        >
          <span>Ke Rencana Tindak Lanjut</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Findings List */}
      {findings.length === 0 ? (
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
            Sangat Luar Biasa!
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
            Seluruh dimensi kompetensi Anda berada pada kategori Sangat Baik (skor &gt; 3.8). Anda dapat terus mempertahankan kekuatan ini dan berbagi praktik baik di Komunitas Belajar!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {findings.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Dimensi {item.dimensionId}: {item.dimensionTitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.findingTitle}
                    </h3>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold shrink-0 self-start sm:self-auto">
                  Skor: {item.score} / 5.00
                </div>
              </div>

              {/* Grid 2 Columns: Evidence & Root Cause vs Recommended Action */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
                
                {/* Left Column: Evidence & Possible Causes */}
                <div className="space-y-4">
                  
                  {/* Evidence Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      📌 BUKTI DARI ASESMEN
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.evidence}
                    </p>
                    {item.userReflectionsSummary && (
                      <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 italic">
                        {item.userReflectionsSummary}
                      </p>
                    )}
                  </div>

                  {/* Possible Causes Box (Prompt I Requirement) */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-900/60">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      KEMUNGKINAN PENYEBAB (ROOT CAUSE)
                    </span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4">
                      {item.possibleCauses.map((cause, cIdx) => (
                        <li key={cIdx}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Right Column: Action & Outcome */}
                <div className="space-y-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60">
                  
                  <div>
                    <span className="font-bold text-blue-800 dark:text-blue-300 block mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      REKOMENDASI TINDAKAN PERBAIKAN
                    </span>
                    <ol className="space-y-1.5 text-slate-800 dark:text-slate-200 list-decimal pl-4">
                      {item.recommendedActions.map((act, aIdx) => (
                        <li key={aIdx}>{act}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Target & Success Indicator */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 dark:border-blue-800/60 text-[11px]">
                    <div>
                      <span className="font-semibold text-slate-500 dark:text-slate-400 block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500" />
                        Target Waktu:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {item.targetTimeWeeks} Minggu
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500 dark:text-slate-400 block flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-indigo-500" />
                        Indikator Keberhasilan:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {item.successIndicator}
                      </span>
                    </div>
                  </div>

                  {/* Add to Improvement Plan CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onAddToActionPlan(item)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tambahkan ke Rencana Perbaikan Saya</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
