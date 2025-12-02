import React from 'react'
import { GrMoney } from "react-icons/gr";
import { FaUsersRays } from "react-icons/fa6";
import { TbUserShield } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import UnitCard from '@/components/UnitCard';
import { v4 as uuid } from 'uuid';
import SalesOverview from '@/components/SalesOverview';

const icons =[<GrMoney />, <FaUsersRays />, <TbUserShield />, <FaChartLine />]
export default function page() {

const topProducts = [
  { name: "Premium Widget", category: "Electronics", sales: 342 },
  { name: "Deluxe Package", category: "Services", sales: 289 },
  { name: "Starter Kit", category: "Accessories", sales: 256 },
  { name: "Pro Bundle", category: "Software", sales: 198 },
  { name: "Basic Plan", category: "Subscription", sales: 167 },
];

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new order #5847",
    time: "2 mins ago",
    status: "success",
  },{
    id: 2,
    user: "Sarah Smith",
    action: "Updated customer profile",
    time: "15 mins ago",
    status: "success",
  },{
    id: 3,
    user: "Mike Johnson",
    action: "Payment processing",
    time: "1 hour ago",
    status: "pending",
  },{
    id: 4,
    user: "Emma Wilson",
    action: "Completed shipment #2849",
    time: "2 hours ago",
    status: "success",
  },{
    id: 5,
    user: "David Brown",
    action: "Failed login attempt",
    time: "3 hours ago",
    status: "error",
  },{
    id: 6,
    user: "Lisa Anderson",
    action: "Generated monthly report",
    time: "4 hours ago",
    status: "success",
  },
];

const statusClasses = {
  success: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

  return (
  <div className="min-h-screen  bg-[#F3F3F3] dark:bg-[#221F1B] text-black dark:text-[white] p-6 container mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-100 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>
      <div className='flex flex-wrap justify-center gap-6'>
        
          {icons.map((icon) => (
     <UnitCard icon={icon} key={uuid()}></UnitCard>
))}
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full md:w-[85%] mx-auto">
         <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Sales Overview
          </h2>
          <SalesOverview/>
          </div>

            <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-[#359487] dark:from-green-600 dark:to-[#b4f221] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {product.sales}
                  </p>
                  <p className="text-xs text-gray-500">sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
</div>

         <div className="bg-white rounded-lg shadow p-6 w-full md:w-[85%] mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Action
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {activity.user.charAt(0)}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {activity.user}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {activity.action}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {activity.time}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusClasses[activity.status]
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


</div>
  );
}
