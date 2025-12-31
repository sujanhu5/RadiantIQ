
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for demo purposes
    localStorage.setItem('radiant_auth', JSON.stringify({ email, name: 'Dr. Arjun Mehta' }));
    window.dispatchEvent(new Event('storage')); // Force navbar update
    navigate('/upload');
  };

  const inputClasses = (val: string) => `
    appearance-none block w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-slate-400 
    focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-900 font-bold bg-white
    ${val ? 'border-blue-700 ring-2 ring-blue-50' : 'border-slate-300'}
  `;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-2xl mb-6 shadow-lg">
          <i className="fa-solid fa-user-md text-white text-3xl"></i>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Clinical Portal Access
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-bold uppercase tracking-widest">
          RadiantIQ Professional Secure Login
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl border border-slate-200 sm:rounded-3xl sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">
                Medical Email ID
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses(email)}
                placeholder="physician@hospital.in"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">
                Secure Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses(password)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-black text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-[0.98]"
            >
              Authorize & Access Demo
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Secured by AES-256 Protocol</p>
            <Link to="/register" className="text-sm font-bold text-blue-700 hover:text-blue-800">
              New Medical Staff? Request Credentials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
