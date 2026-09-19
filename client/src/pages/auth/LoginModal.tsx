import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@skynest.lk');
  const [password, setPassword] = useState('Admin1234!');
  const [branch, setBranch] = useState('Colombo');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password, branch);
      onClose();
      navigate('/manager/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to sign in. Check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#00152f]/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel relative p-8 md:p-12 rounded-[2rem] w-full max-w-md shadow-2xl backdrop-blur-md transform transition-all duration-300 z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#43474e] hover:text-[#00152f] transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="mb-8 text-center">
          <h1 className="font-headline-md text-headline-md text-[#00152f] mb-2 font-bold">Staff Login</h1>
          <p className="font-body-md text-[#43474e]">Access the SkyNest Management Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-[#43474e] uppercase tracking-wider text-xs font-semibold">
              Staff ID / Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#c4c6cf] bg-white/60 focus:outline-none focus:border-[#00152f] transition-colors font-body-md"
              placeholder="Enter your ID or email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-[#43474e] uppercase tracking-wider text-xs font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#c4c6cf] bg-white/60 focus:outline-none focus:border-[#00152f] transition-colors font-body-md"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-[#43474e] uppercase tracking-wider text-xs font-semibold">
              Branch Selection
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#c4c6cf] bg-white/60 focus:outline-none focus:border-[#00152f] transition-colors font-body-md"
            >
              <option value="Colombo">Colombo Peak</option>
              <option value="Kandy">Kandy Mist</option>
              <option value="Galle">Galle Horizon</option>
            </select>
          </div>

          <div className="flex justify-end">
            <a href="#" className="font-label-sm text-[#00152f] hover:underline text-xs">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#00152f] text-white rounded-full font-label-md shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-widest font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
