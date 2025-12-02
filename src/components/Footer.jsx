"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  const pathName = usePathname();
  if(pathName === '/login' || pathName === '/login/businessregister' || pathName === '/login/customerregister'){
    return null;
  }
  return (
    <footer className="bg-white border-t-2 border-t-gray-300 dark:bg-[#1a1815] text-gray-700 dark:text-gray-300 border-gray-600 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#359487] dark:text-[#C6FE02]">
              QuickQueue
            </h3>
            <p className="text-sm leading-relaxed">
              Manage your time efficiently with our smart queue management system. Book appointments easily at various locations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex items-center justify-center hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex items-center justify-center hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex items-center justify-center hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex items-center justify-center hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div> */}

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MdLocationOn className="text-[#359487] dark:text-[#C6FE02] mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">
                  123 Queue Street, Cairo, Egypt
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <MdPhone className="text-[#359487] dark:text-[#C6FE02] flex-shrink-0" size={18} />
                <span className="text-sm">
                  +20 123 456 7890
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <MdEmail className="text-[#359487] dark:text-[#C6FE02] flex-shrink-0" size={18} />
                <span className="text-sm">
                  info@quickqueue.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 QuickQueue. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#359487] dark:hover:text-[#C6FE02] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;