import React, { useState, useEffect } from 'react';
import { 
  TeacherProfile, 
  AssessmentRecord, 
  ImprovementActionItem, 
  ActionStatus, 
  ConsistencyLevel, 
  ReflectionAnswer,
  FindingItem 
} from './types';
import { SAMPLE_PROFILES, SAMPLE_ASSESSMENT_1, SAMPLE_ACTION_PLAN } from './data/sampleData';
import { DIMENSIONS_DATA } from './data/dimensionsData';
import { calculateAssessmentSummary, generateFindingsAndCauses } from './utils/analysisEngine';

import { Header } from './components/Header';
import { SidebarNav, NavTab } from './components/SidebarNav';
import { LandingPage } from './components/LandingPage';
import { InfoModals } from './components/InfoModals';
import { ProfileForm } from './components/ProfileForm';
import { SelfAssessmentView } from './components/SelfAssessmentView';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { FindingsView } from './components/FindingsView';
import { PrioritiesView } from './components/PrioritiesView';
import { ImprovementPlanView } from './components/ImprovementPlanView';
import { ProgressView } from './components/ProgressView';
import { ReassessmentView } from './components/ReassessmentView';
import { SupervisorView } from './components/SupervisorView';
import { ReportView } from './components/ReportView';
import { SettingsView } from './components/SettingsView';

import { 
  Award, 
  AlertTriangle, 
  Target, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  BookOpen, 
  Search, 
  FileText,
  UserCheck
} from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'guru_self_analysis_profile_v2',
  ASSESSMENT: 'guru_self_analysis_assessment_v2',
  ACTION_PLAN: 'guru_self_analysis_action_plan_v2',
  REASSESSMENT: 'guru_self_analysis_reassessment_v2',
  DARK_MODE: 'guru_self_analysis_theme_v2'
};

export default function App() {
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEYS.PROFILE);
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [viewMode, setViewMode] = useState<'Individu' | 'Pengawas'>('Individu');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'petunjuk' | 'tentang' | 'privasi' | null>(null);

  // Profile State
  const [profile, setProfile] = useState<TeacherProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_PROFILES[0];
  });

  // Assessment State
  const [assessment, setAssessment] = useState<AssessmentRecord>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSESSMENT);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_ASSESSMENT_1;
  });

  // Action Plan State
  const [actionPlan, setActionPlan] = useState<ImprovementActionItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTION_PLAN);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_ACTION_PLAN;
  });

  // Reassessment State
  const [reassessment, setReassessment] = useState<AssessmentRecord | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REASSESSMENT);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  // Sync Dark Mode class
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (darkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode ? 'true' : 'false');
  }, [darkMode]);

  // Sync Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(assessment));
  }, [assessment]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTION_PLAN, JSON.stringify(actionPlan));
  }, [actionPlan]);

  useEffect(() => {
    if (reassessment) {
      localStorage.setItem(STORAGE_KEYS.REASSESSMENT, JSON.stringify(reassessment));
    } else {
      localStorage.removeItem(STORAGE_KEYS.REASSESSMENT);
    }
  }, [reassessment]);

  // Derived Calculations
  const summary = calculateAssessmentSummary(assessment);
  const findings = generateFindingsAndCauses(assessment, summary);

  const totalIndicators = DIMENSIONS_DATA.reduce((acc, d) => acc + d.indicators.length, 0);
  const answeredCount = Object.keys(assessment.answers).length;
  const assessmentProgressPercent = Math.round((answeredCount / totalIndicators) * 100);

  // Handlers
  const handleUpdateAnswer = (indicatorId: string, score: number, consistency?: ConsistencyLevel) => {
    setAssessment((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [indicatorId]: { indicatorId, score, consistency }
      }
    }));
  };

  const handleUpdateReflection = (dimensionId: number, reflections: ReflectionAnswer) => {
    setAssessment((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [dimensionId]: reflections
      }
    }));
  };

  const handleAddCustomAction = (actionItem: Omit<ImprovementActionItem, 'id' | 'createdAt'>) => {
    const newItem: ImprovementActionItem = {
      ...actionItem,
      id: `act_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setActionPlan((prev) => [newItem, ...prev]);
  };

  const handleAddFindingToActionPlan = (finding: FindingItem) => {
    const exists = actionPlan.some((a) => a.dimensionTitle === finding.dimensionTitle);
    if (!exists) {
      const newItem: ImprovementActionItem = {
        id: `act_${Date.now()}`,
        teacherId: profile.id,
        priorityLevel: 'Tinggi',
        problem: finding.findingTitle,
        dimensionTitle: finding.dimensionTitle,
        action: finding.recommendedActions.join('; '),
        targetOutcome: finding.successIndicator,
        timeframe: `${finding.targetTimeWeeks} Minggu`,
        status: 'Sedang dilakukan',
        progressPercent: 20,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setActionPlan((prev) => [newItem, ...prev]);
      alert(`Aksi perbaikan untuk "${finding.dimensionTitle}" berhasil ditambahkan ke Rencana Tindak Lanjut!`);
    } else {
      alert(`Aksi perbaikan untuk "${finding.dimensionTitle}" sudah ada di Rencana Tindak Lanjut.`);
    }
  };

  const handleUpdateActionStatus = (actionId: string, status: ActionStatus, progressPercent: number, notes?: string) => {
    setActionPlan((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status, progressPercent, notes } : a))
    );
  };

  const handleDeleteAction = (actionId: string) => {
    setActionPlan((prev) => prev.filter((a) => a.id !== actionId));
  };

  const handleLoadSample = (sampleIndex: number = 0) => {
    const targetProf = SAMPLE_PROFILES[sampleIndex] || SAMPLE_PROFILES[0];
    setProfile(targetProf);
    setAssessment(SAMPLE_ASSESSMENT_1);
    setActionPlan(SAMPLE_ACTION_PLAN);
    setReassessment(null);
    setHasStarted(true);
    setActiveTab('dashboard');
  };

  const handleResetAllData = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan seluruh data aplikasi?')) {
      localStorage.clear();
      setProfile(SAMPLE_PROFILES[0]);
      setAssessment({
        id: 'assess_new',
        teacherId: 'teacher_new',
        assessmentDate: new Date().toISOString().split('T')[0],
        answers: {},
        reflections: {},
        isCompleted: false
      });
      setActionPlan([]);
      setReassessment(null);
      setHasStarted(false);
      setActiveTab('dashboard');
    }
  };

  const handleExportJSON = () => {
    const fullBackup = {
      profile,
      assessment,
      actionPlan,
      reassessment,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Backup_GuruSelfAnalysis_${profile.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (json: any) => {
    if (json.profile && json.assessment) {
      setProfile(json.profile);
      setAssessment(json.assessment);
      if (json.actionPlan) setActionPlan(json.actionPlan);
      if (json.reassessment) setReassessment(json.reassessment);
      setHasStarted(true);
      alert('Data berhasil dipulihkan!');
    } else {
      alert('Format file JSON backup tidak sesuai.');
    }
  };

  // If user hasn't clicked "MULAI ANALISIS DIRI" or loaded profile, show Landing Page
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
        <Header
          currentProfile={profile}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenMobileMenu={() => {}}
          onSelectSample={() => handleLoadSample(0)}
          onReset={handleResetAllData}
          viewMode={viewMode}
          onSwitchViewMode={(mode) => setViewMode(mode)}
        />
        <LandingPage
          onStart={() => {
            setHasStarted(true);
            setActiveTab('profil');
          }}
          onOpenInfo={(type) => setInfoModalType(type)}
          onLoadSample={() => handleLoadSample(0)}
        />
        <InfoModals type={infoModalType} onClose={() => setInfoModalType(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors flex flex-col">
      
      {/* Top Navigation Header */}
      <Header
        currentProfile={profile}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onSelectSample={() => handleLoadSample(0)}
        onReset={handleResetAllData}
        viewMode={viewMode}
        onSwitchViewMode={(mode) => {
          setViewMode(mode);
          if (mode === 'Pengawas') setActiveTab('pengawas');
          else setActiveTab('dashboard');
        }}
      />

      {/* Main Layout: Sidebar + View Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Sidebar Nav */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          assessmentCompleted={assessmentProgressPercent === 100}
          progressPercent={assessmentProgressPercent}
        />

        {/* View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* TAB 1: DASHBOARD UTAMA */}
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Welcome Banner */}
              <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      Selamat Datang, {profile.name}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                      Dashboard Analisis Diri Guru
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      {profile.school} • {profile.subjectOrClass} • Jenjang {profile.educationalLevel}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('analisis_diri')}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition shadow-sm flex items-center gap-2 shrink-0 border border-blue-500"
                  >
                    <Brain className="w-4 h-4 text-white" />
                    <span>{answeredCount > 0 ? 'Lanjutkan Asesmen Diri' : 'Mulai Asesmen 10 Dimensi'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                
                {/* Metric 1: TOTAL SKOR */}
                <div 
                  onClick={() => setActiveTab('hasil_analisis')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs hover:border-blue-500 cursor-pointer transition space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL SKOR</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {summary.overallScore} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block truncate">
                    {summary.overallCategory}
                  </span>
                </div>

                {/* Metric 2: KEKUATAN */}
                <div 
                  onClick={() => setActiveTab('hasil_analisis')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-r-xl p-3.5 shadow-xs hover:border-emerald-500 cursor-pointer transition space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">KEKUATAN</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {summary.strongestDimensions[0]?.dimensionTitle || 'Pengelolaan Kelas'}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block">
                    Skor: {summary.strongestDimensions[0]?.score}
                  </span>
                </div>

                {/* Metric 3: AREA PERBAIKAN */}
                <div 
                  onClick={() => setActiveTab('temuan')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 rounded-r-xl p-3.5 shadow-xs hover:border-amber-500 cursor-pointer transition space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">AREA PERBAIKAN</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {summary.weakestDimensions[0]?.dimensionTitle || 'Asesmen Pembelajaran'}
                  </div>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 block">
                    Skor: {summary.weakestDimensions[0]?.score}
                  </span>
                </div>

                {/* Metric 4: PRIORITAS */}
                <div 
                  onClick={() => setActiveTab('prioritas')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-500 rounded-r-xl p-3.5 shadow-xs hover:border-rose-500 cursor-pointer transition space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">PRIORITAS</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {summary.gapAnalysis[0]?.title}
                  </div>
                  <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 block">
                    Gap: {summary.gapAnalysis[0]?.gap}
                  </span>
                </div>

                {/* Metric 5: PROGRESS */}
                <div 
                  onClick={() => setActiveTab('progress')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs hover:border-indigo-500 cursor-pointer transition space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">PROGRESS</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {actionPlan.length > 0
                      ? Math.round(actionPlan.reduce((acc, a) => acc + a.progressPercent, 0) / actionPlan.length)
                      : 0}%
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 block truncate">
                    {actionPlan.filter((a) => a.status === 'Selesai').length} Aksi Selesai
                  </span>
                </div>

              </div>

              {/* Quick Action Navigation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div 
                  onClick={() => setActiveTab('analisis_diri')}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition cursor-pointer space-y-2.5"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      1. Isi Asesmen Refleksi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Refleksikan 10 dimensi kompetensi dengan skala 1-5 dan pertanyaan terbuka.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('hasil_analisis')}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition cursor-pointer space-y-2.5"
                >
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg w-fit">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      2. Lihat Radar Chart & Prioritas
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Visualisasikan kekuatan, kelemahan, dan matriks prioritas perbaikan.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('rencana_tindak_lanjut')}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition cursor-pointer space-y-2.5"
                >
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      3. Rencana Tindak Lanjut
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Eksekusi rencana aksi nyata, pantau progress %, dan lakukan re-assessment.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PROFIL GURU */}
          {activeTab === 'profil' && (
            <ProfileForm
              profile={profile}
              onSaveProfile={(updated) => setProfile(updated)}
              onContinueToAssessment={() => setActiveTab('analisis_diri')}
            />
          )}

          {/* TAB 3: ANALISIS DIRI */}
          {activeTab === 'analisis_diri' && (
            <SelfAssessmentView
              assessment={assessment}
              onUpdateAnswer={handleUpdateAnswer}
              onUpdateReflection={handleUpdateReflection}
              onCompleteAssessment={() => setActiveTab('hasil_analisis')}
            />
          )}

          {/* TAB 4: HASIL ANALISIS */}
          {activeTab === 'hasil_analisis' && (
            <AnalysisResultsView
              summary={summary}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* TAB 5: TEMUAN */}
          {activeTab === 'temuan' && (
            <FindingsView
              findings={findings}
              onAddToActionPlan={handleAddFindingToActionPlan}
              onNavigateToPlan={() => setActiveTab('rencana_tindak_lanjut')}
            />
          )}

          {/* TAB 6: PRIORITAS */}
          {activeTab === 'prioritas' && (
            <PrioritiesView
              summary={summary}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* TAB 7: RENCANA TINDAK LANJUT */}
          {activeTab === 'rencana_tindak_lanjut' && (
            <ImprovementPlanView
              actionPlan={actionPlan}
              onUpdateActionStatus={handleUpdateActionStatus}
              onAddCustomAction={handleAddCustomAction}
              onDeleteAction={handleDeleteAction}
            />
          )}

          {/* TAB 8: PROGRESS */}
          {activeTab === 'progress' && (
            <ProgressView actionPlan={actionPlan} />
          )}

          {/* TAB 9: REASSESSMENT */}
          {activeTab === 'reassessment' && (
            <ReassessmentView
              initialAssessment={assessment}
              reassessment={reassessment}
              onStartReassessment={() => {
                const newAssess: AssessmentRecord = {
                  ...assessment,
                  id: `reassess_${Date.now()}`,
                  assessmentDate: new Date().toISOString().split('T')[0]
                };
                setReassessment(newAssess);
                alert('Sesi Asesmen Ulang dimulai! Silakan perbarui jawaban pada menu Analisis Diri.');
                setActiveTab('analisis_diri');
              }}
            />
          )}

          {/* TAB 10: PENGAWAS */}
          {activeTab === 'pengawas' && (
            <SupervisorView
              teachers={[profile, ...SAMPLE_PROFILES.slice(1)]}
              assessments={[assessment, SAMPLE_ASSESSMENT_1]}
              onSelectTeacherForDetail={(id) => {
                const selectedProf = [profile, ...SAMPLE_PROFILES].find((t) => t.id === id);
                if (selectedProf) setProfile(selectedProf);
                setActiveTab('hasil_analisis');
              }}
            />
          )}

          {/* TAB 11: LAPORAN */}
          {activeTab === 'laporan' && (
            <ReportView
              profile={profile}
              summary={summary}
              findings={findings}
              actionPlan={actionPlan}
              reassessment={reassessment}
              onUpdateProfile={(updated) => setProfile(updated)}
            />
          )}

          {/* TAB 12: PENGATURAN */}
          {activeTab === 'pengaturan' && (
            <SettingsView
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onResetAllData={handleResetAllData}
              onExportJSON={handleExportJSON}
              onImportJSON={handleImportJSON}
              onLoadSampleData={handleLoadSample}
            />
          )}

        </main>

      </div>

      {/* Info Modals */}
      <InfoModals type={infoModalType} onClose={() => setInfoModalType(null)} />

    </div>
  );
}
