"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPatients,
  setSelectedPatient,
  addPatient,
  updatePatient,
  deletePatient,
} from "@/store/slices/patientsSlice";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientsList from "@/components/patients/PatientsList";
import PatientModal from "@/components/patients/PatientModal";
import Toast from "@/components/ui/Toast";

const Patients = () => {
  // Redux
  const dispatch = useDispatch();
  const patients = useSelector(selectAllPatients);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Filter patients when search or filters change
  useEffect(() => {
    let results = [...patients];

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        (patient) =>
          patient.name.toLowerCase().includes(lowerCaseSearch) ||
          (patient.symptoms &&
            patient.symptoms.some((s) =>
              s.toLowerCase().includes(lowerCaseSearch)
            ))
      );
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      results = results.filter((patient) => patient.status === selectedStatus);
    }

    setFilteredPatients(results);
  }, [patients, searchTerm, selectedStatus]);

  // Initialize filtered patients
  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  // Open modal for various actions
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  // Add a new patient
  const handleAddPatient = (patientData) => {
    // Generate an ID
    const newId = `p${patients.length + 1}`;
    const newPatient = {
      id: newId,
      ...patientData,
      status: patientData.status || "stable",
      lastChecked: patientData.lastChecked || new Date().toISOString(),
    };

    dispatch(addPatient(newPatient));
    setShowModal(false);

    // Show success message
    setShowToast(true);
    setToastMessage(`Patient ${patientData.name} added successfully`);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Update a patient
  const handleUpdatePatient = (patientData) => {
    dispatch(updatePatient(patientData));
    setShowModal(false);

    // Show success message
    setShowToast(true);
    setToastMessage(`Patient ${patientData.name} updated successfully`);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Delete a patient
  const handleDeletePatient = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    dispatch(deletePatient(patientId));
    setShowModal(false);

    // Show success message
    setShowToast(true);
    setToastMessage(`Patient ${patient.name} deleted`);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-600 mt-1">
            Manage your patients and their medical records
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search patients by name or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter by status */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Status:
              </span>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedStatus === "all"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedStatus("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedStatus === "stable"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedStatus("stable")}
                >
                  Stable
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedStatus === "fair"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedStatus("fair")}
                >
                  Fair
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedStatus === "critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedStatus("critical")}
                >
                  Critical
                </button>
              </div>
            </div>

            {/* Add patient button */}
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center whitespace-nowrap"
              onClick={() => openModal("addPatient")}
            >
              <svg
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Patient
            </button>
          </div>
        </div>

        {/* Patients count */}
        <div className="mb-4 text-sm text-gray-500 flex justify-between items-center">
          <div>
            {filteredPatients.length}{" "}
            {filteredPatients.length === 1 ? "patient" : "patients"}
            {searchTerm || selectedStatus !== "all" ? " (filtered)" : ""}
          </div>
        </div>

        {/* Patients list */}
        <PatientsList
          patients={filteredPatients}
          onEdit={(patient) => openModal("updatePatient", patient)}
          onDelete={(patient) => openModal("deletePatient", patient)}
          onView={(patient) =>
            (window.location.href = `/patients/${patient.id}`)
          }
        />
      </div>

      {/* Modals */}
      {showModal && (
        <PatientModal
          type={modalType}
          data={modalData}
          onClose={() => setShowModal(false)}
          onAddPatient={handleAddPatient}
          onUpdatePatient={handleUpdatePatient}
          onDeletePatient={handleDeletePatient}
        />
      )}

      {/* Toast notifications */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </DashboardLayout>
  );
};

export default Patients;
