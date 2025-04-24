import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdSchedule,
  MdPeople,
  MdInsights,
  MdSchool,
  MdArticle,
  MdChat,
  MdPayments,
  MdOutlineInsertDriveFile,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      section: "General",
      items: [
        { name: "Dashboard", icon: <MdDashboard size={20} />, path: "/" },
        { name: "Schedule", icon: <MdSchedule size={20} />, path: "/schedule" },
        { name: "Patients", icon: <MdPeople size={20} />, path: "/patients" },
        {
          name: "Statistics & reports",
          icon: <MdInsights size={20} />,
          path: "/statistics",
        },
        { name: "Education", icon: <MdSchool size={20} />, path: "/education" },
        {
          name: "My articles",
          icon: <MdArticle size={20} />,
          path: "/articles",
        },
      ],
    },
    {
      section: "Tools",
      items: [
        { name: "Chats & calls", icon: <MdChat size={20} />, path: "/chats" },
        { name: "Billing", icon: <MdPayments size={20} />, path: "/billing" },
        {
          name: "Documents base",
          icon: <MdOutlineInsertDriveFile size={20} />,
          path: "/documents",
        },
        { name: "Settings", icon: <MdSettings size={20} />, path: "/settings" },
      ],
    },
  ];

  return (
    <aside className="w-[210px] h-screen bg-[#1A1F2B] text-white flex flex-col">
      <div className="p-6 pl-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">intelly</span>
          <div className="w-5 h-5 bg-pink-400 rounded-full ml-2 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="px-8 text-xs text-gray-400 uppercase mb-3">
              {section.section}
            </p>
            <ul>
              {section.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.name} className="px-3">
                    <Link
                      href={item.path}
                      className={`flex items-center px-5 py-3 text-sm rounded-md ${
                        isActive
                          ? "bg-[#5669FF] bg-opacity-10 text-[#5669FF] border-l-4 border-[#5669FF]"
                          : "text-gray-300 hover:bg-white hover:bg-opacity-5"
                      }`}
                    >
                      <span
                        className={`mr-3 ${
                          isActive ? "text-[#5669FF]" : "text-gray-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-6 px-8 mt-auto">
        <button className="flex items-center text-gray-300 hover:text-white">
          <MdLogout className="mr-3 text-xl" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
