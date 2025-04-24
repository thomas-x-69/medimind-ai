import React from "react";

const ConditionsSummary = ({ isLoaded = false }) => {
  const conditionData = [
    { label: "STABLE", count: 14, color: "green", percent: 70 },
    { label: "FAIR", count: 5, color: "amber", percent: 25 },
    { label: "CRITICAL", count: 1, color: "red", percent: 5 },
  ];

  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">By condition:</h3>
      <div className="flex justify-between mb-5">
        {conditionData.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-xl font-bold">
              {item.count}{" "}
              <span className="text-xs text-gray-500 uppercase">pers</span>
            </span>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Custom bar chart */}
      <div className="mt-10 mb-4 space-y-6">
        {conditionData.map((item) => (
          <div key={item.label} className="w-full flex items-center gap-2">
            <div className="w-12 text-xs text-gray-500">{item.label}</div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${
                  item.color === "green"
                    ? "bg-green-500"
                    : item.color === "amber"
                    ? "bg-amber-500"
                    : "bg-red-500"
                } transition-all duration-1000`}
                style={{ width: isLoaded ? `${item.percent}%` : "0%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionsSummary;
