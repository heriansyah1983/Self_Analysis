import React from 'react';
import { ImprovementActionItem } from '../types';
import { TrendingUp, CheckCircle2, Clock, AlertCircle, Award } from 'lucide-react';

interface ProgressViewProps {
  actionPlan: ImprovementActionItem[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ actionPlan }) => {
  const total = actionPlan.length;
  const completed = actionPlan.filter((a) => a.status === 'Selesai');
  const ongoing = actionPlan.filter((a) => a.status === 'Sedang dilakukan');
  const pending = actionPlan.filter((a) => a.status === 'Belum dimulai' || a.status === 'Perlu tindak lanjut');

  const totalProgressSum = actionPlan.reduce((acc, a) => acc + a.progressPercent, 0);
  const overallPercent = total > 0 ? Math.round(totalProgressSum / total) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Monitoring & Progress Perkembangan
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pantau sejauh mana aksi perbaikan telah Anda realisasikan di dalam kelas.
            </p>
          </div>
        </div>

        {/* Big Overall Progress Display */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                Status Perkembangan Keseluruhan
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                {overallPercent}% Terlaksana
              </div>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-xs font-bold text-emerald-300 border border-white/20">
              {completed.length} dari {total} Aksi Selesai
            </div>
          </div>

          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Progress Cards Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Selesai</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completed.length} Aksi
          </div>
          <p className="text-[11px] text-slate-500">Telah dicapai dan membuahkan dampak positif.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Sedang Berjalan</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {ongoing.length} Aksi
          </div>
          <p className="text-[11px] text-slate-500">Sedang diimplementasikan di kelas.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Belum / Perlu Lanjut</span>
            <AlertCircle className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {pending.length} Aksi
          </div>
          <p className="text-[11px] text-slate-500">Menunggu giliran pelaksanaan berikutnya.</p>
        </div>

      </div>

      {/* Action Progress Timeline */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Rincian Lini Masa Perkembangan Aksi Perbaikan
        </h3>

        <div className="space-y-3">
          {actionPlan.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {act.dimensionTitle} • Target: {act.timeframe}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {act.problem}
                  </h4>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold self-start sm:self-auto ${
                  act.status === 'Selesai'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : act.status === 'Sedang dilakukan'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {act.status} ({act.progressPercent}%)
                </span>
              </div>

              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${act.progressPercent}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Aksi:</strong> {act.action}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
