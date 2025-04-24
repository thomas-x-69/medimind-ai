"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GreetingHeader from "@/components/dashboard/GreetingHeader";
import PatientsSummary from "@/components/dashboard/PatientsSummary";
import VisitsSummary from "@/components/dashboard/VisitsSummary";
import ConditionsSummary from "@/components/dashboard/ConditionsSummary";
import SessionsSummary from "@/components/dashboard/SessionsSummary";
import Calendar from "@/components/dashboard/Calendar";
import PatientsList from "@/components/dashboard/PatientsList";
import VisitDetails from "@/components/dashboard/VisitDetails";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="px-8 py-6 max-w-[1200px]">
        {/* Greeting Header */}
        <GreetingHeader />

        {/* Dashboard cards - top row */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <PatientsSummary />
          </div>
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <VisitsSummary />
          </div>
        </div>

        {/* Dashboard cards - second row */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <ConditionsSummary />
          </div>
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <SessionsSummary />
          </div>
        </div>

        {/* Calendar Section */}
        <Calendar />

        {/* Patient List and Visit Details */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <PatientsList />
          </div>
          <div>
            <VisitDetails />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
