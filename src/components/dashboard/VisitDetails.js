import React from "react";

const VisitDetails = ({
  selectedPatient,
  isEditing,
  toggleEdit,
  patientCardRef,
  patientNotes,
  setPatientNotes,
  patientVitals,
  isAnimatingVitals,
  medications,
  openModal,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
        <span>Visit details</span>
        <button
          onClick={() => openModal("edit-visit")}
          className="text-xs bg-black text-white px-2 py-1 rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          Edit details
        </button>
      </h2>

      <div
        ref={patientCardRef}
        className="bg-pink-100 p-5 rounded-2xl transition-all duration-500 transform hover:shadow-lg"
      >
        <div className="flex justify-between mb-1">
          <div className="font-bold text-lg">{selectedPatient}</div>
          <div className="bg-white px-3 py-1 rounded-lg text-sm flex items-center space-x-2 group cursor-pointer">
            <span>16G4-TES-MK72</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          Male • 38 Years 5 Months
        </div>

        {/* Live vitals section */}
        <div className="mb-3 bg-white bg-opacity-50 p-2 rounded-lg">
          <div className="text-xs font-bold mb-1 flex justify-between items-center">
            <span>Vital Signs</span>
            <span
              className={`text-xs text-green-500 flex items-center ${
                isAnimatingVitals ? "animate-pulse" : ""
              }`}
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
              Live
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="flex flex-col items-center justify-center p-1 rounded transition-all duration-300 hover:bg-pink-50">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                className="mb-1"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="font-bold">{patientVitals.heartRate}</span>
              <span className="text-gray-500">bpm</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 rounded transition-all duration-300 hover:bg-pink-50">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                className="mb-1"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span className="font-bold">{patientVitals.bloodPressure}</span>
              <span className="text-gray-500">mmHg</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 rounded transition-all duration-300 hover:bg-pink-50">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                className="mb-1"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span className="font-bold">{patientVitals.temperature}</span>
              <span className="text-gray-500">°C</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 rounded transition-all duration-300 hover:bg-pink-50">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                className="mb-1"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <span className="font-bold">{patientVitals.oxygen}%</span>
              <span className="text-gray-500">O₂</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {["Fever", "Cough", "Heart Burn"].map((symptom) => (
            <span
              key={symptom}
              className="bg-pink-200 px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:bg-pink-300 cursor-pointer"
            >
              {symptom}
            </span>
          ))}
          <span className="border border-dashed border-gray-400 px-3 py-1 rounded-lg text-sm text-gray-500 transition-all duration-300 hover:bg-pink-200 cursor-pointer">
            + Add
          </span>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500">
            Last Checked:{" "}
            <span className="text-black">Dr. Everly on 21 April 2021</span>
          </div>
          <div className="text-sm text-gray-500">
            Prescription:{" "}
            <span className="text-pink-500 cursor-pointer hover:underline">
              #Z293K1O
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold mb-1 flex justify-between items-center">
            <span>Observation</span>
            <button
              onClick={toggleEdit}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div
            className={`text-sm ${
              isEditing ? "bg-white p-2 rounded border border-gray-300" : ""
            }`}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => setPatientNotes(e.target.textContent)}
          >
            {patientNotes}
          </div>
        </div>

        <div>
          <div className="text-sm font-bold mb-1 flex justify-between items-center">
            <span>Prescription</span>
            <button
              onClick={() => openModal("medications")}
              className="text-xs flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <span>Manage</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="space-y-1">
            {medications.map((med) => (
              <div
                key={med.name}
                className="text-sm flex justify-between items-center p-1 hover:bg-pink-200 rounded transition-colors duration-300 cursor-pointer"
              >
                <div>
                  {med.name} - {med.frequency}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors duration-300">
            Schedule follow-up
          </button>
          <button className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
            Update records
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitDetails;
