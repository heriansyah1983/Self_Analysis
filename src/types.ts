export type ConsistencyLevel = 'Sudah konsisten' | 'Sudah tetapi belum konsisten' | 'Baru mulai' | 'Belum dilakukan';

export type CompetencyCategory = 
  | 'Sangat Baik' 
  | 'Baik' 
  | 'Berkembang' 
  | 'Perlu Penguatan' 
  | 'Prioritas Perbaikan';

export type PriorityLevel = 'Tinggi' | 'Sedang' | 'Rendah';

export type ActionStatus = 'Belum dimulai' | 'Sedang dilakukan' | 'Selesai' | 'Perlu tindak lanjut';

export interface Indicator {
  id: string;
  dimensionId: number;
  text: string;
  description?: string;
  weight?: number;
  hasConsistencyOption?: boolean;
}

export interface Dimension {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  indicators: Indicator[];
  reflectionQuestions: string[];
}

export interface AnswerItem {
  indicatorId: string;
  score: number; // 1 - 5
  consistency?: ConsistencyLevel;
}

export interface ReflectionAnswer {
  dimensionId: number;
  q1_difficulties: string;
  q2_reasons: string;
  q3_current_efforts: string;
  q4_needed_improvements: string;
  q5_needed_support: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  nipNuptk?: string;
  school: string;
  district: string; // Kecamatan
  regency: string; // Kabupaten/Kota
  educationalLevel: 'SD' | 'SMP' | 'SMA' | 'SMK' | 'SLB';
  subjectOrClass: string;
  teachingExperienceYears: number; // e.g. 5
  employmentStatus: 'PNS' | 'PPPK' | 'Guru Honorer / Tetap Yayasan' | 'Lainnya';
  assessmentYear: number;
  analysisMode: 'Individu' | 'Pendampingan Pengawas';
  principalName?: string;
  principalNip?: string;
  supervisorName?: string;
  supervisorNip?: string;
  reportDate?: string;
  reportPlace?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentRecord {
  id: string;
  teacherId: string;
  assessmentDate: string;
  answers: Record<string, AnswerItem>; // key: indicatorId
  reflections: Record<number, ReflectionAnswer>; // key: dimensionId
  isCompleted: boolean;
}

export interface DimensionScore {
  dimensionId: number;
  dimensionTitle: string;
  score: number; // 1.00 - 5.00
  category: CompetencyCategory;
  indicatorScores: {
    indicatorId: string;
    indicatorText: string;
    score: number;
    consistency?: ConsistencyLevel;
  }[];
}

export interface AnalysisSummary {
  overallScore: number;
  overallCategory: CompetencyCategory;
  dimensionScores: DimensionScore[];
  strongestDimensions: DimensionScore[];
  weakestDimensions: DimensionScore[];
  gapAnalysis: {
    dimensionId: number;
    title: string;
    score: number;
    gap: number; // 5.0 - score
    urgency: number; // 1-5
    impact: number; // 1-5
    priorityScore: number;
    priorityLevel: PriorityLevel;
  }[];
}

export interface FindingItem {
  id: string;
  dimensionId: number;
  dimensionTitle: string;
  score: number;
  findingTitle: string;
  evidence: string;
  possibleCauses: string[];
  userReflectionsSummary?: string;
  recommendedActions: string[];
  suggestedLearningResources: string[];
  targetTimeWeeks: number;
  successIndicator: string;
}

export interface ImprovementActionItem {
  id: string;
  teacherId: string;
  priorityLevel: PriorityLevel;
  problem: string;
  dimensionTitle: string;
  action: string;
  targetOutcome: string;
  timeframe: string; // e.g., "2 Minggu"
  status: ActionStatus;
  progressPercent: number; // 0 - 100
  notes?: string;
  createdAt: string;
}

export interface ReassessmentComparison {
  initialAssessmentDate: string;
  reassessmentDate: string;
  initialOverallScore: number;
  newOverallScore: number;
  scoreDelta: number;
  percentageChange: number;
  improvedDimensions: { id: number; title: string; initial: number; current: number; delta: number }[];
  declinedDimensions: { id: number; title: string; initial: number; current: number; delta: number }[];
  maintainedDimensions: { id: number; title: string; score: number }[];
}

export interface SchoolAggregateData {
  schoolName: string;
  teacherCount: number;
  averageScore: number;
  category: CompetencyCategory;
  topDimensions: { dimensionId: number; title: string; score: number }[];
  bottomDimensions: { dimensionId: number; title: string; score: number }[];
  recommendedCoachingType: 'Kolektif (Workshop/Kombel)' | 'Individual (Coaching/Mentoring)' | 'Observasi & Refleksi Kelas';
  coachingPriority: string;
}
