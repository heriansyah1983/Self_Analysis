import { 
  AssessmentRecord, 
  DimensionScore, 
  AnalysisSummary, 
  CompetencyCategory, 
  FindingItem, 
  PriorityLevel, 
  ReassessmentComparison,
  SchoolAggregateData,
  TeacherProfile
} from '../types';
import { DIMENSIONS_DATA } from '../data/dimensionsData';
import * as XLSX from 'xlsx';

export function getCategoryFromScore(score: number): CompetencyCategory {
  if (score >= 4.21) return 'Sangat Baik';
  if (score >= 3.41) return 'Baik';
  if (score >= 2.61) return 'Berkembang';
  if (score >= 1.81) return 'Perlu Penguatan';
  return 'Prioritas Perbaikan';
}

export function getCategoryBadgeColor(category: CompetencyCategory): { bg: string; text: string; border: string } {
  switch (category) {
    case 'Sangat Baik':
      return { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-500/30' };
    case 'Baik':
      return { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/30' };
    case 'Berkembang':
      return { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-500/30' };
    case 'Perlu Penguatan':
      return { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-500/30' };
    case 'Prioritas Perbaikan':
      return { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-500/30' };
  }
}

export function calculateAssessmentSummary(assessment: AssessmentRecord): AnalysisSummary {
  const dimensionScores: DimensionScore[] = DIMENSIONS_DATA.map((dim) => {
    let totalScore = 0;
    let count = 0;
    const indicatorScores = dim.indicators.map((ind) => {
      const ans = assessment.answers[ind.id];
      const val = ans ? ans.score : 3;
      totalScore += val;
      count++;
      return {
        indicatorId: ind.id,
        indicatorText: ind.text,
        score: val,
        consistency: ans?.consistency
      };
    });

    const avgScore = count > 0 ? Number((totalScore / count).toFixed(2)) : 3.0;

    return {
      dimensionId: dim.id,
      dimensionTitle: dim.title,
      score: avgScore,
      category: getCategoryFromScore(avgScore),
      indicatorScores
    };
  });

  const overallTotal = dimensionScores.reduce((acc, curr) => acc + curr.score, 0);
  const overallScore = Number((overallTotal / dimensionScores.length).toFixed(2));
  const overallCategory = getCategoryFromScore(overallScore);

  // Sort dimensions by score descending for strengths & ascending for weakest
  const sortedDesc = [...dimensionScores].sort((a, b) => b.score - a.score);
  const strongestDimensions = sortedDesc.slice(0, 3);

  const sortedAsc = [...dimensionScores].sort((a, b) => a.score - b.score);
  const weakestDimensions = sortedAsc.slice(0, 3);

  // Calculate gap and priority score (Urgensi x Dampak x Kesenjangan)
  const gapAnalysis = dimensionScores.map((ds) => {
    const gap = Number((5.0 - ds.score).toFixed(2));
    
    // High impact dimensions in classroom learning (Asesmen, Pedagogik, HOTS, Pelaksanaan)
    let impact = 3;
    if ([2, 3, 4, 8].includes(ds.dimensionId)) impact = 5;
    else if ([1, 6, 7].includes(ds.dimensionId)) impact = 4;

    let urgency = 3;
    if (ds.score <= 2.6) urgency = 5;
    else if (ds.score <= 3.4) urgency = 4;

    const priorityScore = Number((gap * urgency * impact).toFixed(2));

    let priorityLevel: PriorityLevel = 'Rendah';
    if (priorityScore >= 25 || ds.score < 2.6) priorityLevel = 'Tinggi';
    else if (priorityScore >= 12 || ds.score < 3.4) priorityLevel = 'Sedang';

    return {
      dimensionId: ds.dimensionId,
      title: ds.dimensionTitle,
      score: ds.score,
      gap,
      urgency,
      impact,
      priorityScore,
      priorityLevel
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);

  return {
    overallScore,
    overallCategory,
    dimensionScores,
    strongestDimensions,
    weakestDimensions,
    gapAnalysis
  };
}

export function generateFindingsAndCauses(
  assessment: AssessmentRecord,
  summary: AnalysisSummary
): FindingItem[] {
  const findings: FindingItem[] = [];

  // Focus on dimensions with lower scores or highest priority gap
  summary.gapAnalysis.forEach((gapItem) => {
    if (gapItem.score < 3.8) {
      const dim = DIMENSIONS_DATA.find((d) => d.id === gapItem.dimensionId);
      const userRef = assessment.reflections[gapItem.dimensionId];

      const possibleCausesList: string[] = [];
      if (userRef?.q2_reasons) {
        possibleCausesList.push(`Refleksi Guru: "${userRef.q2_reasons}"`);
      } else {
        possibleCausesList.push('Belum terbiasa merencanakan instrumen secara rutin.');
        possibleCausesList.push('Keterbatasan waktu saat persiapan mengajar.');
      }

      // Add domain specific cause hints
      if (gapItem.dimensionId === 3) {
        possibleCausesList.push('Belum terbiasa menganalisis data hasil asesmen formatif.');
        possibleCausesList.push('Instrumen asesmen diagnostik dan rubrik belum siap.');
      } else if (gapItem.dimensionId === 4) {
        possibleCausesList.push('Belum memiliki acuan praktis dalam menerapkan diferensiasi konten & proses.');
        possibleCausesList.push('Kelas heterogen dengan rentang kemampuan siswa yang sangat lebar.');
      } else if (gapItem.dimensionId === 6) {
        possibleCausesList.push('Kurangnya pelatihan praktis integrasi AI dan media digital interaktif.');
        possibleCausesList.push('Keterbatasan perangkat teknologi atau akses jaringan.');
      } else if (gapItem.dimensionId === 8) {
        possibleCausesList.push('Siswa belum terbiasa dengan soal penalaran terbuka (HOTS).');
        possibleCausesList.push('Kesulitan merumuskan pertanyaan C4-C6 yang mudah dipahami.');
      }

      const recActions: string[] = [];
      let targetTimeWeeks = 2;
      let successIndicator = 'Terjadi peningkatan skor keterlaksanaan indikator pada dimensi ini.';

      if (gapItem.dimensionId === 3) {
        recActions.push('Mempelajari modul asesmen formatif & diagnostik di PMM.');
        recActions.push('Menyusun 1 lembar rubrik penilaian sederhana.');
        recActions.push('Mencoba tiket keluar (exit ticket) mingguan di kelas.');
        targetTimeWeeks = 2;
        successIndicator = 'Guru mampu menggunakan hasil asesmen formatif sebagai dasar penyesuaian strategi mengajar berikutnya.';
      } else if (gapItem.dimensionId === 4) {
        recActions.push('Menganalisis hasil tes diagnostik untuk memetakan 3 kelompok kesiapan belajar.');
        recActions.push('Merancang 1 Modul Ajar berdiferensiasi sederhana.');
        targetTimeWeeks = 3;
        successIndicator = 'Semua kelompok siswa terfasilitasi sesuai kebutuhan belajarnya.';
      } else if (gapItem.dimensionId === 6) {
        recActions.push('Mencoba menggunakan ChatGPT/Gemini untuk menyusun draf ide permainan atau lembar kerja.');
        recActions.push('Melakukan verifikasi etis dan penyesuaian materi sebelum masuk kelas.');
        targetTimeWeeks = 2;
        successIndicator = 'Penyusunan bahan ajar lebih efisien dengan bantuan teknologi AI.';
      } else {
        recActions.push(`Melakukan diskusi terfokus bersama rekan di Komunitas Belajar (Kombel) terkait ${gapItem.title}.`);
        recActions.push('Mengimplementasikan 1 praktik baik perbaikan di kelas.');
        targetTimeWeeks = 2;
        successIndicator = 'Terlihat perbaikan bermakna pada motivasi dan keaktifan peserta didik.';
      }

      findings.push({
        id: `finding_${gapItem.dimensionId}`,
        dimensionId: gapItem.dimensionId,
        dimensionTitle: gapItem.title,
        score: gapItem.score,
        findingTitle: `Kesenjangan pada Aspek ${gapItem.title}`,
        evidence: `Skor asesmen berada pada angka ${gapItem.score} dari 5.00 (${getCategoryFromScore(gapItem.score)}).`,
        possibleCauses: possibleCausesList,
        userReflectionsSummary: userRef ? `Kesulitan utama: ${userRef.q1_difficulties || '-'}. Support dibutuhkan: ${userRef.q5_needed_support || '-'}` : undefined,
        recommendedActions: recActions,
        suggestedLearningResources: [
          'Platform Merdeka Mengajar (PMM) - Modul Pelatihan Mandiri',
          'Panduan Pembelajaran dan Asesmen (PPA) Kemendikbudristek',
          'Koleksi Praktik Baik Komunitas Belajar Sekolah'
        ],
        targetTimeWeeks,
        successIndicator
      });
    }
  });

  return findings;
}

export function compareReassessment(
  initialAssess: AssessmentRecord,
  newAssess: AssessmentRecord
): ReassessmentComparison {
  const initialSum = calculateAssessmentSummary(initialAssess);
  const newSum = calculateAssessmentSummary(newAssess);

  const initialOverall = initialSum.overallScore;
  const newOverall = newSum.overallScore;
  const scoreDelta = Number((newOverall - initialOverall).toFixed(2));
  const percentageChange = Number(((scoreDelta / initialOverall) * 100).toFixed(1));

  const improvedDimensions: { id: number; title: string; initial: number; current: number; delta: number }[] = [];
  const declinedDimensions: { id: number; title: string; initial: number; current: number; delta: number }[] = [];
  const maintainedDimensions: { id: number; title: string; score: number }[] = [];

  DIMENSIONS_DATA.forEach((dim) => {
    const initScore = initialSum.dimensionScores.find((d) => d.dimensionId === dim.id)?.score || 0;
    const currScore = newSum.dimensionScores.find((d) => d.dimensionId === dim.id)?.score || 0;
    const diff = Number((currScore - initScore).toFixed(2));

    if (diff > 0) {
      improvedDimensions.push({ id: dim.id, title: dim.title, initial: initScore, current: currScore, delta: diff });
    } else if (diff < 0) {
      declinedDimensions.push({ id: dim.id, title: dim.title, initial: initScore, current: currScore, delta: diff });
    } else {
      maintainedDimensions.push({ id: dim.id, title: dim.title, score: currScore });
    }
  });

  return {
    initialAssessmentDate: initialAssess.assessmentDate,
    reassessmentDate: newAssess.assessmentDate,
    initialOverallScore: initialOverall,
    newOverallScore: newOverall,
    scoreDelta,
    percentageChange,
    improvedDimensions,
    declinedDimensions,
    maintainedDimensions
  };
}

export function calculateSchoolAggregate(
  teachers: TeacherProfile[],
  assessments: AssessmentRecord[]
): SchoolAggregateData[] {
  // Group by school name
  const schoolMap: Record<string, { teachers: TeacherProfile[]; summaries: AnalysisSummary[] }> = {};

  teachers.forEach((t) => {
    const teacherAssess = assessments.find((a) => a.teacherId === t.id && a.isCompleted);
    if (!teacherAssess) return;

    const summary = calculateAssessmentSummary(teacherAssess);
    if (!schoolMap[t.school]) {
      schoolMap[t.school] = { teachers: [], summaries: [] };
    }
    schoolMap[t.school].teachers.push(t);
    schoolMap[t.school].summaries.push(summary);
  });

  const results: SchoolAggregateData[] = [];

  Object.entries(schoolMap).forEach(([schoolName, data]) => {
    const teacherCount = data.teachers.length;
    if (teacherCount === 0) return;

    const totalOverall = data.summaries.reduce((sum, s) => sum + s.overallScore, 0);
    const averageScore = Number((totalOverall / teacherCount).toFixed(2));

    // Calculate dim averages across school
    const dimAvgMap: Record<number, { title: string; total: number }> = {};
    DIMENSIONS_DATA.forEach((d) => {
      dimAvgMap[d.id] = { title: d.title, total: 0 };
    });

    data.summaries.forEach((sum) => {
      sum.dimensionScores.forEach((ds) => {
        dimAvgMap[ds.dimensionId].total += ds.score;
      });
    });

    const dimAvgs = Object.entries(dimAvgMap).map(([idStr, val]) => ({
      dimensionId: Number(idStr),
      title: val.title,
      score: Number((val.total / teacherCount).toFixed(2))
    }));

    const sortedDimAvgs = [...dimAvgs].sort((a, b) => b.score - a.score);
    const topDimensions = sortedDimAvgs.slice(0, 3);
    const bottomDimensions = [...sortedDimAvgs].reverse().slice(0, 3);

    let recommendedCoachingType: 'Kolektif (Workshop/Kombel)' | 'Individual (Coaching/Mentoring)' | 'Observasi & Refleksi Kelas' = 'Kolektif (Workshop/Kombel)';
    if (teacherCount <= 2 || bottomDimensions[0].score < 2.5) {
      recommendedCoachingType = 'Individual (Coaching/Mentoring)';
    } else if (bottomDimensions[0].score < 3.2) {
      recommendedCoachingType = 'Kolektif (Workshop/Kombel)';
    } else {
      recommendedCoachingType = 'Observasi & Refleksi Kelas';
    }

    let coachingPriority = `Prioritas pendampingan pada aspek ${bottomDimensions[0]?.title || 'Asesmen Pembelajaran'}`;
    if (bottomDimensions[0]?.score < 2.8) {
      coachingPriority += ' (Mendesak untuk dilakukan perbaikan kolektif di Kombel)';
    }

    results.push({
      schoolName,
      teacherCount,
      averageScore,
      category: getCategoryFromScore(averageScore),
      topDimensions,
      bottomDimensions,
      recommendedCoachingType,
      coachingPriority
    });
  });

  return results;
}

export function exportToExcel(
  profile: TeacherProfile,
  summary: AnalysisSummary,
  findings: FindingItem[]
) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Identitas & Ringkasan
  const summaryData = [
    ['GURU SELF-ANALYSIS & IMPROVEMENT DASHBOARD - LAPORAN HASIL'],
    ['Tanggal Export', new Date().toLocaleDateString('id-ID')],
    [],
    ['IDENTITAS GURU'],
    ['Nama Guru', profile.name],
    ['NIP / NUPTK', profile.nipNuptk || '-'],
    ['Sekolah', profile.school],
    ['Kecamatan', profile.district],
    ['Kabupaten / Kota', profile.regency],
    ['Jenjang', profile.educationalLevel],
    ['Mata Pelajaran / Kelas', profile.subjectOrClass],
    ['Lama Mengajar (Tahun)', profile.teachingExperienceYears],
    ['Status Kepegawaian', profile.employmentStatus],
    ['Tahun Asesmen', profile.assessmentYear],
    ['Mode Analisis', profile.analysisMode],
    [],
    ['HASIL SKOR KESELURUHAN'],
    ['Skor Total (1 - 5)', summary.overallScore],
    ['Kategori Kompetensi', summary.overallCategory],
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan');

  // Sheet 2: Detail Dimensi
  const dimData = [
    ['No', 'Dimensi Kompetensi', 'Skor', 'Kategori']
  ];
  summary.dimensionScores.forEach((d) => {
    dimData.push([d.dimensionId.toString(), d.dimensionTitle, d.score.toString(), d.category]);
  });
  const wsDim = XLSX.utils.aoa_to_sheet(dimData);
  XLSX.utils.book_append_sheet(wb, wsDim, 'Nilai Dimensi');

  // Sheet 3: Temuan & Tindakan
  const findingData = [
    ['No', 'Dimensi', 'Skor', 'Temuan Masalah', 'Tindakan Perbaikan', 'Target Waktu', 'Indikator Keberhasilan']
  ];
  findings.forEach((f, idx) => {
    findingData.push([
      (idx + 1).toString(),
      f.dimensionTitle,
      f.score.toString(),
      f.findingTitle,
      f.recommendedActions.join('; '),
      `${f.targetTimeWeeks} Minggu`,
      f.successIndicator
    ]);
  });
  const wsFindings = XLSX.utils.aoa_to_sheet(findingData);
  XLSX.utils.book_append_sheet(wb, wsFindings, 'Temuan & Perbaikan');

  XLSX.writeFile(wb, `Laporan_Self_Analysis_${profile.name.replace(/[^a-zA-Z0-0]/g, '_')}.xlsx`);
}
