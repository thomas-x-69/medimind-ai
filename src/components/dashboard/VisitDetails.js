import React from "react";

const VisitDetails = ({
  isLoaded = false,
  patientName = "Taigo Wilkinson",
}) => {
  // Static data to match the design
  const patientDetails = {
    name: patientName,
    gender: "Male",
    age: "38 Years 5 Months",
    id: "16G4-TES-MK72",
    symptoms: ["Fever", "Cough", "Heart Burn"],
    lastChecked: {
      doctor: "Dr. Everly",
      date: "21 April 2021",
    },
    prescription: {
      id: "#Z293K1O",
      medications: [
        {
          name: "Paracetamol",
          dosage: "2 times a day",
        },
        {
          name: "Diazepam",
          instructions: "Day and Night before meal",
        },
      ],
    },
    observations: "High fever and cough at normal hemoglobin levels.",
  };

  const getSymptomClass = (symptom) => {
    if (symptom === "Fever") {
      return "bg-red-100 text-red-700";
    } else if (symptom === "Cough") {
      return "bg-amber-100 text-amber-700";
    } else {
      return "bg-purple-100 text-purple-700";
    }
  };

  return (
    <div className="bg-pink-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-pink-200">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">{patientDetails.name}</h4>
          <div className="text-sm text-gray-500">
            {patientDetails.gender} • {patientDetails.age}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {patientDetails.symptoms.map((symptom) => (
            <div
              key={symptom}
              className={`text-sm px-3 py-1 rounded-full ${getSymptomClass(
                symptom
              )}`}
            >
              {symptom}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="text-sm">
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

        <div className="mb-6">
          <h5 className="text-sm text-gray-500 mb-1">Prescription:</h5>
          {patientDetails.prescription.medications.map((medication, index) => (
            <div key={index} className="text-sm">
              {medication.name} - {medication.dosage || medication.instructions}
            </div>
          ))}
        </div>

        {/* View all details button */}
        <div className="text-center">
          <button className="bg-black text-white py-3 px-6 rounded-full text-sm font-medium w-full">
            View all details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitDetails;
