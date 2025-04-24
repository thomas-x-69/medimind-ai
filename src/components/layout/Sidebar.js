import React from "react";

const Sidebar = ({
  isLoaded,
  sidebarCollapsed,
  setSidebarCollapsed,
  activeNavItem,
  setActiveNavItem,
  openModal,
}) => {
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-52";
  const translateClass = isLoaded ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className={`${sidebarWidthClass} bg-black text-white flex flex-col transition-all duration-500 ${translateClass} z-30`}
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
          } bg-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse`}
        >
          ai
        </div>
      </div>

      {/* Navigation */}
      <div className={`${sidebarCollapsed ? "px-2" : "px-8"} pt-6`}>
        <p
          className={`text-gray-500 text-xs mb-4 transition-opacity duration-300 ${
            sidebarCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          General
        </p>
        <ul className="space-y-5">
          {[
            { name: "Dashboard", icon: "grid" },
            { name: "Schedule", icon: "calendar" },
            { name: "Patients", icon: "user" },
            { name: "Statistics & reports", icon: "chart" },
            { name: "Education", icon: "book" },
            { name: "My articles", icon: "article" },
          ].map((item) => (
            <li
              key={item.name}
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-3"
              } text-sm cursor-pointer transition-all duration-200 hover:text-pink-400 group ${
                activeNavItem === item.name ? "text-pink-500" : ""
              }`}
              onClick={() => setActiveNavItem(item.name)}
            >
              <div className="relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`${
                    activeNavItem === item.name ? "text-pink-500" : ""
                  } transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon === "grid" && (
                    <>
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                  {item.icon === "calendar" && (
                    <>
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        strokeWidth="1.5"
                      />
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
                    </>
                  )}
                  {item.icon === "user" && (
                    <>
                      <path
                        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                  {item.icon === "chart" && (
                    <>
                      <path d="M18 20V10" strokeWidth="1.5" />
                      <path d="M12 20V4" strokeWidth="1.5" />
                      <path d="M6 20v-6" strokeWidth="1.5" />
                    </>
                  )}
                  {item.icon === "book" && (
                    <>
                      <path
                        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                  {item.icon === "article" && (
                    <>
                      <path
                        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                        strokeWidth="1.5"
                      />
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
                className={`${
                  activeNavItem === item.name ? "text-pink-500" : ""
                } transition-opacity duration-300 ${
                  sidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${sidebarCollapsed ? "px-2" : "px-8"} pt-8`}>
        <p
          className={`text-gray-500 text-xs mb-4 transition-opacity duration-300 ${
            sidebarCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Tools
        </p>
        <ul className="space-y-5">
          {[
            { name: "Chats & calls", icon: "message" },
            { name: "Billing", icon: "dollar" },
            { name: "Documents base", icon: "folder" },
            { name: "Settings", icon: "settings" },
          ].map((item) => (
            <li
              key={item.name}
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-3"
              } text-sm cursor-pointer transition-all duration-200 hover:text-pink-400 group`}
              onClick={() => {
                setActiveNavItem(item.name);
                if (item.name === "Settings") {
                  openModal("settings");
                }
              }}
            >
              <div className="relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  {item.icon === "message" && (
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      strokeWidth="1.5"
                    />
                  )}
                  {item.icon === "dollar" && (
                    <>
                      <line x1="12" y1="1" x2="12" y2="23" strokeWidth="1.5" />
                      <path
                        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                  {item.icon === "folder" && (
                    <path
                      d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                      strokeWidth="1.5"
                    />
                  )}
                  {item.icon === "settings" && (
                    <>
                      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        strokeWidth="1.5"
                      />
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
                className={`transition-opacity duration-300 ${
                  sidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`mt-auto ${sidebarCollapsed ? "px-2" : "px-8"} pb-10`}>
        <div
          className={`flex items-center ${
            sidebarCollapsed ? "justify-center" : "space-x-3"
          } text-sm cursor-pointer transition-all duration-200 hover:text-pink-400 group`}
        >
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                strokeWidth="1.5"
              />
              <polyline points="16 17 21 12 16 7" strokeWidth="1.5" />
              <line x1="21" y1="12" x2="9" y2="12" strokeWidth="1.5" />
            </svg>

            {/* Tooltip on hover when collapsed */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                Log out
              </div>
            )}
          </div>
          <span
            className={`transition-opacity duration-300 ${
              sidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            }`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
