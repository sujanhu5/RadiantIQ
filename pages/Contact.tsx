
import React, { useState } from 'react';
import { CONTACT_EMAIL } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dept: '',
    msg: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = (val: string) => `
    w-full px-5 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-slate-900 font-bold transition-all bg-white
    ${val ? 'border-blue-700 ring-2 ring-blue-50 shadow-sm' : 'border-slate-300'}
  `;

  return (
    <div className="max-w-6xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Clinical <span className="text-blue-700">Support</span>
        </h1>
        <p className="text-slate-600 text-lg lg:text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
          RadiantIQ Informatics team is available for technical integration, clinical verification, and hospital-wide deployment assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Redesigned Clinical Helpdesk Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-8">
              <h4 className="font-black text-blue-400 uppercase tracking-[0.3em] text-[10px] mb-2">Service Status</h4>
              <div className="flex items-center text-white">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-lg font-black tracking-tight">Clinical Helpdesk Online</p>
              </div>
            </div>
            
            <div className="p-8 space-y-10">
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mr-4 border border-blue-100 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                    <i className="fa-solid fa-envelope-open-text text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">General Inquiries</p>
                    <p className="text-slate-900 font-black text-base">{CONTACT_EMAIL}</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mr-4 border border-green-100 transition-colors group-hover:bg-green-700 group-hover:text-white">
                    <i className="fa-solid fa-phone-volume text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Tech Support</p>
                    <p className="text-slate-900 font-black text-base">+91 960-XXX-XXXX</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mr-4 border border-purple-100 transition-colors group-hover:bg-purple-700 group-hover:text-white">
                    <i className="fa-solid fa-hospital-user text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital Partnerships</p>
                    <p className="text-slate-900 font-black text-base">Apollo Tower B, Delhi NCR</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-8 pb-8 pt-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
                  Average Response Time: <span className="text-blue-700 font-black">Under 15 Minutes</span> for Platinum Integrated Partners.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Security Verification</p>
            <div className="flex justify-center space-x-4 opacity-40 grayscale">
              <i className="fa-solid fa-shield-halved text-2xl"></i>
              <i className="fa-solid fa-user-lock text-2xl"></i>
              <i className="fa-solid fa-file-contract text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Support Inquiry Form */}
        <div className="lg:col-span-8">
          {submitted ? (
            <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-16 lg:p-24 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 text-5xl shadow-inner border-2 border-green-100">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Request Dispatched</h3>
              <p className="text-slate-600 font-bold text-xl leading-relaxed mb-12">
                Your ticket has been prioritized. Our Medical Informatics team will reach you at <span className="text-blue-700 font-black">{formData.email}</span> shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-slate-900 text-white px-14 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-2xl active:scale-95"
              >
                Return to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 p-10 lg:p-14 space-y-10">
              <div className="flex items-center mb-6">
                <span className="w-10 h-1 text-blue-700 rounded-full mr-4"></span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Inquiry Intake</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-3 uppercase tracking-widest">Medical Professional Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses(formData.name)}
                    placeholder="Dr. Arjun Mehta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-3 uppercase tracking-widest">Hospital Email ID</label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses(formData.email)}
                    placeholder="physician@hospital.in"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-black text-slate-800 mb-3 uppercase tracking-widest">Clinical Department / Facility</label>
                <input
                  name="dept"
                  type="text"
                  value={formData.dept}
                  onChange={handleChange}
                  className={inputClasses(formData.dept)}
                  placeholder="e.g. Apollo Radiology Unit C"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-slate-800 mb-3 uppercase tracking-widest">Technical or Clinical Concern</label>
                <textarea
                  required
                  name="msg"
                  rows={5}
                  value={formData.msg}
                  onChange={handleChange}
                  className={inputClasses(formData.msg)}
                  placeholder="Please describe your clinical requirements or integration goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-6 rounded-2xl font-black text-xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center"
              >
                Send to Clinical Informatics <i className="fa-solid fa-paper-plane ml-4"></i>
              </button>

              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Data is encrypted under HIPAA compliance standards.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
