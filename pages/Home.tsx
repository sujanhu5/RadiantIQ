
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>v2.4 Clinical Model Live</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Radiant<span className="text-blue-600">IQ</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-700 mb-4">
              AI-assisted X-ray Image Analysis
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
              RadiantIQ is a professional-grade clinical decision support platform. We use advanced computer vision to assist radiologists and clinicians in identifying anomalies with high precision and speed.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                <i className="fa-solid fa-upload mr-2"></i> Upload X-ray Image
              </Link>
              <Link to="/contact" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-lg font-bold text-lg shadow-sm transition-all flex items-center justify-center">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle Background Decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 hidden lg:block"></div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Capabilities</h3>
            <p className="text-3xl font-bold text-slate-900">Built for Clinical Environments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-microchip text-blue-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Validated AI Models</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Models trained on millions of annotated radiological images, achieving state-of-the-art accuracy across diverse pathology sets.
              </p>
            </div>

            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-shield-halved text-green-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Secure & Compliant</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fully HIPAA and GDPR compliant processing. Data is encrypted at rest and in transit with end-to-end security protocols.
              </p>
            </div>

            <div className="p-8 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-file-medical text-purple-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Structured Reports</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instant generation of structured findings and recommendations compatible with standard EHR/PACS systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
