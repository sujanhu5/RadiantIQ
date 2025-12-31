
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    hospital: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Onboarding request sent. Our team will verify your clinical credentials.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = (val: string) => `
    mt-1 block w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-900 bg-white
    ${val ? 'border-blue-700 ring-2 ring-blue-50' : 'border-slate-300'}
  `;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Clinical Registration
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-bold uppercase tracking-widest">
          Join the RadiantIQ Hospital Network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl border border-slate-200 sm:rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">Full Clinical Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClasses(formData.name)}
                placeholder="Dr. Jane Sharma"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">Medical License Number</label>
              <input
                type="text"
                name="license"
                required
                value={formData.license}
                onChange={handleChange}
                className={inputClasses(formData.license)}
                placeholder="MCI-40291"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">Institution / Hospital</label>
              <input
                type="text"
                name="hospital"
                required
                value={formData.hospital}
                onChange={handleChange}
                className={inputClasses(formData.hospital)}
                placeholder="Apollo Hospitals, New Delhi"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">Hospital Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClasses(formData.email)}
                placeholder="jane.s@apollo.in"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 uppercase tracking-wide">Secure Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={inputClasses(formData.password)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-black text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Request Access
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-bold text-blue-700 hover:text-blue-800">
              Already verified? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
