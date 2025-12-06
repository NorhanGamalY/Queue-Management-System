"use client";
import AnimatedFeatureCard from '@/components/AboutPage/AnimatedFeatureCard';
import AnimatedStatCard from '@/components/AboutPage/AnimatedStatCard';
import MissionVisionCard from '@/components/AboutPage/MissionVisionCard';
import SectionTitle from '@/components/AboutPage/SectionTitle';
import ValueCard from '@/components/AboutPage/ValueCard';
import { useTranslations } from '@/hooks/useTranslations';
import { Shield, Users } from "lucide-react";
import { BsLightning } from "react-icons/bs";
import { FiAward } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { MdOutlinePeopleAlt, MdOutlineTrendingUp } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export default function Page() {
  const { t } = useTranslations();
  
  const statics = [
    { icon: <MdOutlinePeopleAlt />, title: t('about.stats.businesses'), value: "500+" },
    { icon: <FiAward />, title: t('about.stats.awards'), value: "120+" },
    { icon: <IoMdTime />, title: t('about.stats.waitTime'), value: "60%" },
    { icon: <MdOutlineTrendingUp />, title: t('about.stats.uptime'), value: "99%" }
  ];
  
  const advantages = [
    { icon: <BsLightning />, title: t('about.whyChooseUs.realTime.title'), description: t('about.whyChooseUs.realTime.description') },
    { icon: <Shield />, title: t('about.whyChooseUs.secure.title'), description: t('about.whyChooseUs.secure.description') },
    { icon: <TbWorld />, title: t('about.whyChooseUs.multiLanguage.title'), description: t('about.whyChooseUs.multiLanguage.description') },
    { icon: <Users />, title: t('about.whyChooseUs.integration.title'), description: t('about.whyChooseUs.integration.description') },
    { icon: <IoMdTime />, title: t('about.whyChooseUs.scheduling.title'), description: t('about.whyChooseUs.scheduling.description') },
    { icon: <MdOutlinePeopleAlt />, title: t('about.whyChooseUs.analytics.title'), description: t('about.whyChooseUs.analytics.description') }
  ];
  
  const values = [
    { title: t('about.values.innovation.title'), description: t('about.values.innovation.description') },
    { title: t('about.values.customerFirst.title'), description: t('about.values.customerFirst.description') },
    { title: t('about.values.reliability.title'), description: t('about.values.reliability.description') },
    { title: t('about.values.transparency.title'), description: t('about.values.transparency.description') }
  ];
  
  return (
    <div className="bg-[#F3F3F3] dark:bg-gradient-to-b dark:from-[#181715] dark:to-[#1F1D1A] overflow-hidden">
      {/* Hero Section */}
      <div className="w-[90%] md:w-[70%] mx-auto text-center pt-16 mb-12">
        <h1 className="text-[#359487] font-bold text-5xl md:text-7xl py-6 dark:text-[#C6FE02] dark:drop-shadow-[0_0_20px_rgba(198,254,2,0.6)] animate-fade-in">
          {t('about.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 animate-fade-in-up">
          {t('about.subtitle')}
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-wrap justify-center items-center gap-6 py-12">
        {statics.map((stat, index) => (
          <AnimatedStatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            delay={index * 100}
          />
        ))}
      </div>
      
      {/* Mission & Vision */}
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-wrap justify-center items-stretch gap-6 py-12">
        <MissionVisionCard
          title={t('about.mission.title')}
          value={t('about.mission.description')}
          delay={0}
        />
        <MissionVisionCard
          title={t('about.vision.title')}
          value={t('about.vision.description')}
          delay={200}
        />
      </div>
      
      {/* Why Choose Us */}
      <div className="w-[90%] md:w-[80%] mx-auto py-16">
        <div className="text-center mb-12">
          <SectionTitle>{t('about.whyChooseUs.title')}</SectionTitle>
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {advantages.map((advantage, index) => (
            <AnimatedFeatureCard
              key={index}
              icon={advantage.icon}
              title={advantage.title}
              description={advantage.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
      
      {/* Our Values */}
      <div className="w-[90%] md:w-[80%] mx-auto py-16 pb-20">
        <div className="text-center mb-12">
          <SectionTitle>{t('about.values.title')}</SectionTitle>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              delay={index * 100}
            />
          ))}
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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}