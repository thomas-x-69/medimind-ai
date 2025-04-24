import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Base styling classes
  const sidebarWidthClass = sidebarCollapsed ? "w-16" : "w-[210px]";

  return (
    <div className="flex h-screen overflow-hidden bg-[#fef6e6] text-[#1A1F2B]">
      {/* Sidebar with toggle functionality */}
      <div className={`${sidebarWidthClass} transition-all duration-500 z-30`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
