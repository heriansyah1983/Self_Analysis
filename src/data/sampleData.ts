import { TeacherProfile, AssessmentRecord, ImprovementActionItem } from '../types';

export const SAMPLE_PROFILES: TeacherProfile[] = [
  {
    id: 'teacher_sample_1',
    name: 'Nurhayati, S.Pd.',
    nipNuptk: '198805122014032001',
    school: 'SD Negeri 01 Menteng',
    district: 'Menteng',
    regency: 'Jakarta Pusat',
    educationalLevel: 'SD',
    subjectOrClass: 'Guru Kelas V',
    teachingExperienceYears: 8,
    employmentStatus: 'PNS',
    assessmentYear: 2026,
    analysisMode: 'Individu',
    principalName: 'Drs. H. Bambang Suryono, M.Pd.',
    principalNip: '197108151998021002',
    supervisorName: 'Dra. Hj. Endang Sri Wahyuni, M.Si.',
    supervisorNip: '196804121994032001',
    reportDate: '2026-08-13',
    reportPlace: 'Jakarta Pusat',
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-02-10T09:30:00Z'
  },
  {
    id: 'teacher_sample_2',
    name: 'Ahmad Yani, S.Pd., M.Si.',
    nipNuptk: '198203152009021004',
    school: 'SMP Negeri 3 Bandung',
    district: 'Coblong',
    regency: 'Kota Bandung',
    educationalLevel: 'SMP',
    subjectOrClass: 'IPA Terpadu (Fisika/Biologi)',
    teachingExperienceYears: 14,
    employmentStatus: 'PNS',
    assessmentYear: 2026,
    analysisMode: 'Pendampingan Pengawas',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T11:45:00Z'
  },
  {
    id: 'teacher_sample_3',
    name: 'Siti Rahmawati, S.Pd.',
    nipNuptk: '3456789123450002',
    school: 'SD IT Al-Azhar 2',
    district: 'Sukarame',
    regency: 'Bandar Lampung',
    educationalLevel: 'SD',
    subjectOrClass: 'Guru Kelas III',
    teachingExperienceYears: 3,
    employmentStatus: 'Guru Honorer / Tetap Yayasan',
    assessmentYear: 2026,
    analysisMode: 'Individu',
    createdAt: '2026-03-01T07:30:00Z',
    updatedAt: '2026-03-01T08:50:00Z'
  }
];

export const SAMPLE_ASSESSMENT_1: AssessmentRecord = {
  id: 'assess_sample_1',
  teacherId: 'teacher_sample_1',
  assessmentDate: '2026-02-10',
  isCompleted: true,
  answers: {
    // Dimensi 1 - Perencanaan
    'd1_i1': { indicatorId: 'd1_i1', score: 4, consistency: 'Sudah konsisten' },
    'd1_i2': { indicatorId: 'd1_i2', score: 4, consistency: 'Sudah konsisten' },
    'd1_i3': { indicatorId: 'd1_i3', score: 4, consistency: 'Sudah tetapi belum konsisten' },
    'd1_i4': { indicatorId: 'd1_i4', score: 5 },
    'd1_i5': { indicatorId: 'd1_i5', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd1_i6': { indicatorId: 'd1_i6', score: 4, consistency: 'Sudah konsisten' },
    'd1_i7': { indicatorId: 'd1_i7', score: 3 },
    'd1_i8': { indicatorId: 'd1_i8', score: 4 },

    // Dimensi 2 - Pelaksanaan
    'd2_i1': { indicatorId: 'd2_i1', score: 5, consistency: 'Sudah konsisten' },
    'd2_i2': { indicatorId: 'd2_i2', score: 4 },
    'd2_i3': { indicatorId: 'd2_i3', score: 4, consistency: 'Sudah konsisten' },
    'd2_i4': { indicatorId: 'd2_i4', score: 4 },
    'd2_i5': { indicatorId: 'd2_i5', score: 5, consistency: 'Sudah konsisten' },
    'd2_i6': { indicatorId: 'd2_i6', score: 4, consistency: 'Sudah tetapi belum konsisten' },
    'd2_i7': { indicatorId: 'd2_i7', score: 4 },
    'd2_i8': { indicatorId: 'd2_i8', score: 3 },
    'd2_i9': { indicatorId: 'd2_i9', score: 4, consistency: 'Sudah konsisten' },

    // Dimensi 3 - Asesmen
    'd3_i1': { indicatorId: 'd3_i1', score: 2, consistency: 'Baru mulai' },
    'd3_i2': { indicatorId: 'd3_i2', score: 2, consistency: 'Sudah tetapi belum konsisten' },
    'd3_i3': { indicatorId: 'd3_i3', score: 4 },
    'd3_i4': { indicatorId: 'd3_i4', score: 2, consistency: 'Baru mulai' },
    'd3_i5': { indicatorId: 'd3_i5', score: 3 },
    'd3_i6': { indicatorId: 'd3_i6', score: 2, consistency: 'Sudah tetapi belum konsisten' },
    'd3_i7': { indicatorId: 'd3_i7', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd3_i8': { indicatorId: 'd3_i8', score: 3 },

    // Dimensi 4 - Pedagogik
    'd4_i1': { indicatorId: 'd4_i1', score: 4 },
    'd4_i2': { indicatorId: 'd4_i2', score: 4, consistency: 'Sudah konsisten' },
    'd4_i3': { indicatorId: 'd4_i3', score: 2, consistency: 'Baru mulai' },
    'd4_i4': { indicatorId: 'd4_i4', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd4_i5': { indicatorId: 'd4_i5', score: 3 },
    'd4_i6': { indicatorId: 'd4_i6', score: 4, consistency: 'Sudah konsisten' },

    // Dimensi 5 - Penguasaan Materi
    'd5_i1': { indicatorId: 'd5_i1', score: 5, consistency: 'Sudah konsisten' },
    'd5_i2': { indicatorId: 'd5_i2', score: 4 },
    'd5_i3': { indicatorId: 'd5_i3', score: 4, consistency: 'Sudah konsisten' },
    'd5_i4': { indicatorId: 'd5_i4', score: 5 },
    'd5_i5': { indicatorId: 'd5_i5', score: 4, consistency: 'Sudah konsisten' },
    'd5_i6': { indicatorId: 'd5_i6', score: 4 },

    // Dimensi 6 - Teknologi dan AI
    'd6_i1': { indicatorId: 'd6_i1', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd6_i2': { indicatorId: 'd6_i2', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd6_i3': { indicatorId: 'd6_i3', score: 4 },
    'd6_i4': { indicatorId: 'd6_i4', score: 2, consistency: 'Baru mulai' },
    'd6_i5': { indicatorId: 'd6_i5', score: 4 },
    'd6_i6': { indicatorId: 'd6_i6', score: 3, consistency: 'Baru mulai' },
    'd6_i7': { indicatorId: 'd6_i7', score: 3 },

    // Dimensi 7 - Pengelolaan Kelas
    'd7_i1': { indicatorId: 'd7_i1', score: 5, consistency: 'Sudah konsisten' },
    'd7_i2': { indicatorId: 'd7_i2', score: 4, consistency: 'Sudah konsisten' },
    'd7_i3': { indicatorId: 'd7_i3', score: 5, consistency: 'Sudah konsisten' },
    'd7_i4': { indicatorId: 'd7_i4', score: 4 },
    'd7_i5': { indicatorId: 'd7_i5', score: 4 },
    'd7_i6': { indicatorId: 'd7_i6', score: 5, consistency: 'Sudah konsisten' },

    // Dimensi 8 - HOTS
    'd8_i1': { indicatorId: 'd8_i1', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd8_i2': { indicatorId: 'd8_i2', score: 4, consistency: 'Sudah konsisten' },
    'd8_i3': { indicatorId: 'd8_i3', score: 3 },
    'd8_i4': { indicatorId: 'd8_i4', score: 2, consistency: 'Baru mulai' },
    'd8_i5': { indicatorId: 'd8_i5', score: 3 },
    'd8_i6': { indicatorId: 'd8_i6', score: 4, consistency: 'Sudah konsisten' },
    'd8_i7': { indicatorId: 'd8_i7', score: 3 },

    // Dimensi 9 - Refleksi
    'd9_i1': { indicatorId: 'd9_i1', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd9_i2': { indicatorId: 'd9_i2', score: 3 },
    'd9_i3': { indicatorId: 'd9_i3', score: 4, consistency: 'Sudah konsisten' },
    'd9_i4': { indicatorId: 'd9_i4', score: 4, consistency: 'Sudah konsisten' },
    'd9_i5': { indicatorId: 'd9_i5', score: 4 },
    'd9_i6': { indicatorId: 'd9_i6', score: 3, consistency: 'Sudah tetapi belum konsisten' },
    'd9_i7': { indicatorId: 'd9_i7', score: 3, consistency: 'Sudah tetapi belum konsisten' },

    // Dimensi 10 - Etika
    'd10_i1': { indicatorId: 'd10_i1', score: 5, consistency: 'Sudah konsisten' },
    'd10_i2': { indicatorId: 'd10_i2', score: 5, consistency: 'Sudah konsisten' },
    'd10_i3': { indicatorId: 'd10_i3', score: 5 },
    'd10_i4': { indicatorId: 'd10_i4', score: 4, consistency: 'Sudah konsisten' },
    'd10_i5': { indicatorId: 'd10_i5', score: 4, consistency: 'Sudah konsisten' },
    'd10_i6': { indicatorId: 'd10_i6', score: 5 },
    'd10_i7': { indicatorId: 'd10_i7', score: 4 },
  },
  reflections: {
    1: {
      dimensionId: 1,
      q1_difficulties: 'Menyesuaikan modul ajar dengan beragamnya kesiapan belajar anak SD.',
      q2_reasons: 'Jumlah siswa 28 orang di kelas dan variasi kemampuan membaca masih cukup lebar.',
      q3_current_efforts: 'Menyusun modul kelompok berbasis giliran membaca.',
      q4_needed_improvements: 'Merancang lembar kerja sederhana bagi anak yang butuh pendampingan khusus.',
      q5_needed_support: 'Contoh modul ajar diferensiasi dari Pengawas Sekolah atau Kombel.'
    },
    3: {
      dimensionId: 3,
      q1_difficulties: 'Mendesain dan melaksanakan asesmen diagnostik di awal serta formatif yang konsisten.',
      q2_reasons: 'Terbentur waktu mengoreksi cepat untuk langsung dipakai menyesuaikan materi esoknya.',
      q3_current_efforts: 'Menggunakan kuis angkat tangan dan tiket keluar (exit ticket) kertas kecil.',
      q4_needed_improvements: 'Membuat rubrik sederhana dan membiasakan mencatat hasil formatif harian.',
      q5_needed_support: 'Bimbingan teknis pembuatan instrumen asesmen formatif yang praktis.'
    },
    6: {
      dimensionId: 6,
      q1_difficulties: 'Belum terbiasa memakai AI secara efisien untuk pembuatan draf instrumen asesmen.',
      q2_reasons: 'Khawatir hasil AI kurang sesuai konteks Kurikulum Merdeka atau belum paham prompt tepat.',
      q3_current_efforts: 'Mencoba ChatGPT untuk cari ide permainan kuis.',
      q4_needed_improvements: 'Mempelajari perintah prompt etis khusus pembuat instrumen asesmen.',
      q5_needed_support: 'Pelatihan singkat pemanfaatan AI untuk guru SD.'
    }
  }
};

export const SAMPLE_ACTION_PLAN: ImprovementActionItem[] = [
  {
    id: 'act_1',
    teacherId: 'teacher_sample_1',
    priorityLevel: 'Tinggi',
    problem: 'Asesmen formatif dan diagnostik belum dimanfaatkan secara konsisten untuk merancang tindak lanjut pembelajaran.',
    dimensionTitle: 'Asesmen Pembelajaran',
    action: 'Menyusun dan mengimplementasikan 1 lembar asesmen diagnostik non-kognitif & kognitif di awal bab, serta kuis tiket keluar mingguan.',
    targetOutcome: 'Guru memiliki catatan peta kemampuan awal siswa dan data perkembangan formatif rutin.',
    timeframe: '2 Minggu',
    status: 'Sedang dilakukan',
    progressPercent: 60,
    notes: 'Sudah dicoba di Bab 4 Matematika, respon siswa sangat antusias.',
    createdAt: '2026-02-12'
  },
  {
    id: 'act_2',
    teacherId: 'teacher_sample_1',
    priorityLevel: 'Tinggi',
    problem: 'Pembelajaran diferensiasi proses dan konten belum sepenuhnya memfasilitasi anak yang belum lancar membaca.',
    dimensionTitle: 'Kompetensi Pedagogik',
    action: 'Membentuk 3 kelompok belajar berdasarkan minat & tingkat literasi dengan bahan bacaan bergambar.',
    targetOutcome: 'Seluruh siswa berpartisipasi aktif dalam kelompok tanpa ada yang merasa tertinggal.',
    timeframe: '3 Minggu',
    status: 'Sedang dilakukan',
    progressPercent: 40,
    notes: 'Modul bergambar sedang disiapkan bersama teman sejawat.',
    createdAt: '2026-02-12'
  },
  {
    id: 'act_3',
    teacherId: 'teacher_sample_1',
    priorityLevel: 'Sedang',
    problem: 'Penyusunan pertanyaan berbasis HOTS masih jarang diterapkan pada saat kuis harian.',
    dimensionTitle: 'Kemampuan Berpikir Tingkat Tinggi (HOTS)',
    action: 'Menyusun minimal 2 pertanyaan pemantik bertipe "Mengapa" dan "Bagaimana Jika" di setiap awal kegiatan inti.',
    targetOutcome: 'Siswa aktif memberikan alasan logis saat menjawab pertanyaan guru.',
    timeframe: '1 Bulan',
    status: 'Belum dimulai',
    progressPercent: 0,
    createdAt: '2026-02-14'
  }
];
