"use client";

import { Button } from '@/components/ui/button'; 
import React, { useState, useRef } from 'react'; 
import { FiMessageSquare, FiPhone, FiSend } from "react-icons/fi"; 
import { IoMdTime } from 'react-icons/io'; 
import { MdOutlineEmail } from "react-icons/md"; 
import { BsQuestionCircle } from "react-icons/bs"; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import emailjs from '@emailjs/browser';


const Page = () => {
    const form = useRef();
    const [toast, setToast] = useState({ show: false, type: "success", message: "" });

    const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
    setToast((t) => ({ ...t, show: false }));
    }, 3000); 
    };

    const nameRegex = /^[\p{L}\s]{3,30}$/u; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{11}$/;
    const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
    });

    const sendEmail = (e) => {
    e.preventDefault();

    const firstName = form.current.name.value.trim();
    const lastName = form.current.last_name.value.trim();
    const email = form.current.user_email.value.trim();
    const phone = form.current.user_phone.value.trim();
    const message = form.current.message.value.trim();

    const newErrors = { firstName: "", lastName: "", email: "", phone: "", message: "" };
    let hasError = false;

    if (!nameRegex.test(firstName)) {
    newErrors.firstName = "Please enter a valid first name.";
    hasError = true;
    }

    if (!nameRegex.test(lastName)) {
    newErrors.lastName = "Please enter a valid last name.";
    hasError = true;
    }

    if (!emailRegex.test(email)) {
    newErrors.email = "Please enter a valid email address.";
    hasError = true;
    }

    if (!phoneRegex.test(phone)) {
    newErrors.phone = "Please enter a valid phone number.";
    hasError = true;
    }

    if (message.length < 10) {
    newErrors.message = "Message should be at least 10 characters.";
    hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    emailjs
    .send(
    "service_stzzgp7", 
    "template_0l6hqcg", 
    {
        name: name,
        user_phone: phone,
        user_email: email,
        message: message
    },
    "aFgvqEvdcPcxOsnQn" 
    )
    .then(() => {
    showToast("success", "Message sent successfully!");
    form.current.reset();
    })
    .catch((error) => {
    console.log(error);
    showToast("error", "Something went wrong, please try again.");
    });
};
    return ( 
        <div className="pb-20 bg-[#F3F3F3] dark:bg-gradient-to-b dark:from-[#181715] dark:to-[#1F1D1A]"> 
            <div className="text-center pt-10 mb-10"> 
                <h1 className="md:text-6xl text-5xl pb-5 dark:text-[#C6FE02] dark:drop-shadow-[0_0_10px_rgba(198,254,2,0.5)]">
                    Get in Touch
                </h1> 
                <p className='md:text-[20px] text-[17px] text-gray-600 px-6 md:px-0 dark:text-gray-300'>
                    Have questions? We are here to help. Reach out to us anytime.
                </p> 
            </div> 

            {toast.show && (
            <div  className={`fixed top-5 md:top-10 left-[23%] md:left-[43%] w-1/2 md:w-1/6 mx-auto z-50 px-4 py-3 rounded-lg shadow-lg text-sm
                ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                {toast.message}
            </div>
            )}

            <div className='lg:grid lg:grid-cols-3 mx-6 gap-8'>
                <form 
            onSubmit={sendEmail} ref={form}                    
                    className="
                        border border-gray-300
                        dark:border-[#3A3734]
                        md:col-span-2 
                        rounded-2xl p-8 
                        dark:bg-[#2B2927]
                        dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
                    "
                > 
                    <p className='flex items-end text-[17px] mb-10 dark:text-white'>
                        <span className='me-1'>
                            <FiMessageSquare size={21} className="text-[#359487] dark:text-[#C6FE02]" />
                        </span> 
                        Send Us a Message
                    </p> 

                    <div className='grid md:grid-cols-2 gap-5'> 
                        <div> 
                            <Label htmlFor="Customer-fName" className='block font-medium mb-2 dark:text-white'>First Name *</Label> 
                            <Input
                                name="name"
                                id="Customer-fName"
                                type='text' 
                                className='
                                    border border-gray-300 
                                    dark:border-[#4A4744]
                                    dark:bg-[#1E1D1A]
                                    dark:text-white
                                    w-full rounded-md p-2
                                    dark:focus:ring-2 dark:focus:ring-[#C6FE02] dark:outline-none
                                ' 
                            /> 
                        <span className="text-red-500 py-2">{errors.firstName}</span>
                        </div> 

                        <div> 
                            <Label htmlFor="Customer-lName" className='block font-medium mb-2 dark:text-white'>Last Name *</Label> 
                            <Input 
                                name="last_name"
                                id="Customer-lName"
                                type="text"
                                className='
                                    border border-gray-300 
                                    dark:border-[#4A4744]
                                    dark:bg-[#1E1D1A]
                                    dark:text-white
                                    w-full rounded-md p-2
                                    dark:focus:ring-2 dark:focus:ring-[#C6FE02] dark:outline-none
                                ' 
                            /> 
                            <span className="text-red-500 py-2">{errors.lastName}</span>
                        </div> 

                        <div> 
                            <Label htmlFor="Customer-email" className='block font-medium mb-2 dark:text-white'>Email *</Label> 
                            <Input 
                                name="user_email"
                                id="Customer-email"
                                type="email"
                                className='
                                    border border-gray-300 
                                    dark:border-[#4A4744]
                                    dark:bg-[#1E1D1A]
                                    dark:text-white
                                    w-full rounded-md p-2
                                    dark:focus:ring-2 dark:focus:ring-[#C6FE02] dark:outline-none
                                ' 
                            /> 
                            <span className="text-red-500 py-2">{errors.email}</span>
                        </div> 
                        <div> 
                            <Label htmlFor="Customer-phone" className='block font-medium mb-2 dark:text-white'>Phone Number *</Label> 
                            <Input 
                                name="user_phone"
                                id="Customer-phone"
                                type='number' 
                                className='
                                    border border-gray-300 
                                    dark:border-[#4A4744]
                                    dark:bg-[#1E1D1A]
                                    dark:text-white
                                    w-full rounded-md p-2
                                    dark:focus:ring-2 dark:focus:ring-[#C6FE02] dark:outline-none
                                ' 
                            /> 
                            <span className="text-red-500 py-2">{errors.phone}</span>
                        </div> 
                        <div className='md:col-span-2'> 
                            <Label htmlFor="Customer-message" className='block font-medium mb-2 dark:text-white'>Message *</Label> 
                            <Textarea 
                                name="message"
                                rows={7}
                                id="Customer-message"
                                className='
                                    border border-gray-300 
                                    dark:border-[#4A4744]
                                    dark:bg-[#1E1D1A]
                                    dark:text-white
                                    w-full rounded-md p-2 resize-none
                                    dark:focus:ring-2 dark:focus:ring-[#C6FE02] dark:outline-none
                                '
                            />
                        </div> 
                <span className="text-red-500 block">{errors.message}</span>
                        <Button className="
                            bg-[#359487] 
                            dark:bg-[#C6FE02] dark:text-black 
                            dark:hover:bg-[#e4ff37]
                            md:col-span-2
                            flex items-center gap-2
                        "
                        type="submit">
                            <FiSend />
                            Send Message
                        </Button> 
                    </div> 
                </form> 

                <div 
                    className='
                        my-5
                        lg:my-0
                        w-full p-8 
                        border border-gray-300 dark:border-[#3A3734] 
                        rounded-2xl
                        dark:bg-[#2C2A27]
                        dark:shadow-[0_0_12px_rgba(0,0,0,0.35)]
                    '
                > 
                    <h1 className='text-2xl mb-10 dark:text-white'>Contact Information</h1> 

                    <div className='flex'> 
                        <span className='bg-[#359487] text-white dark:bg-[#3D3A36] p-3 rounded-2xl me-3 mb-10'>
                            <MdOutlineEmail size={25} className='dark:text-[#C6FE02]' />
                        </span> 
                        <div> 
                            <p className='text-gray-600 dark:text-gray-300'>Email</p> 
                            <p className='dark:text-white'>support@queuems.com</p> 
                        </div> 
                    </div> 

                    <div className='flex'> 
                        <span className='bg-[#359487] text-white dark:bg-[#3D3A36] p-3 rounded-2xl me-3 mb-10'>
                            <FiPhone size={25} className='dark:text-[#C6FE02]' />
                        </span> 
                        <div> 
                            <p className='text-gray-600 dark:text-gray-300'>Phone</p> 
                            <p className='dark:text-white'>+20 1012345678</p> 
                        </div> 
                    </div> 

                    <div className='flex'> 
                        <span className='bg-[#359487] text-white dark:bg-[#3D3A36] p-3 rounded-2xl me-3 mb-10'>
                            <IoMdTime size={25} className='dark:text-[#C6FE02]' />
                        </span> 
                        <div> 
                            <p className='text-gray-600 dark:text-gray-300'>Business Hours</p> 
                            <p className='dark:text-white'>24 / 7</p> 
                        </div> 
                    </div> 
                </div> 

                <div 
                    className='
                        md:col-span-3 p-8 
                        border border-gray-300 dark:border-[#3A3734] 
                        rounded-2xl
                        dark:bg-[#2B2927]
                        dark:shadow-[0_0_12px_rgba(0,0,0,0.35)]
                    '
                > 
                    <p className='flex items-center text-[18px] mb-10 dark:text-white'>
                        <span className='me-2'>
                            <BsQuestionCircle size={20} className='text-[#359487] dark:text-[#C6FE02]' />
                        </span>
                        Frequently Asked Questions
                    </p> 

                    <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl mb-5'> 
                        <p className='text-[17px] dark:text-white'>How do I book an appointment?</p> 
                        <p className='text-gray-600 dark:text-gray-300'>
                            Simply search for your desired service, select a time slot, and complete the booking process. 
                        </p> 
                    </div> 

                    <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl mb-5'> 
                        <p className='text-[17px] dark:text-white'>Can I cancel or reschedule my appointment?</p> 
                        <p className='text-gray-600 dark:text-gray-300'>
                            Yes, you can cancel or reschedule up to 1 hour before the appointment.
                        </p> 
                    </div> 

                    <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl mb-5'> 
                        <p className='text-[17px] dark:text-white'>How does the queue system work?</p> 
                        <p className='text-gray-600 dark:text-gray-300'>
                            Our smart queue system assigns you a position and updates in real-time.
                        </p> 
                    </div> 

                    <div className='w-full bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl mb-5'> 
                        <p className='text-[17px] dark:text-white'>Is there a fee for using the service?</p> 
                        <p className='text-gray-600 dark:text-gray-300'>
                            Basic appointments include a small fee. Priority options may cost extra.
                        </p> 
                    </div> 
                </div> 
            </div> 
        </div> 
    ); 
} 

export default Page;
