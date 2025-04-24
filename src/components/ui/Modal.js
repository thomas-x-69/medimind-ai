import React from "react";

const Modal = ({ modalType, onClose }) => {
  // Get modal title based on type
  const getModalTitle = () => {
    switch (modalType) {
      case "profile":
        return "Doctor Profile";
      case "notifications":
        return "Notifications";
      case "settings":
        return "Settings";
      case "add-patient":
        return "Add New Patient";
      case "edit-visit":
        return "Edit Visit Details";
      case "medications":
        return "Manage Medications";
      case "add-event":
        return "Add Calendar Event";
      case "participants":
        return "View All Participants";
      case "patients":
        return "All Patients";
      case "condition":
        return "Patient Conditions";
      case "in-clinic":
        return "Clinic Sessions";
      case "video-calls":
        return "Video Call Sessions";
      case "in-chat":
        return "Chat Sessions";
      case "view-all":
        return "All Details";
      default:
        return "Information";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 max-w-lg w-full max-h-[80vh] overflow-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{getModalTitle()}</h3>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="mb-4">
          {modalType === "add-patient" && (
            <div className="space-y-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full name"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Emergency Visit</option>
                  <option>Routine Check-Up</option>
                  <option>Video Consultation</option>
                  <option>Report</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {modalType === "add-event" && (
            <div className="space-y-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Title"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Emergency visit</option>
                  <option>Diagnostic test</option>
                  <option>Team daily planning</option>
                  <option>Patient consultation</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Location"
                />
              </div>
            </div>
          )}

          {modalType !== "add-patient" && modalType !== "add-event" && (
            <div className="text-center py-8 text-gray-500">
              Modal content would appear here
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-300">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
