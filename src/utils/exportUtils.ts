import { TeacherProfile, AnalysisSummary, FindingItem, ImprovementActionItem, AssessmentRecord } from '../types';
import { exportToExcel } from './analysisEngine';
import * as XLSX from 'xlsx';

/**
 * Triggers standard browser window.print()
 */
export function printReport() {
  window.print();
}

/**
 * Trigger PDF Download / Save as PDF via Print dialog or HTML PDF trigger
 */
export function exportToPDF() {
  // Triggers window.print with print styling optimised for Save as PDF
  window.print();
}

export function formatReportDate(dateString?: string): string {
  if (!dateString) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  return dateString;
}

/**
 * Exports the complete report to Microsoft Word (.doc) format with clean formatting and tables
 */
export function exportToWord(
  profile: TeacherProfile,
  summary: AnalysisSummary,
  findings: FindingItem[],
  actionPlan: ImprovementActionItem[],
  reassessment?: AssessmentRecord | null
) {
  const dateFormatted = formatReportDate(profile.reportDate);
  const reportLocation = profile.reportPlace || profile.regency || 'Tempat';

  const dimensionRows = summary.dimensionScores.map((d, i) => `
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${i + 1}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-weight: bold;">${d.dimensionTitle}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold;">${d.score}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${d.category}</td>
    </tr>
  `).join('');

  const findingRows = findings.map((f, i) => `
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${i + 1}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-weight: bold;">${f.dimensionTitle}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${f.score}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${f.findingTitle}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${f.recommendedActions.join('<br/>- ')}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${f.targetTimeWeeks} Minggu</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${f.successIndicator}</td>
    </tr>
  `).join('');

  const actionRows = actionPlan.map((a, i) => `
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${i + 1}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-weight: bold;">${a.title}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${a.targetCompetency}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${a.concreteSteps.join(', ')}</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${a.deadlineWeeks} Minggu</td>
      <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">${a.progressPercent}% (${a.status})</td>
    </tr>
  `).join('');

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Laporan Self-Analysis Guru - ${profile.name}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; padding: 20px; }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #0f172a; margin-bottom: 4px; text-transform: uppercase; }
        h2 { font-size: 13pt; font-weight: bold; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; }
        .subtitle { font-size: 11pt; font-weight: bold; text-align: center; color: #2563eb; margin-bottom: 16px; }
        .meta-date { text-align: center; font-size: 9pt; color: #64748b; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 16px; font-size: 10pt; }
        th { background-color: #1e293b; color: #ffffff; border: 1px solid #0f172a; padding: 8px 10px; text-align: left; font-weight: bold; }
        .info-grid { width: 100%; border: 1px solid #cbd5e1; background-color: #f8fafc; padding: 12px; margin-bottom: 16px; border-radius: 6px; }
        .info-grid td { padding: 4px 8px; vertical-align: top; }
        .score-box { background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 16px; }
        .signature-table { width: 100%; margin-top: 40px; border: none; }
        .signature-table td { text-align: center; vertical-align: top; border: none; padding: 10px; }
      </style>
    </head>
    <body>
      <h1>LAPORAN HASIL ANALISIS DIRI & RENCANA PERBAIKAN GURU</h1>
      <div className="subtitle">GURU SELF-ANALYSIS & IMPROVEMENT DASHBOARD</div>
      <div className="meta-date">Tanggal Dokumen: ${dateFormatted}</div>

      <h2>1. IDENTITAS GURU</h2>
      <table className="info-grid">
        <tr>
          <td><strong>Nama Lengkap:</strong> ${profile.name}</td>
          <td><strong>NIP / NUPTK:</strong> ${profile.nipNuptk || '-'}</td>
        </tr>
        <tr>
          <td><strong>Sekolah:</strong> ${profile.school}</td>
          <td><strong>Jenjang:</strong> ${profile.educationalLevel}</td>
        </tr>
        <tr>
          <td><strong>Kecamatan / Kab:</strong> ${profile.district} / ${profile.regency}</td>
          <td><strong>Mata Pelajaran:</strong> ${profile.subjectOrClass}</td>
        </tr>
        <tr>
          <td><strong>Lama Mengajar:</strong> ${profile.teachingExperienceYears} Tahun</td>
          <td><strong>Status Kepegawaian:</strong> ${profile.employmentStatus}</td>
        </tr>
        <tr>
          <td><strong>Tahun Asesmen:</strong> ${profile.assessmentYear}</td>
          <td><strong>Mode Analisis:</strong> ${profile.analysisMode}</td>
        </tr>
      </table>

      <h2>2. RINGKASAN SKOR KESELURUHAN</h2>
      <div className="score-box">
        <div style="font-size: 12pt; font-weight: bold; color: #1e3a8a;">Skor Keseluruhan Kompetensi: ${summary.overallScore} / 5.00</div>
        <div style="font-size: 11pt; color: #1e40af; font-weight: bold; margin-top: 4px;">Kategori: ${summary.overallCategory}</div>
      </div>

      <h2>3. RINCIAN SKOR 10 DIMENSI KOMPETENSI</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">No</th>
            <th>Dimensi Kompetensi</th>
            <th style="width: 90px; text-align: center;">Skor (1-5)</th>
            <th style="width: 140px; text-align: center;">Kategori</th>
          </tr>
        </thead>
        <tbody>
          ${dimensionRows}
        </tbody>
      </table>

      <h2>4. ANALISIS KEKUATAN & AREA PERBAIKAN</h2>
      <p><strong>3 Kekuatan Utama:</strong></p>
      <ul>
        ${summary.strongestDimensions.map(d => `<li><strong>${d.dimensionTitle}</strong> (Skor: ${d.score} - ${d.category})</li>`).join('')}
      </ul>
      <p><strong>3 Area Paling Membutuhkan Penguatan:</strong></p>
      <ul>
        ${summary.weakestDimensions.map(d => `<li><strong>${d.dimensionTitle}</strong> (Skor: ${d.score} - ${d.category})</li>`).join('')}
      </ul>

      <h2>5. TABEL MATRIKS TEMUAN & TUJUAN PERBAIKAN</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 30px;">No</th>
            <th>Dimensi</th>
            <th style="width: 50px;">Skor</th>
            <th>Temuan Masalah</th>
            <th>Rekomendasi Tindakan</th>
            <th style="width: 70px;">Target</th>
            <th>Indikator Keberhasilan</th>
          </tr>
        </thead>
        <tbody>
          ${findingRows}
        </tbody>
      </table>

      <h2>6. RENCANA TINDAK LANJUT (RTL)</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 30px;">No</th>
            <th>Nama Program/Aktivitas</th>
            <th>Target Kompetensi</th>
            <th>Langkah Konkret</th>
            <th style="width: 70px;">Tenggat</th>
            <th style="width: 90px;">Progress</th>
          </tr>
        </thead>
        <tbody>
          ${actionRows}
        </tbody>
      </table>

      ${reassessment ? `
        <h2>7. HASIL RE-ASSESSMENT (EVALUASI KEMAJUAN)</h2>
        <div className="score-box">
          <p><strong>Tanggal Evaluasi Ulang:</strong> ${reassessment.timestamp}</p>
          <p><strong>Catatan Refleksi:</strong> ${reassessment.notes || '-'}</p>
        </div>
      ` : ''}

      <h2>8. LEMBAR PENGESAHAN & KOMITMEN</h2>
      <table className="signature-table">
        <tr>
          <td style="width: 33%; text-align: center; vertical-align: top;">
            <p>Mengetahui,<br/><strong>Kepala Sekolah ${profile.school}</strong></p>
            <br/><br/><br/>
            <p><strong><u>${profile.principalName || '..........................................................'}</u></strong><br/>NIP. ${profile.principalNip || '.....................................'}</p>
          </td>
          <td style="width: 33%; text-align: center; vertical-align: top;">
            <p>Menyetujui,<br/><strong>Pengawas Sekolah / Pembina</strong></p>
            <br/><br/><br/>
            <p><strong><u>${profile.supervisorName || '..........................................................'}</u></strong><br/>NIP. ${profile.supervisorNip || '.....................................'}</p>
          </td>
          <td style="width: 33%; text-align: center; vertical-align: top;">
            <p>${reportLocation}, ${dateFormatted}<br/><strong>Guru Bersangkutan</strong></p>
            <br/><br/><br/>
            <p><strong><u>${profile.name}</u></strong><br/>NIP. ${profile.nipNuptk || '.....................................'}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `Laporan_Self_Analysis_${profile.name.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

export { exportToExcel };
