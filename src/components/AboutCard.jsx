import React from 'react'

export default function AboutCard({ icon, title, value, fontSize, showBorder}) {
  return (
    <>
      <div className={`w-[48%] md:w-1/5 py-3 border flex flex-col justify-evenly items-center min-h-[120px] 
        px-5 bg-white dark:bg-[#181715]         ${showBorder ? " border-gray-600 dark:border-gray-300" : ""}
        rounded-md`}>
            <span className={`text-[#359487] dark:text-[#C6FE02] text-[48px] mb-2`}>{icon}</span>
            <p className={`${fontSize}`}>{value}</p>
            <p className='text-gray-600 dark:text-gray-300 text-center text-[13px]'>{title}</p>
        </div>

    </>
  )
}
