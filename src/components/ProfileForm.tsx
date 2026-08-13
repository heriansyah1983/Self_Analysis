import React, { useState } from 'react';
import { TeacherProfile } from '../types';
import { User, Building, MapPin, GraduationCap, Calendar, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/sampleData';

interface ProfileFormProps {
  profile: TeacherProfile;
  onSaveProfile: (profile: TeacherProfile) => void;
  onContinueToAssessment: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSaveProfile,
  onContinueToAssessment
}) => {
  const [formData, setFormData] = useState<TeacherProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'teachingExperienceYears' || name === 'assessmentYear' ? Number(value) : value
    }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      updatedAt: new Date().toISOString()
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSelectSample = (sample: TeacherProfile) => {
    setFormData(sample);
    onSaveProfile(sample);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Bagian 1 dari 2</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Identitas Profesional Guru
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Isi identitas Anda untuk personalisasi laporan dan rencana tindak lanjut perbaikan.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Pilih Contoh:</span>
          <button
            type="button"
            onClick={() => handleSelectSample(SAMPLE_PROFILES[0])}
            className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-medium hover:bg-blue-100 transition"
          >
            Guru SD
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample(SAMPLE_PROFILES[1])}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-medium hover:bg-indigo-100 transition"
          >
            Guru SMP
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Mode Selector Option (Prompt C requirement) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Pilih Mode Analisis
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, analysisMode: 'Individu' }))}
              className={`p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                formData.analysisMode === 'Individu'
                  ? 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.analysisMode === 'Individu' ? 'border-blue-600 bg-blue-600' : 'border-slate-400'
              }`}>
                {formData.analysisMode === 'Individu' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <p className="text-xs font-bold">Analisis Individu</p>
                <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">Refleksi mandiri untuk diri sendiri</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, analysisMode: 'Pendampingan Pengawas' }))}
              className={`p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                formData.analysisMode === 'Pendampingan Pengawas'
                  ? 'bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.analysisMode === 'Pendampingan Pengawas' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
              }`}>
                {formData.analysisMode === 'Pendampingan Pengawas' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <p className="text-xs font-bold">Pendampingan Pengawas</p>
                <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">Refleksi bersama pengawas sekolah</p>
              </div>
            </button>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          {/* Nama Guru */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nama Lengkap & Gelar *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Nurhayati, S.Pd."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* NIP/NUPTK */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              NIP / NUPTK <span className="text-slate-400 font-normal">(opsional)</span>
            </label>
            <input
              type="text"
              name="nipNuptk"
              value={formData.nipNuptk || ''}
              onChange={handleChange}
              placeholder="198805122014032001"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sekolah */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nama Sekolah / Satuan Pendidikan *
            </label>
            <input
              type="text"
              name="school"
              required
              value={formData.school}
              onChange={handleChange}
              placeholder="Contoh: SD Negeri 01 Menteng"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Jenjang */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Jenjang Pendidikan *
            </label>
            <select
              name="educationalLevel"
              value={formData.educationalLevel}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SD">SD (Sekolah Dasar)</option>
              <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
              <option value="SMA">SMA (Sekolah Menengah Atas)</option>
              <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
              <option value="SLB">SLB (Sekolah Luar Biasa)</option>
            </select>
          </div>

          {/* Kecamatan */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Kecamatan *
            </label>
            <input
              type="text"
              name="district"
              required
              value={formData.district}
              onChange={handleChange}
              placeholder="Menteng"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Kabupaten / Kota */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Kabupaten / Kota *
            </label>
            <input
              type="text"
              name="regency"
              required
              value={formData.regency}
              onChange={handleChange}
              placeholder="Jakarta Pusat"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mata Pelajaran / Kelas */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mata Pelajaran / Guru Kelas *
            </label>
            <input
              type="text"
              name="subjectOrClass"
              required
              value={formData.subjectOrClass}
              onChange={handleChange}
              placeholder="Guru Kelas V / Bahasa Indonesia / IPA"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lama Mengajar */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Lama Mengajar (Tahun) *
            </label>
            <input
              type="number"
              min={0}
              max={50}
              name="teachingExperienceYears"
              required
              value={formData.teachingExperienceYears}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Kepegawaian */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Status Kepegawaian *
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PNS">PNS</option>
              <option value="PPPK">PPPK</option>
              <option value="Guru Honorer / Tetap Yayasan">Guru Honorer / Tetap Yayasan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Tahun Asesmen */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tahun Asesmen *
            </label>
            <input
              type="number"
              name="assessmentYear"
              value={formData.assessmentYear}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Section: Data Pengesahan (Kepala Sekolah & Pengawas Sekolah) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Data Pengesahan Laporan (Kepala Sekolah & Pengawas Sekolah)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Nama dan NIP pejabat berikut akan tercantum secara otomatis pada lembar tanda tangan laporan resmi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Kepala Sekolah */}
            <div className="space-y-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-blue-700 dark:text-blue-300 block text-[11px] uppercase tracking-wider">
                1. Kepala Sekolah
              </span>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kepala Sekolah & Gelar
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={formData.principalName || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Drs. H. Bambang Suryono, M.Pd."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  name="principalNip"
                  value={formData.principalNip || ''}
                  onChange={handleChange}
                  placeholder="197108151998021002"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Pengawas Sekolah */}
            <div className="space-y-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block text-[11px] uppercase tracking-wider">
                2. Pengawas Sekolah / Pembina
              </span>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nama Pengawas Sekolah & Gelar
                </label>
                <input
                  type="text"
                  name="supervisorName"
                  value={formData.supervisorName || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Dra. Hj. Endang Sri Wahyuni, M.Si."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  NIP Pengawas Sekolah
                </label>
                <input
                  type="text"
                  name="supervisorNip"
                  value={formData.supervisorNip || ''}
                  onChange={handleChange}
                  placeholder="196804121994032001"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Tempat & Tanggal Laporan */}
            <div className="md:col-span-2 space-y-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 block text-[11px] uppercase tracking-wider">
                3. Tempat & Tanggal Penandatanganan Laporan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tempat / Kota Penulisan Laporan
                  </label>
                  <input
                    type="text"
                    name="reportPlace"
                    value={formData.reportPlace || ''}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta Pusat, Surabaya, dll."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Jika dikosongkan, akan otomatis menggunakan data Kabupaten/Kota ({formData.regency || 'Kabupaten/Kota'}).
                  </p>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Tanggal Dokumen
                  </label>
                  <input
                    type="date"
                    name="reportDate"
                    value={formData.reportDate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Jika dikosongkan, akan otomatis menggunakan tanggal hari ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil</span>
            </button>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Tersimpan!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onContinueToAssessment}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <span>Lanjut ke Analisis Diri (10 Dimensi)</span>
            <Sparkles className="w-4 h-4" />
          </button>

        </div>

      </form>
    </div>
  );
};
