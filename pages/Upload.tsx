
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { analyzeImage } from '../services/api';
import { PatientData } from '../types';

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  const [formData, setFormData] = useState<PatientData>({
    patientId: '',
    patientName: '',
    age: '',
    gender: 'male',
    scanType: 'Chest X-ray'
  });

  useEffect(() => {
    const auth = localStorage.getItem('radiant_auth');
    setIsAuthorized(!!auth);
  }, []);

  if (isAuthorized === false) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File detected:", file.name, file.type, file.size);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        alert("Failed to read the file. Please try another image.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("CRITICAL ERROR: No radiological image detected. Please select an X-ray file.");
      return;
    }
    
    setLoading(true);
    try {
      console.log("Initiating Gemini AI Analysis...");
      const result = await analyzeImage(imageFile, formData);
      navigate('/report', { state: { result, imagePreview } });
    } catch (error) {
      console.error("Pathology Analysis Failed:", error);
      alert("Clinical Analysis Engine failed to process the request. Please verify your Gemini API configuration and image quality.");
    } finally {
      setLoading(false);
    }
  };

  // Improved high-contrast input classes
  const getInputClass = (val: string) => `
    w-full px-5 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all duration-300 bg-white
    ${val ? 'border-blue-700 text-slate-900 ring-2 ring-blue-50' : 'border-slate-300 text-slate-600'}
  `;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] bg-slate-50">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-[10px] border-slate-200 border-t-blue-700 rounded-full animate-spin"></div>
          <i className="fa-solid fa-stethoscope absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-700 text-2xl"></i>
        </div>
        <h3 className="text-4xl font-black text-slate-900">AI Pathology Scan...</h3>
        <p className="text-slate-500 mt-3 font-black uppercase tracking-[0.2em] text-sm">Consulting Clinical Knowledge Engine</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
        <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black flex items-center tracking-tight">
              <i className="fa-solid fa-notes-medical text-blue-400 mr-4"></i>
              Diagnostic Intake
            </h2>
            <p className="text-slate-400 mt-1 font-bold uppercase tracking-widest text-xs">V3.5 Clinical Analysis Pipeline</p>
          </div>
          <div className="hidden md:flex space-x-2">
             <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-xs font-black text-green-500 uppercase">Live Verification</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Patient Full Name</label>
                  <input
                    required
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className={getInputClass(formData.patientName)}
                    placeholder="e.g. Rajesh Kumar Iyer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Case / Hospital ID</label>
                  <input
                    required
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className={getInputClass(formData.patientId)}
                    placeholder="e.g. AI-IND-00109"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Patient Age</label>
                  <input
                    required
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={getInputClass(formData.age)}
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={getInputClass(formData.gender)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Imaging Modality</label>
                <select
                  name="scanType"
                  value={formData.scanType}
                  onChange={handleInputChange}
                  className={getInputClass(formData.scanType)}
                >
                  <option value="Chest X-ray">Chest X-ray</option>
                  <option value="Abdominal X-ray">Abdominal X-ray</option>
                  <option value="Orthopedic X-ray">Orthopedic X-ray</option>
                  <option value="Dental X-ray">Dental X-ray</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Clinical Image Selection</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-4 border-dashed rounded-3xl h-72 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${imagePreview ? 'border-blue-700 bg-slate-50' : 'border-slate-300 hover:border-blue-600 hover:bg-blue-50/30'}`}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Pathology Preview" className="absolute inset-0 w-full h-full object-contain p-4" />
                ) : (
                  <>
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 border-2 border-slate-200">
                      <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-400"></i>
                    </div>
                    <p className="text-slate-900 font-black text-xl">Select Medical Study</p>
                    <p className="text-slate-500 font-bold text-xs mt-1 uppercase tracking-widest">JPG, PNG or DICOM</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {imagePreview && (
                <button 
                  type="button" 
                  onClick={() => {setImagePreview(null); setImageFile(null);}}
                  className="w-full text-center text-xs text-red-600 font-black py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all uppercase tracking-[0.2em]"
                >
                  <i className="fa-solid fa-rotate-left mr-2"></i> Re-select File
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-slate-100 gap-6">
            <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <i className="fa-solid fa-shield-virus text-blue-600 mr-3 text-xl"></i> Secure Medical Pipeline
            </div>
            <button
              type="submit"
              disabled={!imageFile}
              className={`px-16 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all transform active:scale-95 flex items-center ${!imageFile ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-700 hover:bg-blue-800 text-white hover:-translate-y-1'}`}
            >
              Analyze Imaging <i className="fa-solid fa-microscope ml-4"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
