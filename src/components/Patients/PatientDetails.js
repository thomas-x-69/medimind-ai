import React, { useState, useEffect, useRef } from "react";
import { formatFullDate } from "@/utils/date-utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Chart from "@/components/ui/Chart";

const PatientDetails = ({
  patient,
  isEditMode,
  setIsEditMode,
  openModal,
  expandedSection,
  setExpandedSection,
  onSave,
  onDelete,
  onSchedule,
  isLoaded,
  fadeInClass,
}) => {
  // Local state for editable fields
  const [editableFields, setEditableFields] = useState({
    name: patient?.name || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    contactInfo: patient?.contactInfo || "",
    observations: patient?.observations || "",
  });

  // Toggle visibility of a section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Handle field changes in edit mode
  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save patient data
  const handleSave = () => {
    onSave({
      ...patient,
      ...editableFields,
    });
    setIsEditMode(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditableFields({
      name: patient?.name || "",
      age: patient?.age || "",
      gender: patient?.gender || "",
      contactInfo: patient?.contactInfo || "",
      observations: patient?.observations || "",
    });
    setIsEditMode(false);
  };

  // Set up chart data for vital history
  const vitalHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Heart Rate",
        data: [85, 87, 84, 88, 86],
        borderColor: "#FF5454",
        backgroundColor: "rgba(255, 84, 84, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Blood Pressure (Systolic)",
        data: [125, 128, 130, 125, 130],
        borderColor: "#5669FF",
        backgroundColor: "rgba(86, 105, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const weightHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [75, 74, 74.5, 73, 72.5],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Render loading skeleton if patient is not loaded
  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Select a patient to view details</div>
      </div>
    );
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-600";
      case "fair":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${fadeInClass} transition-all duration-500`}
    >
      {/* Patient header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center space-x-4">
          {isEditMode ? (
            <input
              type="text"
              value={editableFields.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="text-2xl font-bold border-b border-gray-300 focus:border-pink-500 focus:outline-none py-1"
            />
          ) : (
            <h1 className="text-2xl font-bold">{patient.name}</h1>
          )}

          <div
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
              patient.status
            )}`}
          >
            {patient.status || "Stable"}
          </div>
        </div>

        <div className="flex space-x-2">
          {isEditMode ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  openModal("scheduleAppointment", { patientId: patient.id })
                }
              >
                Schedule Appointment
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Patient info and vital cards */}
      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        {/* Personal Info Card */}
        <Card
          title="Personal Information"
          background="bg-white"
          className="shadow-sm"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              {isEditMode ? (
                <select
                  value={editableFields.gender}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="font-medium">{patient.gender}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Age</p>
              {isEditMode ? (
                <input
                  type="text"
                  value={editableFields.age}
                  onChange={(e) => handleFieldChange("age", e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
              ) : (
                <p className="font-medium">{patient.age}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Contact Info</p>
              {isEditMode ? (
                <input
                  type="text"
                  value={editableFields.contactInfo}
                  onChange={(e) =>
                    handleFieldChange("contactInfo", e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
              ) : (
                <p className="font-medium">{patient.contactInfo}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Visit</p>
              <p className="font-medium">
                {formatFullDate(patient.lastChecked)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Visit Type</p>
              <p className="font-medium">{patient.type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-medium">{patient.id}</p>
            </div>
          </div>
        </Card>

        {/* Current Vitals Card */}
        <Card
          title="Current Vitals"
          background="bg-white"
          className="shadow-sm"
        >
          <div className="grid grid-cols-4 gap-4">
            {patient.vitals ? (
              <>
                <div className="bg-red-50 p-4 rounded-xl flex flex-col items-center">
                  <div className="text-red-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div className="mt-2 text-xl font-bold">
                    {patient.vitals.heartRate}
                  </div>
                  <div className="text-xs text-gray-500">bpm</div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center">
                  <div className="text-blue-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                  <div className="mt-2 text-xl font-bold">
                    {patient.vitals.bloodPressure}
                  </div>
                  <div className="text-xs text-gray-500">mmHg</div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl flex flex-col items-center">
                  <div className="text-amber-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div className="mt-2 text-xl font-bold">
                    {patient.vitals.temperature}
                  </div>
                  <div className="text-xs text-gray-500">°C</div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center">
                  <div className="text-green-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="8 14 12 18 16 14"></polyline>
                      <line x1="12" y1="18" x2="12" y2="8"></line>
                    </svg>
                  </div>
                  <div className="mt-2 text-xl font-bold">
                    {patient.vitals.oxygen}%
                  </div>
                  <div className="text-xs text-gray-500">SpO₂</div>
                </div>
              </>
            ) : (
              <div className="col-span-4 text-center py-4 text-gray-500">
                No vital signs recorded
              </div>
            )}
          </div>
        </Card>

        {/* Symptoms & Observations */}
        <Card
          title="Symptoms & Observations"
          background="bg-white"
          className="shadow-sm"
        >
          <div className="space-y-4">
            {patient.symptoms && patient.symptoms.length > 0 && (
              <div>
                <h4 className="text-sm text-gray-500 mb-2">Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {patient.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 px-3 py-1 rounded-lg text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm text-gray-500 mb-2">
                Clinical Observations
              </h4>
              {isEditMode ? (
                <textarea
                  value={editableFields.observations}
                  onChange={(e) =>
                    handleFieldChange("observations", e.target.value)
                  }
                  rows="3"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-sm">
                  {patient.observations || "No observations recorded"}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Accordions for additional sections */}
        {/* Medication History */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div
            className={`px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors ${
              expandedSection === "medications" ? "border-b" : ""
            }`}
            onClick={() => toggleSection("medications")}
          >
            <h3 className="font-medium">Current Medications</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${
                expandedSection === "medications" ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {expandedSection === "medications" && (
            <div className="p-4 bg-white">
              {patient.medications && patient.medications.length > 0 ? (
                <div className="space-y-4">
                  {patient.medications.map((med, index) => (
                    <div
                      key={index}
                      className="border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{med.name}</h4>
                          <p className="text-sm text-gray-500">
                            {med.dosage} - {med.frequency}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              med.status === "active"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {med.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      {med.instructions && (
                        <p className="text-sm mt-1">{med.instructions}</p>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        openModal("manageMedications", {
                          patientId: patient.id,
                        })
                      }
                    >
                      Manage Medications
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No medications recorded
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        openModal("manageMedications", {
                          patientId: patient.id,
                        })
                      }
                    >
                      Add Medication
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Medical History */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div
            className={`px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors ${
              expandedSection === "medicalHistory" ? "border-b" : ""
            }`}
            onClick={() => toggleSection("medicalHistory")}
          >
            <h3 className="font-medium">Medical History</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${
                expandedSection === "medicalHistory" ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {expandedSection === "medicalHistory" && (
            <div className="p-4 bg-white">
              <div className="space-y-6">
                {/* Timeline of visits */}
                <div>
                  <h4 className="font-medium mb-3">Visit History</h4>
                  <div className="space-y-4">
                    <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-pink-500"></div>
                      <div className="flex justify-between">
                        <h5 className="font-medium">Emergency Visit</h5>
                        <span className="text-sm text-gray-500">
                          21 Apr 2024
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        High fever and cough at normal hemoglobin levels.
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Doctor:</span> Dr.
                        Everly
                      </p>
                    </div>

                    <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="flex justify-between">
                        <h5 className="font-medium">Regular Check-up</h5>
                        <span className="text-sm text-gray-500">
                          15 Mar 2024
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Annual physical examination. All vitals normal.
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Doctor:</span> Dr.
                        Olivia
                      </p>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="flex justify-between">
                        <h5 className="font-medium">Vaccination</h5>
                        <span className="text-sm text-gray-500">
                          02 Feb 2024
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Influenza vaccine administered.
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Doctor:</span> Dr. Patel
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        openModal("viewFullHistory", { patientId: patient.id })
                      }
                    >
                      View Full History
                    </Button>
                  </div>
                </div>

                {/* Vitals History Chart */}
                <div>
                  <h4 className="font-medium mb-3">Vitals History</h4>
                  <div className="h-48">
                    <Chart
                      type="line"
                      data={vitalHistoryData}
                      options={{
                        scales: {
                          y: {
                            display: true,
                            beginAtZero: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Weight History Chart */}
                <div>
                  <h4 className="font-medium mb-3">Weight History</h4>
                  <div className="h-48">
                    <Chart
                      type="line"
                      data={weightHistoryData}
                      options={{
                        scales: {
                          y: {
                            display: true,
                            beginAtZero: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Appointments */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div
            className={`px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors ${
              expandedSection === "appointments" ? "border-b" : ""
            }`}
            onClick={() => toggleSection("appointments")}
          >
            <h3 className="font-medium">Appointments</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${
                expandedSection === "appointments" ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {expandedSection === "appointments" && (
            <div className="p-4 bg-white">
              <div className="space-y-3">
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium">Follow-up Consultation</h5>
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

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium">Blood Test</h5>
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

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal("scheduleAppointment", {
                        patientId: patient.id,
                      })
                    }
                  >
                    Schedule New Appointment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents & Files */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div
            className={`px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors ${
              expandedSection === "documents" ? "border-b" : ""
            }`}
            onClick={() => toggleSection("documents")}
          >
            <h3 className="font-medium">Documents & Files</h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${
                expandedSection === "documents" ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {expandedSection === "documents" && (
            <div className="p-4 bg-white">
              <div className="space-y-3">
                <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium">Blood Test Results</h5>
                      <p className="text-xs text-gray-500">
                        PDF • 1.2 MB • Apr 21, 2024
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>

                <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium">Chest X-Ray Report</h5>
                      <p className="text-xs text-gray-500">
                        PDF • 3.5 MB • Mar 15, 2024
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>

                <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium">Prescription</h5>
                      <p className="text-xs text-gray-500">
                        Image • 450 KB • Apr 21, 2024
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal("uploadDocument", { patientId: patient.id })
                    }
                  >
                    Upload Document
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      openModal("allDocuments", { patientId: patient.id })
                    }
                  >
                    View All Documents
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger zone */}
        <Card
          background="bg-red-50"
          className="shadow-sm border border-red-100 mt-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-red-700">Danger Zone</h3>
              <p className="text-sm text-red-600 mt-1">
                Permanently delete this patient's records
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => openModal("deletePatient", patient)}
            >
              Delete Patient
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetails;
