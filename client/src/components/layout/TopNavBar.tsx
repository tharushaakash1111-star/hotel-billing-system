import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const TopNavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="hidden md:flex bg-surface/70 backdrop-blur-md fixed top-0 right-0 left-64 h-20 justify-between items-center px-margin-desktop w-[calc(100%-16rem)] z-40 transition-all duration-300 border-b border-surface-variant/30">
      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          <button className="text-[#00152f] font-semibold border-b-2 border-[#00152f] pb-1 text-label-md font-label-md">
            {user?.branchName || 'Colombo'}
          </button>
          <button className="text-[#43474e] hover:text-[#00152f] transition-colors text-label-md font-label-md">Kandy</button>
          <button className="text-[#43474e] hover:text-[#00152f] transition-colors text-label-md font-label-md">Galle</button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#00152f] hover:bg-surface-container-high p-2 rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        <button className="text-[#00152f] hover:bg-surface-container-high p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined">apps</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#c4c6cf]">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#c4c6cf] bg-surface-container-high">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzAc-zPvJ8SpeX65bwMZSIj7l0GLLrX6Rh0ZISUln_iJcA_FprnMKmIi3Zq5WuwL-tHuF2fOgzHiZ5IMsH8QJcYZC_lePN9KUBu4BUlCVBrzcUDYgbapw-I4C6m-v-A3TukS_t2ZnbpG84NG3TkXA7Tc9jCeBFLovv3X4BZtxFy8dZeAzhFb1EsL7sqUHixmsCyATm5Jzyt-brbVYBZO7JG4cKlt5vh-b3CqxiRy-exliGdxNOh8swpVwRSG_MzkNOgxP0qkcfLnxO"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-label-md font-label-md font-semibold text-[#00152f] leading-none">{user?.name || 'Manager'}</p>
            <p className="text-xs text-[#43474e] capitalize mt-0.5">{user?.role?.replace('_', ' ').toLowerCase() || 'Management'}</p>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="text-[#43474e] hover:text-red-600 ml-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
