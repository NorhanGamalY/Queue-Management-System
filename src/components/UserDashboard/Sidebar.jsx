"use client";

import { BiLogOut } from "react-icons/bi";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { FaCalendarAlt, FaCreditCard, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { MdReviews } from 'react-icons/md';
import { SiGoogleanalytics } from "react-icons/si";

export default function Sidebar({ t, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 
        bg-white dark:bg-[#2b2825] shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 dark:text-white">
              <FaTimes size={24} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: "dashboard", label: t('userDashboard.tabs.dashboard'), icon: <SiGoogleanalytics /> },
              { id: "findBusiness", label: t('common.search'), icon: <FaSearch /> },
              { id: "myTickets", label: t('userDashboard.tabs.tickets'), icon: <BsTicketPerforatedFill /> },
              { id: "appointments", label: t('userDashboard.stats.upcomingAppointments'), icon: <FaCalendarAlt /> },
              { id: "myProfile", label: t('userDashboard.tabs.profile'), icon: <FaUser /> },
              { id: "reviews", label: t('userDashboard.tabs.reviews'), icon: <MdReviews /> },
              { id: "payments", label: "Payments", icon: <FaCreditCard /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-[#359487]/10 text-[#359487] border-l-4 border-[#359487] dark:text-[#C6FE02] dark:border-[#C6FE02] dark:bg-[#C6FE02]/10"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 dark:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={async () => {
                try {
                  const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                  });
                  if (res.ok) {
                    window.location.href = '/';
                  }
                } catch (error) {
                  console.error('Logout error:', error);
                }
              }}
              className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
            >
              <span className="text-xl"><BiLogOut size={25}/></span>
              <span className="font-medium">{t('nav.logout')}</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
