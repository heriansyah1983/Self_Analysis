import React, { useState } from 'react';
import { ImprovementActionItem, ActionStatus, PriorityLevel } from '../types';
import { 
  FileSpreadsheet, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  TrendingUp,
  X,
  Edit2
} from 'lucide-react';

interface ImprovementPlanViewProps {
  actionPlan: ImprovementActionItem[];
  onUpdateActionStatus: (actionId: string, status: ActionStatus, progressPercent: number, notes?: string) => void;
  onAddCustomAction: (action: Omit<ImprovementActionItem, 'id' | 'createdAt'>) => void;
  onDeleteAction: (actionId: string) => void;
}

export const ImprovementPlanView: React.FC<ImprovementPlanViewProps> = ({
  actionPlan,
  onUpdateActionStatus,
  onAddCustomAction,
  onDeleteAction
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPriority, setNewPriority] = useState<PriorityLevel>('Tinggi');
  const [newProblem, setNewProblem] = useState('');
  const [newDimTitle, setNewDimTitle] = useState('Asesmen Pembelajaran');
  const [newAction, setNewAction] = useState('');
  const [newTargetOutcome, setNewTargetOutcome] = useState('');
  const [newTimeframe, setNewTimeframe] = useState('2 Minggu');

  // Calculate Overall Improvement Progress %
  const totalActions = actionPlan.length;
  const totalProgressSum = actionPlan.reduce((acc, a) => acc + a.progressPercent, 0);
  const overallProgressPercent = totalActions > 0 ? Math.round(totalProgressSum / totalActions) : 0;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblem || !newAction) return;

    onAddCustomAction({
      teacherId: 'current',
      priorityLevel: newPriority,
      problem: newProblem,
      dimensionTitle: newDimTitle,
      action: newAction,
      targetOutcome: newTargetOutcome || 'Tersusunnya bukti perbaikan di kelas.',
      timeframe: newTimeframe,
      status: 'Belum dimulai',
      progressPercent: 0
    });

    setNewProblem('');
    setNewAction('');
    setNewTargetOutcome('');
    setShowAddModal(false);
  };

  const getStatusBadge = (status: ActionStatus) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Sedang dilakukan':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Belum dimulai':
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
      case 'Perlu tindak lanjut':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner with Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Personal Improvement Plan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Rencana Tindak Lanjut Perbaikan Guru
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Langkah-langkah aksi nyata yang dirancang khusus dari hasil refleksi diri Anda.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Aksi Perbaikan</span>
          </button>
        </div>

        {/* Progress Bar Display (Prompt K Requirement) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Kemajuan Perbaikan Keseluruhan:
            </span>
            <span className="text-sm font-bold text-emerald-400">{overallProgressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span>{actionPlan.filter((a) => a.status === 'Selesai').length} Selesai</span>
            <span>{actionPlan.filter((a) => a.status === 'Sedang dilakukan').length} Sedang Berjalan</span>
            <span>{actionPlan.filter((a) => a.status === 'Belum dimulai').length} Belum Dimulai</span>
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        {actionPlan.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs space-y-2">
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">Belum Ada Rencana Perbaikan</p>
            <p>Klik tombol "Tambah Aksi Perbaikan" atau gunakan rekomendasi dari menu Temuan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Prioritas</th>
                  <th className="p-3.5">Masalah / Dimensi</th>
                  <th className="p-3.5">Tindakan Perbaikan</th>
                  <th className="p-3.5">Target & Waktu</th>
                  <th className="p-3.5">Status & Progress</th>
                  <th className="p-3.5 rounded-r-xl text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {actionPlan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    
                    {/* Prioritas */}
                    <td className="p-3.5 align-top">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.priorityLevel === 'Tinggi'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : item.priorityLevel === 'Sedang'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {item.priorityLevel}
                      </span>
                    </td>

                    {/* Masalah */}
                    <td className="p-3.5 align-top max-w-[200px]">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        {item.dimensionTitle}
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                        {item.problem}
                      </p>
                    </td>

                    {/* Tindakan */}
                    <td className="p-3.5 align-top max-w-[240px]">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {item.action}
                      </p>
                    </td>

                    {/* Target & Waktu */}
                    <td className="p-3.5 align-top whitespace-nowrap">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        ⏱️ {item.timeframe}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block max-w-[140px] truncate">
                        {item.targetOutcome}
                      </span>
                    </td>

                    {/* Status & Progress Editor */}
                    <td className="p-3.5 align-top min-w-[180px]">
                      <div className="space-y-2">
                        {/* Status Select */}
                        <select
                          value={item.status}
                          onChange={(e) => {
                            const newSt = e.target.value as ActionStatus;
                            let newProg = item.progressPercent;
                            if (newSt === 'Selesai') newProg = 100;
                            else if (newSt === 'Belum dimulai') newProg = 0;
                            else if (newSt === 'Sedang dilakukan' && newProg === 0) newProg = 50;
                            onUpdateActionStatus(item.id, newSt, newProg, item.notes);
                          }}
                          className={`w-full px-2.5 py-1 rounded-xl text-xs font-bold border ${getStatusBadge(item.status)} focus:outline-none`}
                        >
                          <option value="Belum dimulai">Belum dimulai</option>
                          <option value="Sedang dilakukan">Sedang dilakukan</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Perlu tindak lanjut">Perlu tindak lanjut</option>
                        </select>

                        {/* Slider Progress */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                            <span>Progress</span>
                            <span className="font-bold">{item.progressPercent}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={10}
                            value={item.progressPercent}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              let st = item.status;
                              if (val === 100) st = 'Selesai';
                              else if (val === 0) st = 'Belum dimulai';
                              else st = 'Sedang dilakukan';
                              onUpdateActionStatus(item.id, st, val, item.notes);
                            }}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="p-3.5 align-top text-center">
                      <button
                        onClick={() => onDeleteAction(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                        title="Hapus aksi"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add Custom Action Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-500" />
                Tambah Rencana Perbaikan Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Prioritas</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Tinggi">Tinggi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Rendah">Rendah</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Masalah yang Dihadapi *</label>
                <input
                  type="text"
                  required
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="Contoh: Asesmen formatif belum terlaksana secara rutin..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tindakan Perbaikan *</label>
                <textarea
                  rows={2}
                  required
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="Contoh: Menyusun rubrik penilaian dan tiket keluar mingguan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target & Indikator</label>
                <input
                  type="text"
                  value={newTargetOutcome}
                  onChange={(e) => setNewTargetOutcome(e.target.value)}
                  placeholder="Contoh: Terwujudnya catatan evaluasi kelas mingguan."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Waktu</label>
                <select
                  value={newTimeframe}
                  onChange={(e) => setNewTimeframe(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="1 Minggu">1 Minggu</option>
                  <option value="2 Minggu">2 Minggu</option>
                  <option value="1 Bulan">1 Bulan</option>
                  <option value="2 Bulan">2 Bulan</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                >
                  Simpan Aksi
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
