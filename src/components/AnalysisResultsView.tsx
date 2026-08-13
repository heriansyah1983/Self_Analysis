import React from 'react';
import { AnalysisSummary } from '../types';
import { getCategoryBadgeColor } from '../utils/analysisEngine';
import { 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Sparkles, 
  BarChart3, 
  CheckCircle2,
  ArrowUpRight,
  Printer,
  FileDown
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface AnalysisResultsViewProps {
  summary: AnalysisSummary;
  onNavigateToTab: (tab: any) => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  summary,
  onNavigateToTab
}) => {
  const badgeStyle = getCategoryBadgeColor(summary.overallCategory);

  // Radar Chart data formatted for Recharts
  const radarData = summary.dimensionScores.map((ds) => ({
    subject: `D${ds.dimensionId}`,
    fullTitle: ds.dimensionTitle,
    score: ds.score,
    fullMark: 5
  }));

  // Bar Chart data formatted for Recharts
  const barData = summary.dimensionScores.map((ds) => ({
    name: `D${ds.dimensionId}`,
    shortTitle: ds.dimensionTitle.split(' ')[0],
    fullTitle: ds.dimensionTitle,
    score: ds.score
  }));

  const topStrength = summary.strongestDimensions[0];
  const weakestArea = summary.weakestDimensions[0];
  const topPriority = summary.gapAnalysis[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Overall Score & Category Hero Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>Profil Kompetensi Guru</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Hasil Analisis Diri & Refleksi
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Sistem telah menghitung nilai rata-rata dari 10 dimensi kompetensi Anda untuk memetakan kekuatan, area perbaikan, dan prioritas perbaikan.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigateToTab('laporan')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Download PDF & Word</span>
              </button>
            </div>
          </div>

          {/* Score Badge Card */}
          <div className="shrink-0 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-900 text-white shadow-md min-w-[200px] text-center border border-slate-700">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Skor Keseluruhan
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
              {summary.overallScore} <span className="text-base font-normal text-slate-400">/ 5.0</span>
            </div>
            <div className={`mt-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
              {summary.overallCategory}
            </div>
          </div>

        </div>
      </div>

      {/* Top Cards: Kekuatan Utama, Area Perbaikan, Prioritas (High Density Left-Border Accent Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Kekuatan Utama */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-r-xl p-4 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Kekuatan Utama
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {topStrength?.dimensionTitle || 'Pengelolaan Kelas'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              "{topStrength?.dimensionTitle} merupakan kekuatan utama Anda dengan skor tinggi <strong>{topStrength?.score} / 5.00</strong>."
            </p>
          </div>
        </div>

        {/* Card 2: Area Perbaikan */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 rounded-r-xl p-4 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Area Perbaikan
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {weakestArea?.dimensionTitle || 'Asesmen Pembelajaran'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              "{weakestArea?.dimensionTitle} menjadi area yang paling membutuhkan penguatan dengan skor <strong>{weakestArea?.score} / 5.00</strong>."
            </p>
          </div>
        </div>

        {/* Card 3: Prioritas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-500 rounded-r-xl p-4 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Prioritas Utama
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Prioritas 1: {topPriority?.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              "Fokus perbaikan pertama: <strong>{topPriority?.title}</strong> (Kesenjangan: {topPriority?.gap})."
            </p>
          </div>
        </div>

      </div>

      {/* Visualizations Grid: Radar Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Radar Chart Component */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Radar Chart 10 Dimensi Kompetensi
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Visual porsi keseimbangan kompetensi guru</p>
              </div>
            </div>
          </div>

          <div className="h-[280px] sm:h-[310px] w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.4} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar
                  name="Skor Anda"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            {summary.dimensionScores.map((ds) => (
              <div key={ds.dimensionId} className="truncate">
                <strong className="text-slate-800 dark:text-slate-200">D{ds.dimensionId}:</strong> {ds.score}
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Component */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Bar Chart Skor per Dimensi
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Nilai individual tiap aspek dari skala 1 sampai 5</p>
              </div>
            </div>
          </div>

          <div className="h-[280px] sm:h-[310px] w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} 
                />
                <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [`${value} / 5.00`, props.payload.fullTitle]}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => {
                    let fill = '#3b82f6';
                    if (entry.score >= 4.21) fill = '#10b981';
                    else if (entry.score >= 3.41) fill = '#3b82f6';
                    else if (entry.score >= 2.61) fill = '#f59e0b';
                    else fill = '#f43f5e';
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-end gap-3 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Sangat Baik</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Baik</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> Berkembang</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> Prioritas</span>
          </div>
        </div>

      </div>

      {/* Dimension Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Rincian Nilai 10 Dimensi Kompetensi
          </h3>
          <button
            onClick={() => onNavigateToTab('temuan')}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Temuan & Root Cause</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-2.5 rounded-l-lg">No</th>
                <th className="p-2.5">Dimensi Kompetensi</th>
                <th className="p-2.5 text-center">Skor (1-5)</th>
                <th className="p-2.5 text-center">Kategori</th>
                <th className="p-2.5 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {summary.dimensionScores.map((ds) => {
                const catBadge = getCategoryBadgeColor(ds.category);
                return (
                  <tr key={ds.dimensionId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                    <td className="p-2.5 font-bold text-slate-400">D{ds.dimensionId}</td>
                    <td className="p-2.5 font-semibold text-slate-900 dark:text-white">
                      {ds.dimensionTitle}
                    </td>
                    <td className="p-2.5 text-center font-bold text-slate-900 dark:text-white text-xs">
                      {ds.score}
                    </td>
                    <td className="p-2.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                        {ds.category}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => onNavigateToTab('temuan')}
                        className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                      >
                        Analisis →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
