import React, { useState, useEffect } from "react";

const PatientModal = ({
  type,
  data,
  onClose,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
  onScheduleAppointment,
}) => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: data?.name || "",
    type: data?.type || "Routine Check-Up",
    time: data?.time || "09:00 AM",
    gender: data?.gender || "Male",
    age: data?.age || "",
    contactInfo: data?.contactInfo || "",
    symptoms: data?.symptoms?.join(", ") || "",
    observations: data?.observations || "",
    status: data?.status || "stable",
    startTime: "",
    endTime: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    title: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    instructions: "",
  });

  // State for medication list when managing medications
  const [medications, setMedications] = useState(data?.medications || []);

  // Set initial form data when modal opens
  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        name: data.name || "",
        type: data.type || "Routine Check-Up",
        time: data.time || "09:00 AM",
        gender: data.gender || "Male",
        age: data.age || "",
        contactInfo: data.contactInfo || "",
        symptoms: data.symptoms?.join(", ") || "",
        observations: data.observations || "",
        status: data.status || "stable",
      });

      if (data.medications) {
        setMedications([...data.medications]);
      }
    }
  }, [data]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Process form data based on modal type
    switch (type) {
      case "addPatient":
        // Process symptoms from comma-separated string to array
        const symptomsArray = formData.symptoms
          ? formData.symptoms
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [];

        onAddPatient({
          name: formData.name,
          type: formData.type,
          time: formData.time,
          gender: formData.gender,
          age: formData.age,
          contactInfo: formData.contactInfo,
          symptoms: symptomsArray,
          observations: formData.observations,
          status: formData.status,
        });
        break;

      case "updatePatient":
        // Process symptoms from comma-separated string to array
        const updatedSymptomsArray = formData.symptoms
          ? formData.symptoms
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [];

        onUpdatePatient({
          ...data,
          name: formData.name,
          type: formData.type,
          time: formData.time,
          gender: formData.gender,
          age: formData.age,
          contactInfo: formData.contactInfo,
          symptoms: updatedSymptomsArray,
          observations: formData.observations,
          status: formData.status,
        });
        break;

      case "deletePatient":
        onDeletePatient(data.id);
        break;

      case "scheduleAppointment":
        onScheduleAppointment({
          patientId: data?.patientId || data?.id,
          title: formData.title,
          startTime: formData.startTime,
          endTime: formData.endTime,
          date: formData.date,
          location: formData.location,
          type: formData.type.toLowerCase(),
        });
        break;

      case "manageMedications":
        onUpdatePatient({
          ...data,
          medications: medications,
        });
        break;

      default:
        break;
    }
  };

  // Handle adding a new medication
  const handleAddMedication = () => {
    if (!formData.medicationName) return;

    const newMedication = {
      name: formData.medicationName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      instructions: formData.instructions,
      status: "active",
    };

    setMedications([...medications, newMedication]);

    // Reset medication form fields
    setFormData({
      ...formData,
      medicationName: "",
      dosage: "",
      frequency: "",
      instructions: "",
    });
  };

  // Handle removing a medication
  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  // Render appropriate content based on modal type
  const renderModalContent = () => {
    switch (type) {
      case "addPatient":
      case "updatePatient":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 35 Years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Information
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Emergency Visit">Emergency Visit</option>
                  <option value="Routine Check-Up">Routine Check-Up</option>
                  <option value="Video Consultation">Video Consultation</option>
                  <option value="Report">Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="stable">Stable</option>
                  <option value="fair">Fair</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Symptoms
              </label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="e.g. Fever, Cough, Headache (comma-separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observations
              </label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {type === "addPatient" ? "Add Patient" : "Update Patient"}
              </button>
            </div>
          </form>
        );

      case "deletePatient":
        return (
          <div>
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Delete Patient Record
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete the record for{" "}
                <span className="font-medium">{data?.name}</span>? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleSubmit}
              >
                Delete Patient
              </button>
            </div>
          </div>
        );

      case "scheduleAppointment":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Follow-up Consultation"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. West Wing, Room 312"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Schedule Appointment
              </button>
            </div>
          </form>
        );

      case "manageMedications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Current Medications</h3>
              {medications.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {medications.map((medication, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg flex justify-between items-start"
                    >
                      <div>
                        <div className="font-medium">{medication.name}</div>
                        <div className="text-sm text-gray-500">
                          {medication.dosage} - {medication.frequency}
                        </div>
                        {medication.instructions && (
                          <div className="text-sm mt-1">
                            {medication.instructions}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedication(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          width="16"
                          height="16"
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No medications added yet</p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Add New Medication</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    name="medicationName"
                    value={formData.medicationName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dosage
                    </label>
                    <input
                      type="text"
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleInputChange}
                      placeholder="e.g. 500mg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <input
                      type="text"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      placeholder="e.g. Twice daily"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructions
                  </label>
                  <input
                    type="text"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="e.g. Take after meals"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddMedication}
                  disabled={!formData.medicationName}
                  className={`w-full px-3 py-2 rounded-lg ${
                    formData.medicationName
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add Medication
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-4">
            <p>Modal content not defined for type: {type}</p>
          </div>
        );
    }
  };

  // Get modal title based on type
  const getModalTitle = () => {
    switch (type) {
      case "addPatient":
        return "Add New Patient";
      case "updatePatient":
        return "Edit Patient Details";
      case "deletePatient":
        return "Delete Patient";
      case "scheduleAppointment":
        return "Schedule Appointment";
      case "manageMedications":
        return "Manage Medications";
      default:
        return "Patient Information";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">{getModalTitle()}</h2>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
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

        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-5rem)]">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
