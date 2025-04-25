import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  isLoaded = true,
  sidebarCollapsed = false,
  setSidebarCollapsed = () => {},
}) => {
  const pathname = usePathname();
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-52";
  const translateClass = isLoaded ? "translate-x-0" : "-translate-x-full";

  // Main navigation items with paths
  const navItems = [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Patients", path: "/patients", icon: "user" },
    { name: "Learning", path: "/learning", icon: "book" },
    { name: "Feed", path: "/feed", icon: "feed" },
    { name: "Records", path: "/records", icon: "file" },
  ];

  // Additional utility links
  const utilityLinks = [
    { name: "Settings", path: "/settings", icon: "settings" },
    { name: "Help & Support", path: "/support", icon: "help" },
  ];

  return (
    <div
      className={`${sidebarWidthClass} rounded-2xl m-3 bg-black text-white flex flex-col transition-all duration-500 ${translateClass} z-30`}
    >
      {/* Toggle sidebar button */}
      <button
        className="absolute -right-3 top-24 bg-black text-white w-6 h-12 rounded-r flex items-center justify-center transition-transform duration-300 hover:scale-110 z-50"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {sidebarCollapsed ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
      </button>

      {/* Logo */}
      <div
        className={`pt-8 ${
          sidebarCollapsed ? "px-2" : "px-8"
        } pb-6 flex items-center`}
      >
        <Link href="/" className="flex items-center">
          <h1
            className={`text-2xl font-semibold transition-opacity duration-300 ${
              sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          ></h1>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className={`${sidebarCollapsed ? "px-2" : "px-4"} pt-6 flex-1`}>
        <div className="text-xs text-gray-500 uppercase mb-2 ml-2">
          {!sidebarCollapsed && "Main Menu"}
        </div>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "px-4"
                } text-sm cursor-pointer transition-all duration-200 hover:text-pink-300 py-3 ${
                  pathname === item.path
                    ? "bg-gray-900 bg-opacity-40 text-pink-300 rounded-lg"
                    : "text-gray-300"
                } group`}
              >
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`${
                      pathname === item.path ? "text-pink-300" : ""
                    } transition-transform duration-300 group-hover:scale-110`}
                    strokeWidth="1.5"
                  >
                    {item.icon === "home" && (
                      <>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </>
                    )}
                    {item.icon === "user" && (
                      <>
                        <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                        <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                      </>
                    )}
                    {item.icon === "book" && (
                      <>
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </>
                    )}
                    {item.icon === "feed" && (
                      <>
                        <line x1="17" y1="10" x2="3" y2="10"></line>
                        <line x1="21" y1="6" x2="3" y2="6"></line>
                        <line x1="21" y1="14" x2="3" y2="14"></line>
                        <line x1="17" y1="18" x2="3" y2="18"></line>
                      </>
                    )}
                    {item.icon === "file" && (
                      <>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </>
                    )}
                  </svg>

                  {/* Tooltip on hover when collapsed */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      {item.name}
                    </div>
                  )}
                </div>

                <span
                  className={`font-medium ml-3 transition-opacity duration-300 ${
                    sidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Utilities Section */}
        {!sidebarCollapsed && (
          <div className="mt-8">
            <div className="text-xs text-gray-500 uppercase mb-2 ml-2">
              Utilities
            </div>
            <ul className="space-y-3">
              {utilityLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 text-sm cursor-pointer transition-all duration-200 hover:text-pink-300 py-3 ${
                      pathname === item.path
                        ? "bg-gray-900 bg-opacity-40 text-pink-300 rounded-lg"
                        : "text-gray-300"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mr-3"
                    >
                      {item.icon === "settings" && (
                        <>
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </>
                      )}
                      {item.icon === "help" && (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </>
                      )}
                    </svg>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className={`mt-auto mb-4 ${sidebarCollapsed ? "px-2" : "px-4"}`}>
        {!sidebarCollapsed ? (
          <div className="flex items-center p-3 bg-gray-900 bg-opacity-40 rounded-lg">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Dr. Thomas</div>
              <div className="text-xs text-gray-400">Cardiologist</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
