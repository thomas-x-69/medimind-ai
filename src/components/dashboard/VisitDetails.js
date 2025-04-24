import React from "react";

const VisitDetails = () => {
  // Static data to match the design
  const patientDetails = {
    name: "Taigo Wilkinson",
    gender: "Male",
    age: "38 Years 5 Months",
    id: "16G4-TES-MK72",
    symptoms: ["Fever", "Cough", "Heart Burn"],
    lastChecked: {
      doctor: "Dr. Everly",
      date: "21 April 2021",
    },
    prescription: {
      id: "#Z.093K1O",
      medicine: "Paracetamol",
      dosage: "2 times a day",
      instructions: "Dosepak - Day and Night before meal",
    },
    observations: "High fever and cough at normal hemoglobin levels.",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="text-lg font-semibold mb-2">Visit details</h3>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">{patientDetails.name}</h4>
          <div className="text-sm text-gray-500">
            {patientDetails.gender} • {patientDetails.age}
          </div>
        </div>
      </div>

      <div className="p-5 bg-pink-50">
        <div className="flex flex-wrap gap-2 mb-4">
          {patientDetails.symptoms.map((symptom, index) => (
            <div
              key={index}
              className={`text-sm px-3 py-1 rounded-full ${
                symptom === "Fever"
                  ? "bg-red-100 text-red-700"
                  : symptom === "Cough"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {symptom}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="text-sm mb-1">
            <span className="text-gray-500">Last Checked: </span>
            <span className="font-medium">
              {patientDetails.lastChecked.doctor}
            </span>{" "}
            on {patientDetails.lastChecked.date}
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Prescription: </span>
            <span className="text-blue-600 font-medium">
              {patientDetails.prescription.id}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="text-sm text-gray-500 mb-1">Observation:</h5>
          <p className="text-sm">{patientDetails.observations}</p>
        </div>

        <div>
          <h5 className="text-sm text-gray-500 mb-1">Prescription:</h5>
          <div className="text-sm">
            <div className="font-medium">
              {patientDetails.prescription.medicine} -{" "}
              {patientDetails.prescription.dosage}
            </div>
            <div className="text-gray-500">
              {patientDetails.prescription.instructions}
            </div>
          </div>
        </div>
      </div>

      {/* View all details button */}
      <div className="p-4 text-center">
        <button className="bg-black text-white py-3 px-6 rounded-full text-sm font-medium w-full">
          View all details
        </button>
      </div>
    </div>
  );
};

export default VisitDetails;
