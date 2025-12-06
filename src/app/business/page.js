"use client";

import DashboardTab from '@/components/BusinessDashboard/DashboardTab';
import PatientsTab from '@/components/BusinessDashboard/PatientsTab';
import PaymentsTab from '@/components/BusinessDashboard/PaymentsTab';
import PlaceholderTab from '@/components/BusinessDashboard/PlaceholderTab';
import ProfileTab from '@/components/BusinessDashboard/ProfileTab';
import ReviewsTab from '@/components/BusinessDashboard/ReviewsTab';
import Sidebar from '@/components/BusinessDashboard/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTranslations } from '@/hooks/useTranslations';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from 'react';
import { FaBars, FaCalendarAlt, FaCreditCard, FaTimes, FaUser, FaUsers } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdReviews } from 'react-icons/md';
import { SiGoogleanalytics } from "react-icons/si";

export default function ClinicDashboard() {
  const { t } = useTranslations();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navItems = [
    { id: "dashboard", label: t('businessDashboard.nav.dashboard'), icon: <SiGoogleanalytics /> },
    { id: "patients", label: "Customers", icon: <FaUsers /> },
    { id: "schedule", label: t('businessDashboard.nav.schedule'), icon: <FaCalendarAlt /> },
    { id: "payments", label: t('businessDashboard.nav.payments'), icon: <FaCreditCard /> },
    { id: "reviews", label: t('businessDashboard.nav.reviews'), icon: <MdReviews /> },
    { id: "profile", label: t('businessDashboard.nav.profile'), icon: <FaUser /> },
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

  useEffect(() => {
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
                    {t('userDashboard.confirmDelete')}
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => setOpenModal(false)}>
                      Yes, I&apos;m sure
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
      <ProtectedRoute allowedRoles={['business']}>
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#221F1B] transition-colors duration-300">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-[#2b2825] p-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('businessDashboard.nav.dashboard')}</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-white focus:outline-none">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="flex relative">
          {/* Sidebar Component */}
          <Sidebar 
            navItems={navItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
            {activeTab === "dashboard" && <DashboardTab businessData={businessData} />}

            {activeTab === "patients" && <PatientsTab businessId={businessData?._id} />}

            {activeTab === "payments" && <PaymentsTab businessId={businessData?._id} />}

            {activeTab === "reviews" && <ReviewsTab businessId={businessData?._id} />}

            {activeTab === "profile" && (
              <ProfileTab 
                businessData={businessData}
                isDisabled={isDisabled}
                handleEditProfile={handleEditProfile}
                handleDeleteAccount={handleDeleteAccount}
                handleSaveEdit={handleSaveEdit}
                refreshBusinessData={fetchBusinessData}
              />
            )}

            {activeTab === "schedule" && (
              <PlaceholderTab tabName={activeTab} />
            )}
          </main>
        </div>
      </div>
      </ProtectedRoute>
    </>
  );
}
