import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const TopNavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="hidden md:flex fixed top-0 right-0 left-64 h-20 bg-surface/70 backdrop-blur-md bg-white/60 z-40 transition-all duration-300 border-b border-outline-variant/20 items-center justify-between px-16">
      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          <button className="text-primary font-bold border-b-2 border-primary pb-1 text-sm tracking-wide">
            {user?.branchName || 'Colombo'}
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
            Kandy
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
            Galle
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-[20px]">apps</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/40">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtWql4-w8mVdtxwg9v4dkWLjvlduvZCMIFYrpzQOETf2KU0whnjS3KndN1Gqii6-kLUS7n67NKPcFf3MOI6t9QA4fQavWGx9jjvmUELzpaA0TPVUl6rxIGbGBrI2dzyTNrmmHtwmpHf66FdaxtCIVyDs5R9qwe87s9LL_4hiwRRzqeY3PMqUoGHr_SN5H5PY3w8i_xFG_capqhE9d6nRa0l_1bwVn-axi07DX16TSrFeYiechKhln1MWYS2FWhfQgAnDGYqTXhj_-"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-primary leading-none">{user?.name || 'Executive Admin'}</p>
            <p className="text-xs text-on-surface-variant capitalize mt-0.5">{user?.role?.replace('_', ' ').toLowerCase() || 'System Admin'}</p>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="text-on-surface-variant hover:text-error ml-2 transition-colors flex items-center p-1 rounded-full hover:bg-error-container/20"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
