"use client";

import BookingModal from '@/components/BookingModal';
import ServiceCard from '@/components/HomePage/ServiceCard';
import StatsCard from '@/components/HomePage/StatsCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslations } from '@/hooks/useTranslations';
import { ArrowRight, Building2, Calendar, Clock, Search, Sparkles, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/auth/me', {
          credentials: 'include',
        });
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/search/businesses?limit=12');
        const data = await response.json();
        setBusinesses(data.data?.businesses || []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/search/businesses?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setBusinesses(data.data?.businesses || []);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBookClick = (business) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setSelectedBusiness(business);
  };

  const handleCheckout = async () => {
    if (!selectedBusiness) return;
    
    setIsProcessing(true);
    try {
      // First, fetch the queue for this business
      const queueResponse = await fetch(`http://localhost:5000/api/v1/queues/business/${selectedBusiness._id}/queue`, {
        credentials: 'include',
      });

      if (!queueResponse.ok) {
        toast.error('Business queue not available');
        setIsProcessing(false);
        return;
      }

      const queueData = await queueResponse.json();
      const queueId = queueData.data?._id;

      if (!queueId) {
        toast.error('Queue not found for this business');
        setIsProcessing(false);
        return;
      }

      // Store booking details in session storage for payment page
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        businessId: selectedBusiness._id,
        businessName: selectedBusiness.name,
        queueId,
        type: 'examination',
        priority: 'normal'
      }));

      // Redirect to payment page
      window.location.href = '/payment';
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to proceed to checkout');
      setIsProcessing(false);
    }
  };

  const services = [
    { icon: Calendar, title: t('services.medical.title'), description: t('services.medical.description') },
    { icon: Building2, title: t('services.banks.title'), description: t('services.banks.description') },
    { icon: Users, title: t('services.government.title'), description: t('services.government.description') },
    { icon: Clock, title: t('services.telecom.title'), description: t('services.telecom.description') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A] pb-20 overflow-x-hidden">
      {/* Booking Modal */}
      {selectedBusiness && (
        <BookingModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
        />
      )}
      
      <div className="container w-full px-4 sm:px-6 lg:w-11/12 mx-auto max-w-full">
        
        {/* Hero Section */}
        <div className="relative pt-10">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-center text-[#359487] font-bold dark:text-[#C6FE02] dark:drop-shadow-[0_0_20px_rgba(198,254,2,0.6)] drop-shadow-[0_0_15px_rgba(53,148,135,0.4)] animate-fade-in mb-4 big-scale">
            {t('hero.title')}
          </h1>
          
          {/* Floating particles animation */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-8 lg:pt-12 max-w-full">
            
            {/* Left Content */}
            <div
              ref={heroRef}
              className={`flex flex-col items-center lg:items-start px-4 sm:px-6 space-y-6 transition-all duration-700 ${
                heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Animated dots */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#359487] dark:bg-[#C6FE02] animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#359487] dark:text-white">
                {t('hero.subtitle')}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col items-center lg:items-start sm:flex-row gap-4 pt-4">
                {!loading && (
                  <>
                    <Link href={isAuthenticated ? "/user" : "/login"}>
                      <button className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] px-8 py-3.5 rounded-xl text-white dark:text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {t('hero.bookAppointment')}
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      </button>
                    </Link>
                    
                    <Link href={isAuthenticated ? "/login/businessregister" : "/login"}>
                      <button className="cursor-pointer relative overflow-hidden bg-transparent border-2 border-[#359487] dark:border-[#C6FE02] text-[#359487] dark:text-[#C6FE02] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#359487] hover:text-white dark:hover:bg-[#C6FE02] dark:hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                        {t('hero.addBusiness')}
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-full">
                <StatsCard value="10K+" label={t('stats.activeUsers')} icon={Users} delay={0} />
                <StatsCard value="500+" label={t('stats.businesses')} icon={Building2} delay={100} />
                <StatsCard value="99.9%" label={t('stats.uptime')} icon={TrendingUp} delay={200} />
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-xxl animate-float">
                {/* <div className="absolute inset-0 bg-[#359487]/10 dark:bg-[#C6FE02]/10 rounded-full blur-3xl"></div>
                <div className="relative bg-white dark:bg-[#2A2825] p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-[#3A3835]">
                  <div className="aspect-square bg-gradient-to-br from-[#359487]/20 to-[#2a7569]/20 dark:from-[#C6FE02]/20 dark:to-[#a8d902]/20 rounded-2xl flex items-center justify-center"> */}
                    <Image
                    width={600}
                    height={600}
                    src="/./landingLight.png"
                    className="w-full h-auto dark:hidden object-contain"
                    alt="Queue management illustration"
                    priority
                  />
                  <Image
                    width={600}
                    height={600}
                    src="/./LandingDark.png"
                    className="w-full h-auto hidden dark:block object-contain"
                    alt="Queue management illustration"
                    priority
                  />
                  {/* </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="mt-24 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 dark:text-white">
              {t('services.title')}
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center gap-3 flex-wrap">
              <span>{t('services.subtitle')}</span>
              <div className="flex items-center gap-2 bg-[#359487]/10 dark:bg-[#C6FE02]/10 px-4 py-1.5 rounded-full">
                <Sparkles size={18} className="text-[#359487] dark:text-[#C6FE02]" />
                <span className="text-sm font-semibold text-[#359487] dark:text-[#C6FE02]">{t('services.aiPowered')}</span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input 
                type="text" 
                className="w-full rounded-2xl px-6 py-4 bg-white dark:bg-[#2A2825] border-2 border-gray-200 dark:border-[#3A3835] text-base focus:ring-2 focus:ring-[#359487] dark:focus:ring-[#C6FE02] focus:border-transparent placeholder:text-gray-400 dark:text-white shadow-lg transition-all duration-300 hover:shadow-xl pr-14" 
                placeholder={t('services.search')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-xl p-3 text-white dark:text-black hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-black border-t-transparent"></div>
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
          </div>
          
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Available Businesses Section */}
        <div className="mt-24 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Browse Businesses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find and book appointments at your favorite locations
            </p>
          </div>

          {/* Businesses Grid */}
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {businesses.map((business) => (
                <div 
                  key={business._id} 
                  className="bg-white dark:bg-[#2b2825] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {/* Business Header */}
                  <div className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-6">
                    <h3 className="text-2xl font-bold text-white dark:text-black mb-2">
                      {business.name}
                    </h3>
                    <p className="text-white/90 dark:text-black/80 text-sm">
                      {business.specialization || business.category || "General Service"}
                    </p>
                  </div>

                  {/* Business Details */}
                  <div className="p-6 space-y-4">
                    {/* Description */}
                    {business.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                        {business.description}
                      </p>
                    )}

                    {/* Info Grid */}
                    <div className="space-y-3">
                      {/* Address */}
                      {business.address && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                            <Building2 size={16} className="text-[#359487] dark:text-[#C6FE02]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
                            <p className="text-sm text-gray-800 dark:text-white font-medium">
                              {business.address.street && `${business.address.street}, `}
                              {business.address.city || 'Not specified'}
                              {business.address.state && `, ${business.address.state}`}
                              {business.address.zipCode && ` ${business.address.zipCode}`}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {business.email && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#359487] dark:text-[#C6FE02]">✉️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                            <p className="text-sm text-gray-800 dark:text-white font-medium truncate">
                              {business.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Contact */}
                      {business.phoneNumber && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#359487] dark:text-[#C6FE02]">📞</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                            <p className="text-sm text-gray-800 dark:text-white font-medium">
                              {business.phoneNumber}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Working Hours */}
                      {business.workingHours && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                            <Clock size={16} className="text-[#359487] dark:text-[#C6FE02]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hours</p>
                            <p className="text-sm text-gray-800 dark:text-white font-medium">
                              {business.workingHours.open && business.workingHours.close 
                                ? `${business.workingHours.open} - ${business.workingHours.close}`
                                : 'Hours not specified'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Rating & Status */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                          {business.rating !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                {business.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${business.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`text-sm font-medium ${business.isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {business.isOpen ? 'Open Now' : 'Closed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookClick(business)}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                    >
                      <Calendar size={18} />
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#2b2825] rounded-xl shadow-md max-w-2xl mx-auto">
              <Clock size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Businesses Available</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back later for available businesses</p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 px-4 max-w-full">
          <div className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-3xl p-8 md:p-12 text-center shadow-2xl max-w-full">
            <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg text-white/90 dark:text-black/80 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <button className="bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
              {t('cta.button')}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(var(--x), var(--y));
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.3;
          animation: particle-float 8s ease-in-out infinite;
        }

        .particle-1 {
          background: #359487;
          top: 20%;
          left: 10%;
          --x: 30px;
          --y: -40px;
          animation-delay: 0s;
        }

        .particle-2 {
          background: #C6FE02;
          top: 60%;
          left: 80%;
          --x: -50px;
          --y: 30px;
          animation-delay: 1s;
        }

        .particle-3 {
          background: #359487;
          top: 40%;
          left: 90%;
          --x: 20px;
          --y: -50px;
          animation-delay: 2s;
        }

        .particle-4 {
          background: #C6FE02;
          top: 80%;
          left: 20%;
          --x: -40px;
          --y: -20px;
          animation-delay: 3s;
        }

        .particle-5 {
          background: #359487;
          top: 30%;
          left: 50%;
          --x: 35px;
          --y: 45px;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
