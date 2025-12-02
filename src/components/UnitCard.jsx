import React from 'react'

export default function UnitCard({icon}) {
  return (
    <>
       <div className="w-[45%] md:w-1/5  gap-6 mb-8">
          <div
            className={`bg-white rounded-lg shadow p-6 border-l-4 transition-transform duration-300 transform hover:scale-110 border-gray-600 dark:border-gray-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
title
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  value
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-[#359487] dark:bg-gray-700 dark:text-[#C6FE02]`}
              >
                <span className="text-xl">{icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className="text-sm font-semibold 
                  text-green-600"
                
              >
                ↑ : ↓ %
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
      </div>
    </>
  )
}
