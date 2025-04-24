import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Calendar,
  Users,
  BarChart2,
  GraduationCap,
  FileText,
  MessageSquare,
  DollarSign,
  FolderClosed,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ collapsed = false, toggleCollapsed }) => {
  const pathname = usePathname();
  const [activeNavItem, setActiveNavItem] = React.useState("Dashboard");

  const menuItems = [
    {
      section: "General",
      items: [
        { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/" },
        { name: "Schedule", icon: <Calendar size={20} />, path: "/schedule" },
        { name: "Patients", icon: <Users size={20} />, path: "/patients" },
        {
          name: "Statistics & reports",
          icon: <BarChart2 size={20} />,
          path: "/statistics",
        },
        {
          name: "Education",
          icon: <GraduationCap size={20} />,
          path: "/education",
        },
        {
          name: "My articles",
          icon: <FileText size={20} />,
          path: "/articles",
        },
      ],
    },
    {
      section: "Tools",
      items: [
        {
          name: "Chats & calls",
          icon: <MessageSquare size={20} />,
          path: "/chats",
        },
        { name: "Billing", icon: <DollarSign size={20} />, path: "/billing" },
        {
          name: "Documents base",
          icon: <FolderClosed size={20} />,
          path: "/documents",
        },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
      ],
    },
  ];

  return (
    <aside className="w-[210px] h-screen bg-[#1A1F2B] text-white flex flex-col relative">
      {/* Toggle sidebar button */}
      {collapsed && (
        <button
          className="absolute -right-3 top-24 bg-black text-white w-6 h-12 rounded-r flex items-center justify-center transition-transform duration-300 hover:scale-110 z-50"
          onClick={toggleCollapsed}
        >
          <ChevronRight size={14} />
        </button>
      )}

      {!collapsed && (
        <button
          className="absolute -right-3 top-24 bg-black text-white w-6 h-12 rounded-r flex items-center justify-center transition-transform duration-300 hover:scale-110 z-50"
          onClick={toggleCollapsed}
        >
          <ChevronLeft size={14} />
        </button>
      )}

      <div className="p-6 pl-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">medimind</span>
          <div className="w-5 h-5 bg-pink-400 rounded-full ml-2 relative overflow-hidden flex items-center justify-center">
            <span className="text-white text-xs font-bold">ai</span>
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
                const isActive =
                  pathname === item.path || activeNavItem === item.name;
                return (
                  <li key={item.name} className="px-3">
                    <Link
                      href={item.path}
                      className={`flex items-center px-5 py-3 text-sm rounded-md ${
                        isActive
                          ? "bg-[#5669FF] bg-opacity-10 text-[#5669FF] border-l-4 border-[#5669FF]"
                          : "text-gray-300 hover:bg-white hover:bg-opacity-5"
                      }`}
                      onClick={() => setActiveNavItem(item.name)}
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
          <LogOut className="mr-3 text-xl" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
