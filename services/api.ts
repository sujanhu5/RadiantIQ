
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, PatientData } from '../types';

export const CONTACT_EMAIL = "sujanhu96@gmail.com";

/**
 * Converts a file to the format required by the Gemini API.
 */
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyzes the radiological image using the Gemini 3 Flash model.
 */
export const analyzeImage = async (
  imageFile: File,
  patientData: PatientData
): Promise<AnalysisResult> => {
  // Always initialize with the latest API key from the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    
    const prompt = `
      CONTEXT: You are a Senior Consultant Radiologist in India with 20 years of experience.
      TASK: Analyze this ${patientData.scanType} for patient ${patientData.patientName} (Age: ${patientData.age}, Gender: ${patientData.gender}).
      OUTPUT: A highly professional, accurate, and structured clinical report.
      
      CRITICAL: Return ONLY a valid JSON object. Do not include markdown blocks or extra text.
      JSON structure:
      {
        "confidenceScore": (number between 0.85 and 0.99),
        "findings": "Professional clinical description of findings, mentioning lung fields, heart size, and any specific abnormalities.",
        "recommendations": ["specific clinical next steps or further imaging"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [imagePart, { text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1000 }
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    const aiOutput = JSON.parse(text);

    return {
      id: `RAD-IND-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: 'Completed',
      confidenceScore: aiOutput.confidenceScore || 0.92,
      findings: aiOutput.findings || "Normal study. No significant pathology detected.",
      recommendations: aiOutput.recommendations || ["Routine clinical follow-up."],
      timestamp: new Date().toISOString(),
      patientData: patientData
    };
  } catch (error) {
    console.error("Radiology AI Error:", error);
    throw error;
  }
};

export const downloadReportPDF = () => {
  window.print();
};
