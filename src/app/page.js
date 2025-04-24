"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GreetingHeader from "@/components/dashboard/GreetingHeader";
import PatientsSummary from "@/components/dashboard/PatientsSummary";
import VisitsSummary from "@/components/dashboard/VisitsSummary";
import ConditionsSummary from "@/components/dashboard/ConditionsSummary";
import SessionsSummary from "@/components/dashboard/SessionsSummary";
import Calendar from "@/components/dashboard/Calendar";
import PatientsList from "@/components/dashboard/PatientsList";
import VisitDetails from "@/components/dashboard/VisitDetails";
import Toast from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("Taigo Wilkinson");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load animation effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  // Handle patient click
  const handlePatientClick = (patientName) => {
    setSelectedPatient(patientName);
  };

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <DashboardLayout
      sidebarCollapsed={sidebarCollapsed}
      toggleSidebarCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      isLoaded={isLoaded}
    >
      <div className="px-8 py-6 max-w-[1200px]">
        {/* Greeting Header */}
        <div className="mb-6">
          <GreetingHeader />
        </div>

        {/* Dashboard cards - top row */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-amber-100/80 rounded-[20px] shadow-sm overflow-hidden">
            <PatientsSummary isLoaded={isLoaded} />
          </div>
          <div className="bg-pink-100/50 rounded-[20px] shadow-sm overflow-hidden">
            <VisitsSummary isLoaded={isLoaded} />
          </div>
        </div>

        {/* Dashboard cards - second row */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-green-100/50 rounded-[20px] shadow-sm overflow-hidden">
            <ConditionsSummary isLoaded={isLoaded} />
          </div>
          <div className="bg-blue-100/50 rounded-[20px] shadow-sm overflow-hidden">
            <SessionsSummary isLoaded={isLoaded} />
          </div>
        </div>

        {/* Calendar and Patients Section */}
        <div className="grid grid-cols-[1fr_300px] gap-5">
          <div>
            {/* Patient List and Visit Details */}
            <div className="grid grid-cols-1 gap-5">
              <div>
                <PatientsList
                  isLoaded={isLoaded}
                  onPatientClick={handlePatientClick}
                  selectedPatient={selectedPatient}
                  openModal={openModal}
                />
              </div>
              <div>
                <VisitDetails
                  isLoaded={isLoaded}
                  patientName={selectedPatient}
                  openModal={openModal}
                />
              </div>
            </div>
          </div>

          <div>
            <Calendar isLoaded={isLoaded} openModal={openModal} />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}

      {/* Modal */}
      {showModal && (
        <Modal type={modalType} onClose={() => setShowModal(false)} />
      )}
    </DashboardLayout>
  );
}
