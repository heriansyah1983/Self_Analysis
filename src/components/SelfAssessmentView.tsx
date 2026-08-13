import React, { useState } from 'react';
import { DIMENSIONS_DATA } from '../data/dimensionsData';
import { AssessmentRecord, ConsistencyLevel, ReflectionAnswer } from '../types';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Save, 
  HelpCircle,
  AlertCircle,
  Check,
  Brain,
  BookOpen,
  Users,
  ClipboardCheck,
  BookMarked,
  Cpu,
  ShieldCheck,
  Lightbulb,
  Award
} from 'lucide-react';

interface SelfAssessmentViewProps {
  assessment: AssessmentRecord;
  onUpdateAnswer: (indicatorId: string, score: number, consistency?: ConsistencyLevel) => void;
  onUpdateReflection: (dimensionId: number, reflections: ReflectionAnswer) => void;
  onCompleteAssessment: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Users,
  ClipboardCheck,
  Brain,
  BookMarked,
  Cpu,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Award
};

export const SelfAssessmentView: React.FC<SelfAssessmentViewProps> = ({
  assessment,
  onUpdateAnswer,
  onUpdateReflection,
  onCompleteAssessment
}) => {
  const [activeDimensionIndex, setActiveDimensionIndex] = useState(0);
  const [autoSaveMsg, setAutoSaveMsg] = useState<string | null>(null);

  const currentDim = DIMENSIONS_DATA[activeDimensionIndex];

  // Icon for current dimension
  const IconComp = ICON_MAP[currentDim.iconName] || Brain;

  // Calculate dimension completion %
  const totalIndicators = DIMENSIONS_DATA.reduce((acc, d) => acc + d.indicators.length, 0);
  const answeredCount = Object.keys(assessment.answers).length;
  const overallProgress = Math.round((answeredCount / totalIndicators) * 100);

  // Current dimension reflection answers
  const currentReflections = assessment.reflections[currentDim.id] || {
    dimensionId: currentDim.id,
    q1_difficulties: '',
    q2_reasons: '',
    q3_current_efforts: '',
    q4_needed_improvements: '',
    q5_needed_support: ''
  };

  const handleScoreChange = (indicatorId: string, score: number) => {
    const existing = assessment.answers[indicatorId];
    onUpdateAnswer(indicatorId, score, existing?.consistency);
    triggerAutoSave();
  };

  const handleConsistencyChange = (indicatorId: string, consistency: ConsistencyLevel) => {
    const existing = assessment.answers[indicatorId];
    const currentScore = existing?.score || 3;
    onUpdateAnswer(indicatorId, currentScore, consistency);
    triggerAutoSave();
  };

  const handleReflectionTextChange = (field: keyof ReflectionAnswer, text: string) => {
    const updated = {
      ...currentReflections,
      [field]: text
    };
    onUpdateReflection(currentDim.id, updated);
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setAutoSaveMsg('Tersimpan otomatis');
    setTimeout(() => setAutoSaveMsg(null), 2000);
  };

  const isCurrentDimComplete = currentDim.indicators.every((ind) => !!assessment.answers[ind.id]?.score);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Header & Dimension Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              <span>Analisis Diri 10 Dimensi</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Instrumen Refleksi Kompetensi Guru
            </h2>
          </div>

          {/* Progress & Autosave indicator */}
          <div className="flex items-center gap-3">
            {autoSaveMsg && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {autoSaveMsg}
              </span>
            )}
            <div className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
              Progress: {overallProgress}% ({answeredCount}/{totalIndicators} Indikator)
            </div>
          </div>
        </div>

        {/* Dimension Tabs (Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-100 dark:border-slate-800/80">
          {DIMENSIONS_DATA.map((dim, idx) => {
            const isCompleted = dim.indicators.every((ind) => !!assessment.answers[ind.id]?.score);
            const isActive = idx === activeDimensionIndex;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveDimensionIndex(idx)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>D{dim.id}</span>
                <span className="hidden sm:inline max-w-[120px] truncate">{dim.title}</span>
                {isCompleted && !isActive && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dimension Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl shrink-0">
            <IconComp className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-1">
              Dimensi {currentDim.id} dari 10
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {currentDim.title}
            </h3>
            <p className="text-sm text-blue-100 mt-1 leading-relaxed">
              {currentDim.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Rating Scale Legend */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-xs">
        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Panduan Penilaian Skala (1 - 5):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-medium">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300">
            <strong>1</strong> = Belum berkembang
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-300">
            <strong>2</strong> = Mulai berkembang
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300">
            <strong>3</strong> = Cukup berkembang
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300">
            <strong>4</strong> = Baik
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300">
            <strong>5</strong> = Sangat baik
          </div>
        </div>
      </div>

      {/* Indicators List */}
      <div className="space-y-4">
        {currentDim.indicators.map((ind, idx) => {
          const currentAns = assessment.answers[ind.id];
          const score = currentAns?.score || 0;
          const consistency = currentAns?.consistency;

          return (
            <div
              key={ind.id}
              className={`p-5 rounded-3xl border transition ${
                score > 0
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900/50 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      Indikator {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mt-0.5">
                      {ind.text}
                    </h4>
                    {ind.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {ind.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Score Selector Buttons (1 to 5) */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Pilih Tingkat Keterlaksanaan:
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = score === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleScoreChange(ind.id, val)}
                          className={`py-2.5 rounded-xl font-bold text-xs transition flex flex-col items-center justify-center gap-0.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className="text-sm">{val}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consistency Level Dropdown (Prompt E Requirement) */}
                {ind.hasConsistencyOption && score > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">
                      Tingkat Konsistensi Penerapan:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Sudah konsisten', 'Sudah tetapi belum konsisten', 'Baru mulai', 'Belum dilakukan'] as ConsistencyLevel[]).map((cOption) => {
                        const isConsActive = consistency === cOption;
                        return (
                          <button
                            key={cOption}
                            type="button"
                            onClick={() => handleConsistencyChange(ind.id, cOption)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                              isConsActive
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            {cOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Reflective Questions Section (Prompt F Requirement) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Pertanyaan Reflektif Dimensi {currentDim.id}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Uraikan pengalaman nyata Anda secara singkat untuk membantu sistem mengidentifikasi akar penyebab dan merekomendasikan solusi paling tepat.
        </p>

        <div className="space-y-4 text-xs">
          
          {/* Q1 */}
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
              1. Apa yang paling sulit Anda lakukan dalam aspek ini?
            </label>
            <textarea
              rows={2}
              value={currentReflections.q1_difficulties}
              onChange={(e) => handleReflectionTextChange('q1_difficulties', e.target.value)}
              placeholder="Contoh: Menyesuaikan modul ajar untuk anak yang belum lancar membaca..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Q2 */}
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
              2. Mengapa hal tersebut sulit dilakukan?
            </label>
            <textarea
              rows={2}
              value={currentReflections.q2_reasons}
              onChange={(e) => handleReflectionTextChange('q2_reasons', e.target.value)}
              placeholder="Contoh: Keterbatasan waktu mengoreksi hasil asesmen formatif secara individual..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Q3 */}
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
              3. Apa yang selama ini sudah Anda lakukan?
            </label>
            <textarea
              rows={2}
              value={currentReflections.q3_current_efforts}
              onChange={(e) => handleReflectionTextChange('q3_current_efforts', e.target.value)}
              placeholder="Contoh: Menggunakan tiket keluar (exit ticket) dan kuis singkat di akhir kelas..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Q4 */}
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
              4. Apa yang menurut Anda perlu diperbaiki?
            </label>
            <textarea
              rows={2}
              value={currentReflections.q4_needed_improvements}
              onChange={(e) => handleReflectionTextChange('q4_needed_improvements', e.target.value)}
              placeholder="Contoh: Perlu menyusun rubrik penilaian yang lebih simpel dan transparan..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Q5 */}
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
              5. Dukungan apa yang Anda butuhkan?
            </label>
            <textarea
              rows={2}
              value={currentReflections.q5_needed_support}
              onChange={(e) => handleReflectionTextChange('q5_needed_support', e.target.value)}
              placeholder="Contoh: Pelatihan pembuatan instrumen asesmen diagnostik & pendampingan pengawas..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        
        <button
          type="button"
          disabled={activeDimensionIndex === 0}
          onClick={() => setActiveDimensionIndex((prev) => Math.max(0, prev - 1))}
          className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {activeDimensionIndex < DIMENSIONS_DATA.length - 1 ? (
          <button
            type="button"
            onClick={() => setActiveDimensionIndex((prev) => Math.min(DIMENSIONS_DATA.length - 1, prev + 1))}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <span>Dimensi Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onCompleteAssessment}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>SELESAI & HAPUSKAN HASIL ANALISIS</span>
          </button>
        )}

      </div>

    </div>
  );
};
