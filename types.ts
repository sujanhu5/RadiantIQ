
export interface PatientData {
  patientId: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  scanType: string;
  patientName: string;
}

export interface AnalysisResult {
  id: string;
  status: 'Completed' | 'Pending' | 'Error';
  confidenceScore: number;
  findings: string;
  recommendations: string[];
  imageUrl?: string;
  timestamp: string;
  patientData: PatientData;
}

export type ScanType = 'Chest X-ray' | 'Abdominal X-ray' | 'Orthopedic X-ray' | 'Dental X-ray';

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}
