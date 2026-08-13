import React, { useState } from 'react';
import { TeacherProfile, AssessmentRecord } from '../types';
import { calculateSchoolAggregate, getCategoryBadgeColor } from '../utils/analysisEngine';
import { 
  Users2, 
  Building, 
  Award, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  Search,
  Filter,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface SupervisorViewProps {
  teachers: TeacherProfile[];
  assessments: AssessmentRecord[];
  onSelectTeacherForDetail: (teacherId: string) => void;
}

export const SupervisorView: React.FC<SupervisorViewProps> = ({
  teachers,
  assessments,
  onSelectTeacherForDetail
}) => {
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>('semua');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('semua');

  const schoolAggregates = calculateSchoolAggregate(teachers, assessments);

  // Filter teachers
  const filteredTeachers = teachers.filter((t) => {
    if (selectedSchoolFilter !== 'semua' && t.school !== selectedSchoolFilter) return false;
    if (selectedLevelFilter !== 'semua' && t.educationalLevel !== selectedLevelFilter) return false;
    return true;
  });

  // Extract unique school names
  const uniqueSchools = Array.from(new Set(teachers.map((t) => t.school)));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white border border-indigo-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
            <ShieldCheck className="w-7 h-7 text-indigo-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-200 uppercase tracking-widest">
              Mode Supervisi & Instructional Coaching
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Dashboard Pengawas Sekolah & Pendampingan
            </h2>
          </div>
        </div>

        {/* Non-Judgmental Principle Box (Prompt M & U Requirement) */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-indigo-100 leading-relaxed">
          <strong className="text-white block mb-1">
            💡 Prinsip Utama Pendampingan Pengawas:
          </strong>
          Aplikasi ini memandu alur: <strong>DATA → PENDAMPINGAN → PERBAIKAN</strong> (bukan Data → Penilaian → Penghakiman). Hasil asesmen diri guru digunakan untuk memetakan jenis dukungan kolektif maupun individual yang paling tepat.
        </div>
      </div>

      {/* Aggregate Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Guru Teranalisis</span>
            <Users2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {teachers.length} Guru
          </div>
          <p className="text-[11px] text-slate-500">Terdaftar di wilayah binaan Anda.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Sekolah Binaan</span>
            <Building className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {uniqueSchools.length} Sekolah
          </div>
          <p className="text-[11px] text-slate-500">Satuan pendidikan terhubung.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Format Pendampingan</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {schoolAggregates[0]?.recommendedCoachingType || 'Kolektif (Kombel)'}
          </div>
          <p className="text-[11px] text-slate-500">Rekomendasi metode pendampingan.</p>
        </div>

      </div>

      {/* School Aggregate Section (Prompt M Requirement) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-500" />
          <span>Analisis Agregat per Sekolah Binaan</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {schoolAggregates.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {s.schoolName}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {s.teacherCount} Guru Terdaftar
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {s.averageScore} / 5.0
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {s.category}
                  </span>
                </div>
              </div>

              {/* Top & Bottom Dimensions */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                    💪 Kekuatan Sekolah:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {s.topDimensions.map((td) => (
                      <li key={td.dimensionId} className="truncate">• {td.title} ({td.score})</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                    🎯 Area Penguatan Sekolah:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {s.bottomDimensions.map((bd) => (
                      <li key={bd.dimensionId} className="truncate">• {bd.title} ({bd.score})</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Coaching Type Box (Prompt N Requirement) */}
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
                  📢 Rekomendasi Pendampingan Pengawas:
                </span>
                <p className="text-indigo-800 dark:text-indigo-300">
                  Format: <strong>{s.recommendedCoachingType}</strong>
                </p>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-400">
                  {s.coachingPriority}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Teachers List & Coaching Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Daftar Guru Binaan & Pendampingan
          </h3>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedSchoolFilter}
                onChange={(e) => setSelectedSchoolFilter(e.target.value)}
                className="bg-transparent font-semibold focus:outline-none"
              >
                <option value="semua">Semua Sekolah</option>
                {uniqueSchools.map((sch) => (
                  <option key={sch} value={sch}>{sch}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              <select
                value={selectedLevelFilter}
                onChange={(e) => setSelectedLevelFilter(e.target.value)}
                className="bg-transparent font-semibold focus:outline-none"
              >
                <option value="semua">Semua Jenjang</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Nama Guru</th>
                <th className="p-3.5">Sekolah / Jenjang</th>
                <th className="p-3.5">Mata Pelajaran</th>
                <th className="p-3.5 text-center">Tahun</th>
                <th className="p-3.5 text-center">Mode</th>
                <th className="p-3.5 rounded-r-xl text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    {t.name}
                    <span className="block text-[10px] font-normal text-slate-400">
                      NIP/NUPTK: {t.nipNuptk || '-'}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">
                    {t.school}
                    <span className="block text-[10px] text-slate-500">
                      ({t.educationalLevel}) • {t.district}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">
                    {t.subjectOrClass}
                  </td>
                  <td className="p-3.5 text-center font-bold">
                    {t.assessmentYear}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      t.analysisMode === 'Pendampingan Pengawas'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {t.analysisMode}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectTeacherForDetail(t.id)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition"
                    >
                      Buka Profil & Refleksi →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
