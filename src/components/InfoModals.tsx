import React from 'react';
import { X, HelpCircle, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  type: 'petunjuk' | 'tentang' | 'privasi' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'petunjuk' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Petunjuk Penggunaan Aplikasi
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Aplikasi ini dirancang khusus untuk memandu guru secara mandiri maupun bersama pengawas sekolah dalam melakukan refleksi profesional.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Langkah 1:</strong> Lengkapi Identitas Guru pada menu Profil Guru.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Langkah 2:</strong> Isi 10 Dimensi Analisis Diri dengan skala 1-5 dan tingkat konsistensi secara jujur.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Langkah 3:</strong> Jawab pertanyaan reflektif singkat di akhir setiap dimensi untuk menemukan akar penyebab.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Langkah 4:</strong> Lihat visualisasi Radar Chart, Temuan Masalah, dan Rekomendasi Tindak Lanjut.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Langkah 5:</strong> Pantau Rencana Perbaikan dan lakukan Re-Assessment secara berkala untuk mengukur pertumbuhan Anda.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'tentang' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Tentang Aplikasi
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>GURU SELF-ANALYSIS & IMPROVEMENT DASHBOARD</strong> lahir dari semangat pendampingan dan perbaikan mutu pembelajaran yang berorientasi pada peserta didik.
              </p>
              <p>
                Aplikasi ini mengadopsi prinsip <em>Instructional Coaching</em>, di mana asesmen tidak dijadikan sebagai alat penilaian kinerja yang menghakimi, melainkan cermin profesional untuk tumbuh dan berkembang.
              </p>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200">
                "Prinsip Utama: DATA → DIAGNOSIS → REKOMENDASI → TINDAK LANJUT → PERTUMBUHAN"
              </div>
            </div>
          </div>
        )}

        {type === 'privasi' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Privasi Data & Keamanan
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Kerahasiaan Jawaban Anda Terjamin:</strong> Seluruh data hasil refleksi dan asesmen diri Anda disimpan secara lokal di dalam browser komputer/HP Anda (localStorage).
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Tidak ada data pribadi yang dikirimkan ke server luar tanpa persetujuan Anda.</li>
                <li>Data hanya digunakan untuk kepentingan analisis refleksi diri Anda atau pendampingan bersama pengawas sekolah yang Anda tunjuk.</li>
                <li>Anda dapat melakukan ekspor/impor file data atau mengosongkan seluruh data kapan saja pada menu Pengaturan.</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
