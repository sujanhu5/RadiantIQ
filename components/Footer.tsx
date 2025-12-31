
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../services/api';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <i className="fa-solid fa-microscope text-blue-500 text-3xl"></i>
              <span className="text-2xl font-black text-white tracking-tighter">Radiant<span className="text-blue-500">IQ</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              A clinical-grade AI platform built to reduce radiologist burnout and increase diagnostic accuracy in modern hospitals. 
            </p>
            <div className="mt-6 flex space-x-4">
               <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-400 hover:text-white transition-colors">
                 <i className="fa-solid fa-envelope text-xl"></i>
               </a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors">
                 <i className="fa-brands fa-linkedin text-xl"></i>
               </a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-widest text-xs border-l-2 border-blue-500 pl-4">Platform</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/upload" className="text-slate-400 hover:text-blue-500 transition-colors">Analyze X-Ray</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-500 transition-colors">API Docs</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-500 transition-colors">Clinical Benchmarks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-widest text-xs border-l-2 border-blue-500 pl-4">Contact</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li className="text-slate-400">Support: {CONTACT_EMAIL}</li>
              <li className="text-slate-400">Sales: {CONTACT_EMAIL}</li>
              <li className="text-slate-400">Tel: +91 (800) 432-1090</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
          <p>&copy; {new Date().getFullYear()} RadiantIQ Clinical Technologies India.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="flex items-center"><i className="fa-solid fa-shield-halved mr-2 text-green-600"></i> ISO 27001 Certified</span>
            <span className="flex items-center"><i className="fa-solid fa-user-lock mr-2 text-blue-600"></i> HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
