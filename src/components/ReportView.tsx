import React from 'react';
import { TeacherProfile, AnalysisSummary, FindingItem, ImprovementActionItem, AssessmentRecord } from '../types';
import { printReport, exportToPDF, exportToWord, exportToExcel, formatReportDate } from '../utils/exportUtils';
import { Printer, Download, FileSpreadsheet, FileText, FileCode2, Sparkles, Building, User, FileDown, Calendar } from 'lucide-react';

interface ReportViewProps {
  profile: TeacherProfile;
  summary: AnalysisSummary;
  findings: FindingItem[];
  actionPlan: ImprovementActionItem[];
  reassessment: AssessmentRecord | null;
  onUpdateProfile?: (updated: TeacherProfile) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  profile,
  summary,
  findings,
  actionPlan,
  reassessment,
  onUpdateProfile
}) => {
  const [showInputPanel, setShowInputPanel] = React.useState(false);
  const [localProfile, setLocalProfile] = React.useState<TeacherProfile>(profile);

  React.useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleProfileFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...localProfile,
      [name]: value,
      updatedAt: new Date().toISOString()
    };
    setLocalProfile(updated);
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
  };

  const handlePrint = () => {
    printReport();
  };

  const handleDownloadPDF = () => {
    exportToPDF();
  };

  const handleDownloadWord = () => {
    exportToWord(localProfile, summary, findings, actionPlan, reassessment);
  };

  const handleExportExcel = () => {
    exportToExcel(localProfile, summary, findings);
  };

  const dateFormatted = formatReportDate(localProfile.reportDate);
  const reportPlaceDisplay = localProfile.reportPlace || localProfile.regency || 'Tempat';

  const handleSetTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const updated = {
      ...localProfile,
      reportDate: today,
      updatedAt: new Date().toISOString()
    };
    setLocalProfile(updated);
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Controls Bar (Hidden during print) */}
      <div className="print:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Ekspor & Cetak Laporan</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Laporan Hasil Analisis Diri & Pengembangan Guru
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Unduh dokumen resmi dalam format PDF, Word, Excel, atau cetak fisik dokumen.
          </p>
        </div>

        {/* Action Buttons: Input Signatures, Download PDF, Download Word, Cetak, Export Excel */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tombol Toggle Input Pejabat */}
          <button
            onClick={() => setShowInputPanel(!showInputPanel)}
            className="px-3.5 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs hover:bg-indigo-100 transition flex items-center gap-1.5 cursor-pointer"
            title="Isi nama/NIP Kepala Sekolah, Pengawas, & Tanggal Laporan"
          >
            <User className="w-4 h-4" />
            <span>{showInputPanel ? 'Sembunyikan Input TTD' : 'Input TTD Kepsek & Pengawas'}</span>
          </button>

          {/* Tombol Input Tanggal Laporan */}
          <button
            onClick={() => setShowInputPanel(true)}
            className="px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs hover:bg-emerald-100 transition flex items-center gap-1.5 cursor-pointer"
            title="Atur tanggal penulisan laporan"
          >
            <Calendar className="w-4 h-4" />
            <span>Input Tanggal Laporan</span>
          </button>

          {/* Tombol Cetak */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition flex items-center gap-2 shadow-xs cursor-pointer"
            title="Cetak fisik dokumen atau pratinjau"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak</span>
          </button>

          {/* Tombol Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition flex items-center gap-2 shadow-xs cursor-pointer"
            title="Unduh laporan dalam format PDF"
          >
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </button>

          {/* Tombol Download Word */}
          <button
            onClick={handleDownloadWord}
            className="px-3.5 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center gap-2 shadow-xs cursor-pointer"
            title="Unduh dokumen Microsoft Word (.doc)"
          >
            <FileDown className="w-4 h-4" />
            <span>Word (.doc)</span>
          </button>

          {/* Tombol Export Excel */}
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center gap-2 shadow-xs cursor-pointer"
            title="Unduh data dalam format Spreadsheet Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Input Panel for Kepala Sekolah & Pengawas Sekolah (Hidden during print) */}
      {(showInputPanel || (!localProfile.principalName && !localProfile.supervisorName)) && (
        <div className="print:hidden bg-blue-50/70 dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Input Data Penandatangan (Kepala Sekolah & Pengawas)
              </h3>
            </div>
            <button
              onClick={() => setShowInputPanel(false)}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium"
            >
              Tutup Panel Input
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Ketik nama & NIP Kepala Sekolah serta Pengawas Sekolah di bawah ini. Hasilnya akan langsung tercantum pada lembar tanda tangan dan file dokumen saat diunduh.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Field Kepala Sekolah */}
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span className="font-bold text-blue-700 dark:text-blue-300 text-[11px] uppercase tracking-wider block">
                1. Kepala Sekolah
              </span>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kepala Sekolah & Gelar
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={localProfile.principalName || ''}
                  onChange={handleProfileFieldChange}
                  placeholder="Contoh: Drs. H. Bambang Suryono, M.Pd."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  name="principalNip"
                  value={localProfile.principalNip || ''}
                  onChange={handleProfileFieldChange}
                  placeholder="197108151998021002"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Field Pengawas Sekolah */}
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 text-[11px] uppercase tracking-wider block">
                2. Pengawas Sekolah / Pembina
              </span>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Pengawas Sekolah & Gelar
                </label>
                <input
                  type="text"
                  name="supervisorName"
                  value={localProfile.supervisorName || ''}
                  onChange={handleProfileFieldChange}
                  placeholder="Contoh: Dra. Hj. Endang Sri Wahyuni, M.Si."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  NIP Pengawas Sekolah
                </label>
                <input
                  type="text"
                  name="supervisorNip"
                  value={localProfile.supervisorNip || ''}
                  onChange={handleProfileFieldChange}
                  placeholder="196804121994032001"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Field Tanggal & Tempat Penulisan Laporan */}
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 text-[11px] uppercase tracking-wider block">
                3. Tempat & Tanggal Laporan
              </span>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tempat / Kota Penulisan Laporan
                </label>
                <input
                  type="text"
                  name="reportPlace"
                  value={localProfile.reportPlace || ''}
                  onChange={handleProfileFieldChange}
                  placeholder="Contoh: Jakarta Pusat, Bandung, dll."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Pilih Tanggal Dokumen
                </label>
                <input
                  type="date"
                  name="reportDate"
                  value={localProfile.reportDate || ''}
                  onChange={handleProfileFieldChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleSetTodayDate}
                  className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold text-[11px] hover:bg-emerald-200 transition cursor-pointer"
                >
                  Gunakan Hari Ini
                </button>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {reportPlaceDisplay}, {dateFormatted}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Document Container */}
      <div id="printable-report" className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-200 space-y-8 text-xs leading-relaxed print:p-0 print:border-none print:shadow-none print:rounded-none">
        
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            LAPORAN HASIL ANALISIS DIRI & RENCANA PERBAIKAN GURU
          </h1>
          <p className="text-sm font-bold text-blue-700">
            GURU SELF-ANALYSIS & IMPROVEMENT DASHBOARD
          </p>
          <p className="text-[11px] text-slate-500">
            Tanggal Dokumen: {dateFormatted}
          </p>
        </div>

        {/* 1. Identitas Guru (Prompt P Requirement) */}
        <section className="space-y-3">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            1. IDENTITAS GURU
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div><strong>Nama Lengkap:</strong> {profile.name}</div>
            <div><strong>NIP/NUPTK:</strong> {profile.nipNuptk || '-'}</div>
            <div><strong>Sekolah:</strong> {profile.school}</div>
            <div><strong>Kecamatan:</strong> {profile.district}</div>
            <div><strong>Kabupaten/Kota:</strong> {profile.regency}</div>
            <div><strong>Jenjang:</strong> {profile.educationalLevel}</div>
            <div><strong>Mapel / Kelas:</strong> {profile.subjectOrClass}</div>
            <div><strong>Lama Mengajar:</strong> {profile.teachingExperienceYears} Tahun</div>
            <div><strong>Status Kepegawaian:</strong> {profile.employmentStatus}</div>
            <div><strong>Tahun Asesmen:</strong> {profile.assessmentYear}</div>
            <div><strong>Mode Analisis:</strong> {profile.analysisMode}</div>
          </div>
        </section>

        {/* 2. Ringkasan Hasil */}
        <section className="space-y-3">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            2. RINGKASAN HASIL ASESMEN
          </h2>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-blue-900">Skor Keseluruhan Kompetensi</p>
              <p className="text-xs text-blue-700">Kategori: <strong>{summary.overallCategory}</strong></p>
            </div>
            <div className="text-3xl font-black text-blue-800">
              {summary.overallScore} / 5.00
            </div>
          </div>
        </section>

        {/* 3. Profil Kompetensi (10 Dimensi) */}
        <section className="space-y-3">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            3. PROFIL KOMPETENSI 10 DIMENSI
          </h2>
          <table className="w-full text-left border border-slate-300">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="p-2 border border-slate-300">No</th>
                <th className="p-2 border border-slate-300">Dimensi Kompetensi</th>
                <th className="p-2 border border-slate-300 text-center">Skor</th>
                <th className="p-2 border border-slate-300 text-center">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {summary.dimensionScores.map((d) => (
                <tr key={d.dimensionId}>
                  <td className="p-2 border border-slate-300 font-bold">D{d.dimensionId}</td>
                  <td className="p-2 border border-slate-300 font-semibold">{d.dimensionTitle}</td>
                  <td className="p-2 border border-slate-300 text-center font-bold">{d.score}</td>
                  <td className="p-2 border border-slate-300 text-center">{d.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 4. Kekuatan */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            4. KEKUATAN UTAMA
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {summary.strongestDimensions.map((sd) => (
              <li key={sd.dimensionId}>
                <strong>{sd.dimensionTitle}:</strong> Skor {sd.score} / 5.00 ({sd.category})
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Area yang Perlu Diperbaiki */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            5. AREA YANG PERLU DIPERBAIKI
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {summary.weakestDimensions.map((wd) => (
              <li key={wd.dimensionId}>
                <strong>{wd.dimensionTitle}:</strong> Skor {wd.score} / 5.00 ({wd.category})
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Analisis Kesenjangan & 7. Prioritas */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            6. ANALISIS KESENJANGAN & 7. PRIORITAS PERBAIKAN
          </h2>
          <table className="w-full text-left border border-slate-300">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="p-2 border border-slate-300">Dimensi</th>
                <th className="p-2 border border-slate-300 text-center">Skor</th>
                <th className="p-2 border border-slate-300 text-center">Gap</th>
                <th className="p-2 border border-slate-300 text-center">Tingkat Prioritas</th>
              </tr>
            </thead>
            <tbody>
              {summary.gapAnalysis.map((g) => (
                <tr key={g.dimensionId}>
                  <td className="p-2 border border-slate-300 font-semibold">{g.title}</td>
                  <td className="p-2 border border-slate-300 text-center">{g.score}</td>
                  <td className="p-2 border border-slate-300 text-center">{g.gap}</td>
                  <td className="p-2 border border-slate-300 text-center font-bold">{g.priorityLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 8. Rekomendasi */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            8. REKOMENDASI TINDAKAN
          </h2>
          <div className="space-y-3">
            {findings.map((f, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold">Dimensi: {f.dimensionTitle} (Skor: {f.score})</p>
                <p><strong>Masalah:</strong> {f.findingTitle}</p>
                <p><strong>Rekomendasi Aksi:</strong> {f.recommendedActions.join('; ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Rencana Tindak Lanjut, 10. Target & 11. Monitoring */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            9. RENCANA TINDAK LANJUT, 10. TARGET & 11. MONITORING
          </h2>
          <table className="w-full text-left border border-slate-300">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="p-2 border border-slate-300">Prioritas</th>
                <th className="p-2 border border-slate-300">Masalah</th>
                <th className="p-2 border border-slate-300">Tindakan</th>
                <th className="p-2 border border-slate-300">Target & Waktu</th>
                <th className="p-2 border border-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {actionPlan.map((act) => (
                <tr key={act.id}>
                  <td className="p-2 border border-slate-300 font-bold">{act.priorityLevel}</td>
                  <td className="p-2 border border-slate-300">{act.problem}</td>
                  <td className="p-2 border border-slate-300">{act.action}</td>
                  <td className="p-2 border border-slate-300">{act.timeframe} ({act.targetOutcome})</td>
                  <td className="p-2 border border-slate-300 font-bold">{act.status} ({act.progressPercent}%)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 12. Hasil Re-Assessment */}
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase border-b border-slate-300 pb-1 text-slate-800">
            12. HASIL RE-ASSESSMENT (PEMANTAUAN PERKEMBANGAN)
          </h2>
          <p>
            {reassessment 
              ? `Asesmen ulang telah dilaksanakan pada tanggal ${reassessment.assessmentDate}. Terjadi perkembangan yang terdokumentasi dalam sistem.`
              : 'Asesmen ulang belum dilaksanakan. Rencana perbaikan sedang dalam proses implementasi di kelas.'}
          </p>
        </section>

        {/* Signatures (3 Separated Columns) */}
        <div className="pt-8 border-t border-slate-300">
          <p className="font-bold text-center uppercase tracking-wider text-[11px] text-slate-700 mb-6">
            LEMBAR PENGESAHAN & KOMITMEN
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            {/* Kepala Sekolah */}
            <div className="flex flex-col justify-between items-center h-44 p-2 bg-slate-50/50 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none">
              <div>
                <p className="text-slate-600">Mengetahui,</p>
                <p className="font-bold text-slate-900">Kepala Sekolah {localProfile.school}</p>
              </div>
              <div className="w-full">
                <p className="font-bold text-slate-900 underline decoration-slate-400 underline-offset-2">
                  {localProfile.principalName || '(..........................................................)'}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  NIP. {localProfile.principalNip || '.....................................'}
                </p>
              </div>
            </div>

            {/* Pengawas Sekolah */}
            <div className="flex flex-col justify-between items-center h-44 p-2 bg-slate-50/50 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none">
              <div>
                <p className="text-slate-600">Menyetujui,</p>
                <p className="font-bold text-slate-900">Pengawas Sekolah / Pembina</p>
              </div>
              <div className="w-full">
                <p className="font-bold text-slate-900 underline decoration-slate-400 underline-offset-2">
                  {localProfile.supervisorName || '(..........................................................)'}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  NIP. {localProfile.supervisorNip || '.....................................'}
                </p>
              </div>
            </div>

            {/* Guru Bersangkutan */}
            <div className="flex flex-col justify-between items-center h-44 p-2 bg-slate-50/50 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none">
              <div>
                <p className="text-slate-600">{reportPlaceDisplay}, {dateFormatted}</p>
                <p className="font-bold text-slate-900">Guru Bersangkutan</p>
              </div>
              <div className="w-full">
                <p className="font-bold text-slate-900 underline decoration-slate-400 underline-offset-2">
                  {localProfile.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  NIP. {localProfile.nipNuptk || '.....................................'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Floating Export Action Bar */}
      <div className="print:hidden bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="text-xs">
          <p className="font-bold text-slate-100">Dokumen Siap Diunduh & Dicetak</p>
          <p className="text-[11px] text-slate-400">Pilih format unduhan sesuai kebutuhan administrasi Anda.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
          <button
            onClick={handleDownloadWord}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Word (.doc)</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel (.xlsx)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
