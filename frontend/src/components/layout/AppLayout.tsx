import React, { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { AdminSidebar } from './AdminSidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

interface AppLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, isAdmin = false }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Fixed Desktop Sidebar */}
      {isAdmin ? <AdminSidebar /> : <Sidebar />}

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Topbar */}
        <Topbar onMenuClick={() => setMobileNavOpen(true)} isAdmin={isAdmin} />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
