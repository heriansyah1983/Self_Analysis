import React, { useState } from 'react';
import { AssessmentRecord, ReassessmentComparison } from '../types';
import { compareReassessment } from '../utils/analysisEngine';
import { RotateCcw, TrendingUp, ArrowUpRight, ArrowDownRight, Minus, Sparkles, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ReassessmentViewProps {
  initialAssessment: AssessmentRecord;
  reassessment: AssessmentRecord | null;
  onStartReassessment: () => void;
}

export const ReassessmentView: React.FC<ReassessmentViewProps> = ({
  initialAssessment,
  reassessment,
  onStartReassessment
}) => {
  const comparison: ReassessmentComparison | null = reassessment 
    ? compareReassessment(initialAssessment, reassessment)
    : null;

  // Chart data for comparing initial vs reassessment
  const chartData = comparison ? [
    { name: 'Asesmen Awal', score: comparison.initialOverallScore },
    { name: 'Asesmen Ulang', score: comparison.newOverallScore }
  ] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <RotateCcw className="w-4 h-4" />
              <span>Evaluasi Perkembangan Berkelanjutan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Fitur Re-Assessment & Perbandingan Hasil
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ukur kembali kompetensi Anda setelah mengimplementasikan rencana perbaikan di dalam kelas.
            </p>
          </div>

          <button
            onClick={onStartReassessment}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 transition shadow-md shadow-blue-500/20 shrink-0 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Asesmen Ulang</span>
          </button>
        </div>
      </div>

      {!comparison ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-blue-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Belum Ada Data Asesmen Ulang
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Setelah Anda mempraktikkan rencana perbaikan selama beberapa minggu, klik tombol <strong>"Mulai Asesmen Ulang"</strong> untuk membandingkan pertumbuhan kompetensi Anda secara sistematis.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Comparison Stats Cards (Prompt L Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Skor Awal */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skor Awal</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {comparison.initialOverallScore} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </div>
              <p className="text-[10px] text-slate-500">{comparison.initialAssessmentDate}</p>
            </div>

            {/* Skor Terbaru */}
            <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-3xl p-5 text-center space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Skor Terbaru</span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {comparison.newOverallScore} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </div>
              <p className="text-[10px] text-slate-500">{comparison.reassessmentDate}</p>
            </div>

            {/* Selisih */}
            <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-5 text-center space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Selisih Delta</span>
              <div className={`text-2xl font-black flex items-center justify-center gap-1 ${
                comparison.scoreDelta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
              }`}>
                {comparison.scoreDelta >= 0 ? `+${comparison.scoreDelta}` : comparison.scoreDelta}
              </div>
              <p className="text-[10px] text-slate-500">Kenaikan Skor</p>
            </div>

            {/* Persentase Peningkatan */}
            <div className="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-3xl p-5 text-center space-y-1">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">% Pertumbuhan</span>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {comparison.percentageChange >= 0 ? `+${comparison.percentageChange}%` : `${comparison.percentageChange}%`}
              </div>
              <p className="text-[10px] text-slate-500">Peningkatan Relatif</p>
            </div>

          </div>

          {/* Trend Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Grafik Perkembangan Skor Antarperiode
            </h3>
            <div className="h-[220px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dimension Change Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Meningkat */}
            <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4" />
                Dimensi Meningkat ({comparison.improvedDimensions.length})
              </h4>
              <ul className="space-y-2 text-xs">
                {comparison.improvedDimensions.map((d) => (
                  <li key={d.id} className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{d.title}</span>
                    <span className="font-bold text-emerald-600">+{d.delta}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menurun */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1.5">
                <ArrowDownRight className="w-4 h-4" />
                Dimensi Perlu Perhatian ({comparison.declinedDimensions.length})
              </h4>
              <ul className="space-y-2 text-xs">
                {comparison.declinedDimensions.length === 0 ? (
                  <p className="text-slate-400 italic text-[11px]">Tidak ada dimensi yang menurun.</p>
                ) : (
                  comparison.declinedDimensions.map((d) => (
                    <li key={d.id} className="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{d.title}</span>
                      <span className="font-bold text-rose-600">{d.delta}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Tetap */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Minus className="w-4 h-4" />
                Dimensi Stabil / Tetap ({comparison.maintainedDimensions.length})
              </h4>
              <ul className="space-y-2 text-xs">
                {comparison.maintainedDimensions.map((d) => (
                  <li key={d.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{d.title}</span>
                    <span className="font-bold text-slate-600">{d.score}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
