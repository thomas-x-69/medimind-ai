import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PatientsSummary = ({ isLoaded = false }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Patient data
  const patientData = [
    { age: "22-32 Y/O", count: 14 },
    { age: "32-45 Y/O", count: 5 },
    { age: "45+ Y/O", count: 2 },
  ];

  // Custom bar rendering
  const renderBars = () => {
    if (!isLoaded) return null;

    return (
      <div className="mt-8 mb-4 flex justify-around relative">
        {patientData.map((data, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="h-28 flex items-end justify-center">
              <div
                className="w-10 bg-black rounded-t-md transition-all duration-700"
                style={{
                  height: isLoaded
                    ? idx === 0
                      ? "80px"
                      : idx === 1
                      ? "40px"
                      : "90px"
                    : "0px",
                }}
              >
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-t-md"></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {idx === 0 && "07:30 p.m"}
              {idx === 2 && "12:00 p.m"}
            </div>
          </div>
        ))}
        <div className="absolute top-1/3 left-0 right-0 border-t border-dashed border-gray-400"></div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Patients:</h3>
      <div className="flex justify-between mb-5">
        {patientData.map((item, idx) => (
          <div key={item.age} className="flex flex-col items-center">
            <span className="text-xl font-bold">{item.count} pers</span>
            <span className="text-xs text-gray-500">{item.age}</span>
          </div>
        ))}
      </div>

      {renderBars()}
    </div>
  );
};

export default PatientsSummary;
