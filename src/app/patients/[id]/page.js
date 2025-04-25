"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { selectAllPatients, updatePatient } from "@/store/slices/patientsSlice";
import { formatFullDate } from "@/utils/date-utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientModal from "@/components/patients/PatientModal";
import Toast from "@/components/ui/Toast";
import Chart from "@/components/ui/Chart";

// Tab component for switching between sections
const Tab = ({ isActive, onClick, children }) => (
  <button
    className={`px-4 py-2 text-sm font-medium rounded-lg ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function PatientDetailPage({ params }) {
  const patientId = params.id;
  const dispatch = useDispatch();
  const patients = useSelector(selectAllPatients);
  const patient = patients.find((p) => p.id === patientId);

  // State
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle patient not found
  if (!patient) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/patients"
              className="text-indigo-600 hover:text-indigo-800"
            >
              ← Back to patients
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Patient Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The patient you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/patients"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Return to Patients
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Open modal for various actions
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data || patient);
    setShowModal(true);
  };

  // Handle updating a patient
  const handleUpdatePatient = (patientData) => {
    dispatch(updatePatient(patientData));
    setShowModal(false);

    // Show success message
    setShowToast(true);
    setToastMessage(`Patient information updated successfully`);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          dot: "bg-red-500",
        };
      case "fair":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      default:
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-500",
        };
    }
  };

  const statusStyle = getStatusStyle(patient.status);

  // Vitals chart data
  const vitalsChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Heart Rate",
        data: [85, 87, 84, 88, 86],
        borderColor: "#ef4444",
        borderWidth: 2,
        pointBackgroundColor: "#ef4444",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Systolic BP",
        data: [125, 128, 130, 125, 130],
        borderColor: "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: "#3b82f6",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "#f3f4f6",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </li>
            <li>
              <Link
                href="/patients"
                className="text-gray-500 hover:text-gray-700"
              >
                Patients
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </li>
            <li>
              <span className="text-gray-800 font-medium">{patient.name}</span>
            </li>
          </ol>
        </nav>

        {/* Patient header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {patient.name}
                  </h1>
                  <div
                    className={`${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-xs font-medium flex items-center ml-3`}
                  >
                    <span
                      className={`${
                        statusStyle.dot
                      } w-1.5 h-1.5 rounded-full mr-1 ${
                        patient.status === "critical" ? "animate-pulse" : ""
                      }`}
                    ></span>
                    {patient.status === "critical"
                      ? "Critical"
                      : patient.status === "fair"
                      ? "Fair"
                      : "Stable"}
                  </div>
                </div>
                <p className="text-gray-600">
                  {patient.gender} • {patient.age} • {patient.type}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center text-sm transition-colors"
                  onClick={() => openModal("updatePatient")}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors"
                  onClick={() => openModal("scheduleAppointment")}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 pb-4 border-b border-gray-100">
            <div className="flex space-x-2">
              <Tab
                isActive={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </Tab>
              <Tab
                isActive={activeTab === "medical"}
                onClick={() => setActiveTab("medical")}
              >
                Medical History
              </Tab>
              <Tab
                isActive={activeTab === "medications"}
                onClick={() => setActiveTab("medications")}
              >
                Medications
              </Tab>
              <Tab
                isActive={activeTab === "appointments"}
                onClick={() => setActiveTab("appointments")}
              >
                Appointments
              </Tab>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Vitals section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current vitals card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Current Vitals
                  </h2>

                  {patient.vitals ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-red-50 p-4 rounded-xl flex flex-col items-center">
                        <div className="text-red-500 mb-1">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                        <div className="text-xl font-bold">
                          {patient.vitals.heartRate}
                        </div>
                        <div className="text-xs text-gray-500">bpm</div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center">
                        <div className="text-blue-500 mb-1">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                          </svg>
                        </div>
                        <div className="text-xl font-bold">
                          {patient.vitals.bloodPressure}
                        </div>
                        <div className="text-xs text-gray-500">mmHg</div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-xl flex flex-col items-center">
                        <div className="text-amber-500 mb-1">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2v7.5M12 18v4M4.93 4.93L8.5 8.5M15.5 15.5l3.57 3.57M2 12h4M18 12h4M4.93 19.07L8.5 15.5M15.5 8.5l3.57-3.57"></path>
                          </svg>
                        </div>
                        <div className="text-xl font-bold">
                          {patient.vitals.temperature}
                        </div>
                        <div className="text-xs text-gray-500">°C</div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center">
                        <div className="text-green-500 mb-1">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                          </svg>
                        </div>
                        <div className="text-xl font-bold">
                          {patient.vitals.oxygen}%
                        </div>
                        <div className="text-xs text-gray-500">SpO₂</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No vital signs recorded
                    </div>
                  )}
                </div>

                {/* Patient info card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Patient Information
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">ID</span>
                      <p className="font-medium">{patient.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">
                        Contact Info
                      </span>
                      <p className="font-medium">
                        {patient.contactInfo || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Last Visit</span>
                      <p className="font-medium">
                        {patient.lastChecked
                          ? formatFullDate(patient.lastChecked)
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Visit Type</span>
                      <p className="font-medium">{patient.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms & Observations */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Symptoms & Observations
                </h2>

                <div className="space-y-4">
                  {patient.symptoms && patient.symptoms.length > 0 && (
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">Symptoms</h3>
                      <div className="flex flex-wrap gap-2">
                        {patient.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">
                      Clinical Observations
                    </h3>
                    <p className="text-gray-800">
                      {patient.observations || "No observations recorded"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vitals chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Vitals History
                </h2>

                <div className="h-72">
                  <Chart
                    type="line"
                    data={vitalsChartData}
                    options={chartOptions}
                  />
                </div>
              </div>
            </>
          )}

          {/* Medical History Tab */}
          {activeTab === "medical" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Medical History
              </h2>

              <div className="space-y-6">
                {/* Timeline of visits */}
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500"></div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">Emergency Visit</h3>
                      <span className="text-sm text-gray-500">21 Apr 2024</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      High fever and cough at normal hemoglobin levels.
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-gray-500">Doctor:</span> Dr. Everly
                    </p>
                  </div>

                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">Regular Check-up</h3>
                      <span className="text-sm text-gray-500">15 Mar 2024</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Annual physical examination. All vitals normal.
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-gray-500">Doctor:</span> Dr. Olivia
                    </p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">Vaccination</h3>
                      <span className="text-sm text-gray-500">02 Feb 2024</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Influenza vaccine administered.
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-gray-500">Doctor:</span> Dr. Patel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medications Tab */}
          {activeTab === "medications" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Current Medications
                </h2>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  onClick={() => openModal("manageMedications")}
                >
                  Manage Medications
                </button>
              </div>

              {patient.medications && patient.medications.length > 0 ? (
                <div className="space-y-4">
                  {patient.medications.map((med, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {med.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {med.dosage} - {med.frequency}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              med.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {med.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      {med.instructions && (
                        <p className="text-sm mt-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                          {med.instructions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  No medications recorded
                </div>
              )}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Upcoming Appointments
                </h2>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  onClick={() => openModal("scheduleAppointment")}
                >
                  Schedule Appointment
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Follow-up Consultation</h3>
                      <p className="text-sm text-gray-600">
                        Dr. Olivia • West Wing, Room 312
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Tomorrow</p>
                      <p className="text-sm text-gray-600">09:30 - 10:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Blood Test</h3>
                      <p className="text-sm text-gray-600">
                        Clinical Laboratory • East Wing, Floor 2
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">05 May 2024</p>
                      <p className="text-sm text-gray-600">11:00 - 11:15 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">
                Past Appointments
              </h3>

              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Emergency Visit</h3>
                      <p className="text-sm text-gray-600">
                        Dr. Thomas • West Wing, Room 101
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">21 Apr 2024</p>
                      <p className="text-sm text-gray-600">08:15 - 09:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <PatientModal
          type={modalType}
          data={modalData}
          onClose={() => setShowModal(false)}
          onUpdatePatient={handleUpdatePatient}
        />
      )}

      {/* Toast notifications */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </DashboardLayout>
  );
}
