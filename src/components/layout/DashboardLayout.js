import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTags, setActiveTags] = useState(["Patients"]);
  const [liveTimeUpdate, setLiveTimeUpdate] = useState(
    new Date().toLocaleTimeString()
  );
  const [pendingAlert, setPendingAlert] = useState(false);
  const [nextPatientTimer, setNextPatientTimer] = useState(15);
  const [showNotification, setShowNotification] = useState(false);

  const searchInputRef = useRef(null);

  // Toggle tag function
  const toggleTag = (tag) => {
    setActiveTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Mock function for opening modal
  const openModal = (type) => {
    console.log(`Opening modal: ${type}`);
    // Modal implementation would go here
  };

  // Load animations
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Update clock every second
    const clockTimer = setInterval(() => {
      setLiveTimeUpdate(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  // Base styling classes
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-[210px]";
  const fadeInClass = isLoaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";

  return (
    <div className="flex h-screen overflow-hidden bg-[#fef6e6] text-[#1A1F2B]">
      {/* Sidebar with toggle functionality */}
      <div className={`${sidebarWidthClass} transition-all duration-500 z-30`}>
        <Sidebar
          isLoaded={isLoaded}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          isLoaded={isLoaded}
          fadeInClass={fadeInClass}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchInputRef={searchInputRef}
          activeTags={activeTags}
          toggleTag={toggleTag}
          liveTimeUpdate={liveTimeUpdate}
          pendingAlert={pendingAlert}
          nextPatientTimer={nextPatientTimer}
          showNotification={showNotification}
          openModal={openModal}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
