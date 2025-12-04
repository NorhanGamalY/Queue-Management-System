"use client";

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { IoCamera } from 'react-icons/io5';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { SiGoogleanalytics } from "react-icons/si";
import { FaCreditCard } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from 'react-icons/bi';

export default function ClinicDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <SiGoogleanalytics /> },
    { id: "patients", label: "Patients", icon: <SiGoogleanalytics /> },
    { id: "schedule", label: "Schedule", icon: <SiGoogleanalytics /> },
    { id: "payments", label: "Payments", icon: <FaCreditCard /> },
    { id: "reviews", label: "Reviews", icon: <MdReviews /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
  ];

  const handleEditProfile = () => {
    setIsDisabled(false);
  }

  const handleSaveEdit = () => {
    setIsDisabled(true);
  }

  const handleDeleteAccount = () => {
    setOpenModal(true);
  }

  // Fetch business data
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/auth/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setBusinessData(data.data);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  return (
    <>
      {openModal && (
        <Modal className='flex items-center' show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <div className="rounded-lg border-2 border-gray-300 p-3 shadow-sm">
            <ModalHeader />
              <ModalBody>
                <div className="text-center">
                  <HiOutlineExclamationCircle color="red" className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-800 dark:text-gray-400">
                    Are you sure you want to delete your business account?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => setOpenModal(false)}>
                      Yes, I'm sure
                    </Button>
                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </ModalBody>
          </div>
        </Modal>
      )}
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#221F1B] transition-colors duration-300">
        <div className="lg:hidden bg-white dark:bg-[#2b2825] p-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Clinic Dashboard</h1>
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
                {navItems.map((item) => (
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
                className="cursor-pointer b w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
              >
                <span className="text-xl"><BiLogOut size={25}/></span>
                <span className="font-medium">Logout</span>
              </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
            {activeTab === "dashboard" && (
              <>
                <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{businessData?.name || 'Business Dashboard'}</h1>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Thursday, November 13, 2025 • 10:30 AM</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <span className="text-2xl">🔔</span>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                      </button>
                      <span className="px-4 py-2 rounded-full font-semibold flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        ● Open
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">Today's Patients</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">24</p>
                        <p className="text-sm text-green-600 dark:text-green-400">+12%</p>
                      </div>
                      <div className="text-4xl opacity-70">👥</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">In Queue</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">8</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">waiting</p>
                      </div>
                      <div className="text-4xl opacity-70">🎟️</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">Completed</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">16</p>
                        <p className="text-sm text-green-600 dark:text-green-400">on schedule</p>
                      </div>
                      <div className="text-4xl opacity-70">✅</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">Avg Wait Time</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">18min</p>
                        <p className="text-sm text-green-600 dark:text-green-400">↓ 5min better</p>
                      </div>
                      <div className="text-4xl opacity-70">⏱️</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#359487] dark:bg-[#C6FE02] rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white dark:text-black transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      🎯 Queue Control
                    </h2>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <span>⏸️</span>
                        Pause Queue
                      </button>
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <span>➕</span>
                        Add Walk-in
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
                      <p className="text-sm opacity-90 mb-2">Current Serving</p>
                      <p className="text-2xl md:text-3xl font-bold">#A-18</p>
                    </div>
                    <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
                      <p className="text-sm opacity-90 mb-2">Next in Line</p>
                      <p className="text-2xl md:text-3xl font-bold">#A-19</p>
                    </div>
                    <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
                      <p className="text-sm opacity-90 mb-2">Total in Queue</p>
                      <p className="text-2xl md:text-3xl font-bold">8</p>
                    </div>
                    <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
                      <p className="text-sm opacity-90 mb-2">Capacity Left</p>
                      <p className="text-2xl md:text-3xl font-bold">7</p>
                    </div>
                  </div>
                </div>

                {/* Patient Queue */}
                <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      👥 Patient Queue
                    </h2>
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold bg-[#359487]/10 text-[#359487] border-2 border-[#359487] dark:text-[#C6FE02] dark:border-[#C6FE02] dark:bg-[#C6FE02]/10 transition-all">
                        All (8)
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Waiting (7)
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Called (1)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Current Patient */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500/50">
                      <div className="flex items-center gap-4 md:contents">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-green-500 text-white flex-shrink-0">
                          #A-18
                        </div>
                        <div className="md:hidden flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Ahmed Hassan</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7890 • 💳 Paid</p>
                        </div>
                      </div>
                      
                      <div className="hidden md:block">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Ahmed Hassan</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7890 • 💳 Paid</p>
                      </div>

                      <div className="flex justify-between items-center md:block md:text-right">
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                          ⏰ In Progress
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          10:15 AM
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                          ✓
                        </button>
                      </div>
                    </div>

                    {/* Waiting Patient 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4 md:contents">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex-shrink-0">
                          #A-19
                        </div>
                        <div className="md:hidden flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Sara Mohamed</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7891 • 💳 Paid</p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Sara Mohamed</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7891 • 💳 Paid</p>
                      </div>

                      <div className="flex justify-between items-center md:block md:text-right">
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                          ⏰ Est. 5 min
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          10:20 AM
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                          📢
                        </button>
                        <button className="w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center">
                          ⏭️
                        </button>
                        <button className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Waiting Patient 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4 md:contents">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex-shrink-0">
                          #A-20
                        </div>
                        <div className="md:hidden flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Omar Ali</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7892 • 💵 Cash</p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Omar Ali</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7892 • 💵 Cash</p>
                      </div>

                      <div className="flex justify-between items-center md:block md:text-right">
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                          ⏰ Est. 15 min
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          10:25 AM
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                          📢
                        </button>
                        <button className="w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center">
                          ⏭️
                        </button>
                        <button className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Waiting Patient 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4 md:contents">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex-shrink-0">
                          #A-21
                        </div>
                        <div className="md:hidden flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Fatima Ibrahim</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7893 • 💳 Paid</p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Fatima Ibrahim</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7893 • 💳 Paid</p>
                      </div>

                      <div className="flex justify-between items-center md:block md:text-right">
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                          ⏰ Est. 25 min
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          10:30 AM
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                          📢
                        </button>
                        <button className="w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center">
                          ⏭️
                        </button>
                        <button className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Waiting Patient 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4 md:contents">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex-shrink-0">
                          #A-22
                        </div>
                        <div className="md:hidden flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Mahmoud Samir</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7894 • 💳 Paid</p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Mahmoud Samir</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">📞 +20 123 456 7894 • 💳 Paid</p>
                      </div>

                      <div className="flex justify-between items-center md:block md:text-right">
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                          ⏰ Est. 35 min
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          10:35 AM
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                          📢
                        </button>
                        <button className="w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center">
                          ⏭️
                        </button>
                        <button className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 md:p-8 transition-colors duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    👤 Business Profile
                  </h2>
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {isDisabled === true && (
                      <button onClick={handleEditProfile} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                        <span><MdEdit size={22}/></span>
                        Edit Profile
                      </button>
                    )}
                    <button onClick={handleDeleteAccount} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      <span><MdDelete size={22}/></span>
                      Delete Account
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b dark:border-gray-600 text-center md:text-left">
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#359487] dark:bg-[#C6FE02] rounded-full flex items-center justify-center text-white dark:text-black text-4xl font-bold">
                      {businessData?.name ? businessData.name.charAt(0).toUpperCase() : 'B'}
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#359487] dark:bg-[#C6FE02] rounded-full flex items-center justify-center text-white dark:text-black hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                      <IoCamera/>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{businessData?.name || 'Loading...'}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Business Account</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Member since {businessData?.createdAt ? new Date(businessData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🏢 Business Name
                    </label>
                    <input
                      type="text"
                      value={businessData?.name || ''}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📧 Email
                    </label>
                    <input
                      type="email"
                      value={businessData?.email || ''}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📱 Mobile Phone
                    </label>
                    <input
                      type="tel"
                      value={businessData?.mobilePhone || 'Not provided'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ☎️ Landline Phone
                    </label>
                    <input
                      type="tel"
                      value={businessData?.landlinePhone || 'Not provided'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📍 Address
                    </label>
                    <input
                      type="text"
                      value={businessData?.address || 'Not provided'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      💳 Payment Method
                    </label>
                    <input
                      type="text"
                      value={businessData?.paymentMethod || 'Not specified'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none capitalize"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🏥 Specialization
                    </label>
                    <input
                      type="text"
                      value={businessData?.specialization || 'Not specified'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ⏰ Working Time
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
                      {businessData?.workingHours && businessData.workingHours.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {businessData.workingHours.map((wh, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-black/20 rounded-lg">
                              <span className="font-medium capitalize">{wh.days}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {wh.isClosed ? 'Closed' : `${wh.openTime} - ${wh.closeTime}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Not specified</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🛠️ Services
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
                      {businessData?.service && businessData.service.length > 0 ? (
                        <div className="space-y-3">
                          {businessData.service.map((svc, index) => (
                            <div key={index} className="p-3 bg-white dark:bg-black/20 rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold">{svc.name}</h4>
                                <span className="bg-[#359487]/10 text-[#359487] dark:text-[#C6FE02] dark:bg-[#C6FE02]/10 px-2 py-0.5 rounded text-sm font-medium">
                                  {svc.price} EGP
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{svc.description}</p>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span>⏱️ {svc.duration} mins</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No services listed</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ⚙️ Queue Settings
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
                      {businessData?.queueSettings && businessData.queueSettings.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-white dark:bg-black/20 rounded-lg flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Max Clients per Day</span>
                            <span className="font-bold">{businessData.queueSettings[0].maxPatientsPerDay}</span>
                          </div>
                          <div className="p-3 bg-white dark:bg-black/20 rounded-lg flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Last Appointment</span>
                            <span className="font-bold">{businessData.queueSettings[0].LastTimeToAppoint}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No queue settings configured</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ✅ Account Status
                    </label>
                    <input
                      type="text"
                      value={businessData?.status || 'active'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none capitalize"
                      disabled = {isDisabled}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ⭐ Rating
                    </label>
                    <input
                      type="text"
                      value={businessData?.rating ? `${businessData.rating} / 5` : 'No ratings yet'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
                      disabled = {isDisabled}
                    />
                  </div>
                </div>
                {isDisabled === false && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveEdit}
                      className="mt-5 w-1/4 flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
                    >
                      <span><MdSave size={22}/></span>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab !== "dashboard" && activeTab !== "profile" && (
              <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 capitalize">
                  {activeTab}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This section is under development.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}