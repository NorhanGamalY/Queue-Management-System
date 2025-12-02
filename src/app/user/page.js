"use client";

import React, { useEffect, useState } from 'react';
import { BsTicketPerforatedFill } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { FaCalendarAlt, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { MdDelete, MdEdit, MdReviews } from 'react-icons/md';
import { BiLogOut } from "react-icons/bi";
import { IoCamera } from 'react-icons/io5';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const date = new Date();
    const day = date.getDate();
    const dayName = date.toLocaleString("default", { weekday: "long" });
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const [time, setTime] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error searching clinics:", error);
        } finally {
            setIsSearching(false);
        }
    };

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/auth/me', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setUserData(data.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const currentTime = currentDate.toLocaleString("default", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#221F1B] transition-colors duration-300">
      <div className="lg:hidden bg-white dark:bg-[#2b2825] p-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Patient Dashboard</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-white focus:outline-none">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex relative">
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}

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
                { id: "dashboard", label: "Dashboard", icon: <SiGoogleanalytics /> },
                { id: "findBusiness", label: "Find Business", icon: <FaSearch /> },
                { id: "myTickets", label: "My Tickets", icon: <BsTicketPerforatedFill /> },
                { id: "appointments", label: "Appointments", icon: <FaCalendarAlt /> },
                { id: "myProfile", label: "Profile", icon: <FaUser /> },
                { id: "reviews", label: "Reviews", icon: <MdReviews /> },
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <span className="text-xl"><BiLogOut size={25}/></span>
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
            {activeTab === "dashboard" && (
            <div>
                <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Welcome Back, {userData?.name || 'User'}! 👋</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{dayName}, {monthName} {day}, {year}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <p className="font-semibold text-gray-800 dark:text-white text-2xl md:text-3xl">{time}</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-[#359487] dark:bg-[#359487] rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white transition-colors duration-300">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                <BsTicketPerforatedFill /> Active Queue Ticket
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-90 mb-1">Clinic</p>
                    <p className="text-lg md:text-xl font-bold">Cairo Medical Center</p>
                </div>
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-90 mb-1">Your Number</p>
                    <p className="text-lg md:text-xl font-bold">#A-24</p>
                </div>
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-90 mb-1">Current Number</p>
                    <p className="text-lg md:text-xl font-bold">#A-18</p>
                </div>
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-90 mb-1">Est. Wait Time</p>
                    <p className="text-lg md:text-xl font-bold">25 mins</p>
                </div>
                </div>
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4">
                <div className="flex justify-between mb-2 text-sm md:text-base">
                    <span>Queue Progress</span>
                    <span>6 patients ahead</span>
                </div>
                <div className="bg-white/20 dark:bg-black/20 h-3 rounded-full overflow-hidden">
                    <div className="bg-white dark:bg-gray-900 h-full w-3/5 rounded-full"></div>
                </div>
                </div>
            </div>
            </div>
            )}
          

          {activeTab === "findBusiness" && (
          <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <FaSearch /> Find Clinics
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by clinic name, specialty, or location..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#359487] dark:focus:border-[#C6FE02] focus:outline-none transition-colors bg-transparent dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((clinic) => (
                  <div key={clinic._id} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">{clinic.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{clinic.specialization || "General Practice"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 pt-4 border-t dark:border-gray-600">
                      <span>⭐ {clinic.rating || "N/A"}</span>
                      <span>📍 {clinic.address}</span>
                      <span>⏰ {clinic.isOpen ? "Open" : "Closed"}</span>
                    </div>
                    <button className="w-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black py-2 rounded-lg font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                      Book Now
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                  {searchQuery ? "No clinics found matching your search." : "Start searching to find clinics near you."}
                </div>
              )}
            </div>
          </div>
          )}

          {activeTab === "myProfile" && (
          <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 md:p-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                👤 My Profile
              </h2>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                  <span><MdEdit size={22}/></span>
                  Edit Profile
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <span><MdDelete size={22}/></span>
                  Delete Account
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b dark:border-gray-600 text-center md:text-left">
              <div className="relative">
                <div className="w-32 h-32 bg-[#359487] dark:bg-[#C6FE02] rounded-full flex items-center justify-center text-white dark:text-black text-4xl font-bold">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#359487] dark:bg-[#C6FE02] rounded-full flex items-center justify-center text-white dark:text-black hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                  <IoCamera/>
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{userData?.name || 'Loading...'}</h3>
                <p className="text-gray-600 dark:text-gray-400">Patient Account</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Member since {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  👤 Name
                </label>
                <input
                  type="text"
                  value={userData?.name || ''}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📧 Email
                </label>
                <input
                  type="email"
                  value={userData?.email || ''}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📱 Phone
                </label>
                <input
                  type="tel"
                  value={userData?.phone || 'Not provided'}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  👤 Account Type
                </label>
                <input
                  type="text"
                  value={userData?.type || 'customer'}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none capitalize"
                  disabled
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  ✅ Email Verified
                </label>
                <input
                  type="text"
                  value={userData?.isEmailVerified ? 'Yes' : 'No'}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                  disabled
                />
              </div>
            </div>
          </div>
          )}
        </main>
      </div>

      <div className="hidden fixed inset-0 bg-black/50 items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🗑️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Delete Account?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}