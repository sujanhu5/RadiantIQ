
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { AnalysisResult } from '../types';
import { downloadReportPDF } from '../services/api';

const Report: React.FC = () => {
  const location = useLocation();
  const result = location.state?.result as AnalysisResult;
  const imagePreview = location.state?.imagePreview as string;

  if (!result) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 print:hidden">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pathology Analysis</h1>
          <p className="text-slate-500 font-bold mt-2 flex items-center text-sm uppercase tracking-widest">
             Clinical Case ID: <span className="text-blue-700 ml-2">{result.id}</span>
          </p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={downloadReportPDF}
            className="bg-white text-slate-900 border-2 border-slate-300 px-8 py-3.5 rounded-2xl font-black hover:border-slate-800 transition-all flex items-center shadow-xl"
          >
            <i className="fa-solid fa-file-pdf mr-3 text-red-600 text-2xl"></i> Download Report PDF
          </button>
          <Link to="/upload" className="bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-blue-800 transition-all flex items-center shadow-xl">
            <i className="fa-solid fa-plus-circle mr-3 text-2xl"></i> New Case
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Document Body */}
        <div className="lg:col-span-8 space-y-10 bg-white p-10 md:p-14 rounded-[2.5rem] border-2 border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
          
          <div className="hidden print:block mb-10 border-b-8 border-blue-700 pb-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-slate-900">RadiantIQ Clinical Summary</h1>
                <p className="text-blue-700 font-black uppercase tracking-[0.2em] text-xs mt-2">Verified AI-Assisted Radiology Findings</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400">AUTHENTICATED CASE: {result.id}</p>
                <p className="text-[10px] font-black text-slate-400">GEN DATE: {new Date(result.timestamp).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>

          {/* Patient Details Section */}
          <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 border-b border-slate-200 pb-2">Patient Registry</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <div className="flex justify-between">
                   <span className="text-slate-500 font-bold text-xs uppercase">Full Name</span>
                   <span className="text-slate-900 font-black">{result.patientData.patientName}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500 font-bold text-xs uppercase">Case Identifier</span>
                   <span className="text-slate-900 font-black">{result.patientData.patientId}</span>
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="flex justify-between">
                   <span className="text-slate-500 font-bold text-xs uppercase">Modality</span>
                   <span className="text-blue-700 font-black uppercase tracking-wider">{result.patientData.scanType}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500 font-bold text-xs uppercase">Biometrics</span>
                   <span className="text-slate-900 font-black">{result.patientData.age}Y / {result.patientData.gender.toUpperCase()}</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-700 rounded-full mr-4"></span>
                Radiologic Findings
              </h3>
              <div className="text-slate-800 leading-relaxed text-xl bg-slate-50 p-10 rounded-3xl border-2 border-slate-100 font-medium italic font-serif">
                "{result.findings}"
              </div>
            </section>

            <section className="print:break-inside-avoid">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-700 rounded-full mr-4"></span>
                Clinical Directions
              </h3>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center p-6 bg-white border-2 border-slate-100 rounded-2xl shadow-sm">
                    <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm mr-5 flex-shrink-0">{index + 1}</span>
                    <p className="text-slate-800 font-black text-lg">{rec}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Verification Footer */}
          <div className="mt-20 pt-10 border-t-4 border-slate-100 text-center space-y-6">
            <p className="text-xs text-slate-400 font-black max-w-xl mx-auto leading-loose uppercase tracking-widest">
              This clinical summary is generated for professional use. All findings must be clinically correlated by the attending physician.
            </p>
            <div className="flex justify-center space-x-16 pt-6 grayscale print:grayscale-0">
               <div className="flex flex-col items-center">
                 <div className="h-0.5 bg-slate-300 w-40 mb-3"></div>
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Radiologist Authentication</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="h-0.5 bg-slate-300 w-40 mb-3"></div>
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Medical Institution Stamp</span>
               </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Sidebar */}
        <div className="lg:col-span-4 space-y-10 print:hidden">
          <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl border-2 border-slate-800">
            <h3 className="font-black uppercase tracking-[0.3em] text-[10px] mb-8 text-blue-400">Imaging Visualizer</h3>
            <div className="bg-black rounded-3xl overflow-hidden aspect-square flex items-center justify-center border-4 border-slate-700 shadow-inner group relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Pathology Data" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="text-center p-8">
                  <i className="fa-solid fa-cloud-slash text-slate-700 text-6xl mb-6"></i>
                  <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Source study data missing</p>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-blue-700/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black">HIGH RES DICOM</div>
            </div>
            <p className="text-center mt-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Proprietary Enhancement Engine</p>
          </div>

          <div className="bg-white rounded-[2rem] border-4 border-slate-100 p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border-2 border-blue-100">
              <i className="fa-solid fa-user-check"></i>
            </div>
            <h4 className="text-slate-900 font-black uppercase tracking-tight text-lg mb-2">Dr. Arjun Mehta</h4>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Chief Radiologist</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .max-w-6xl { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          nav { display: none !important; }
          footer { display: none !important; }
          .bg-slate-50 { background: #f8fafc !important; }
        }
      `}</style>
    </div>
  );
};

export default Report;
