import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({
  children,
  isDarkMode,
  toggleDarkMode,
  isLoaded,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [liveTimeUpdate, setLiveTimeUpdate] = useState(
    new Date().toLocaleTimeString()
  );
  const [pendingAlert, setPendingAlert] = useState(false);
  const [nextPatientTimer, setNextPatientTimer] = useState(15);

  // Update the time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveTimeUpdate(new Date().toLocaleTimeString());
    }, 1000);

    // Show a notification after initial load
    setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Base styling classes
  const baseClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-[#F5F5F7] text-[#1A1F2B]";
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-[210px]";
  const translateClass = isLoaded ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className={`flex h-screen overflow-hidden ${baseClasses} transition-colors duration-500`}
    >
      {/* Sidebar with toggle functionality */}
      <div
        className={`${sidebarWidthClass} transition-all duration-500 ${translateClass} z-30`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          showNotification={showNotification}
          liveTimeUpdate={liveTimeUpdate}
          pendingAlert={pendingAlert}
          nextPatientTimer={nextPatientTimer}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
