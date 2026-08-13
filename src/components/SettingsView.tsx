import React, { useRef } from 'react';
import { Settings, Download, Upload, Trash2, Moon, Sun, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { TeacherProfile, AssessmentRecord, ImprovementActionItem } from '../types';

interface SettingsViewProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetAllData: () => void;
  onExportJSON: () => void;
  onImportJSON: (data: any) => void;
  onLoadSampleData: (sampleIndex: number) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  onToggleDarkMode,
  onResetAllData,
  onExportJSON,
  onImportJSON,
  onLoadSampleData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImportJSON(json);
      } catch (err) {
        alert('Format file JSON tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Pengaturan & Manajemen Data</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Pengaturan Aplikasi & Cadangan Data
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola tampilan, lakukan backup/restore data lokal, atau reset instrumen asesmen.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Tampilan & Tema */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {darkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-700" />}
            <span>Tema & Mode Tampilan</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pilih mode terang untuk pencetakan laporan atau mode gelap untuk kenyamanan mata.
          </p>
          <button
            onClick={onToggleDarkMode}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-2"
          >
            <span>Alihkan ke Mode {darkMode ? 'Terang (Light Mode)' : 'Gelap (Dark Mode)'}</span>
          </button>
        </div>

        {/* Card 2: Contoh Data Demo */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Muat Contoh Data Demo</span>
          </h3>
          <p className="text-xs text-slate-500">
            Isi aplikasi secara instan dengan profil dan hasil asesmen nyata untuk menguji fitur.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onLoadSampleData(0)}
              className="py-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold text-xs border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition"
            >
              Demo Guru SD
            </button>
            <button
              onClick={() => onLoadSampleData(1)}
              className="py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition"
            >
              Demo Guru SMP
            </button>
          </div>
        </div>

        {/* Card 3: Backup & Restore JSON */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Cadangkan & Pulihkan Data (JSON)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Unduh cadangan seluruh data asesmen Anda atau pulihkan dari file JSON yang telah di-backup.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onExportJSON}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor JSON</span>
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Impor JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Card 4: Reset Data */}
        <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>Kosongkan Seluruh Data</span>
          </h3>
          <p className="text-xs text-slate-500">
            Reset seluruh profil, jawaban asesmen, dan rencana perbaikan untuk memulai dari awal.
          </p>
          <button
            onClick={onResetAllData}
            className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Seluruh Data Aplikasi</span>
          </button>
        </div>

      </div>

    </div>
  );
};
