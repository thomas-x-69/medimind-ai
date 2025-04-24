import React from "react";

const Sidebar = ({
  isLoaded,
  sidebarCollapsed,
  setSidebarCollapsed,
  activeNavItem,
  setActiveNavItem,
}) => {
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-52";
  const translateClass = isLoaded ? "translate-x-0" : "-translate-x-full";

  // Main navigation items - simplified to just 3
  const navItems = [
    { name: "Overview", icon: "home" },
    { name: "Patients", icon: "user" },
    { name: "Learning", icon: "book" },
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
        <h1
          className={`text-2xl font-semibold transition-opacity duration-300 ${
            sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          medimind
        </h1>
        <div
          className={`${
            sidebarCollapsed ? "ml-0" : "ml-2"
          } bg-pink-300 rounded-full w-5 h-5 flex items-center justify-center text-xs`}
        >
          ai
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`${sidebarCollapsed ? "px-2" : "px-8"} pt-6 flex-1`}>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-4"
              } text-sm cursor-pointer transition-all duration-200 hover:text-pink-300 py-2 px-2 ${
                activeNavItem === item.name
                  ? "text-pink-300 bg-gray-900 bg-opacity-40 rounded-lg"
                  : "text-gray-300"
              }`}
              onClick={() => setActiveNavItem(item.name)}
            >
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`${
                    activeNavItem === item.name ? "text-pink-300" : ""
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
                </svg>

                {/* Tooltip on hover when collapsed */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    {item.name}
                  </div>
                )}
              </div>

              <span
                className={`font-medium transition-opacity duration-300 ${
                  sidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
