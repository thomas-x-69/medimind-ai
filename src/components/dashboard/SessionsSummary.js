import React from "react";

const SessionsSummary = ({ isLoaded = false }) => {
  const sessionData = [
    { value: "03:45 h", label: "IN CLINIC", type: "in-clinic" },
    { value: "02:00 min", label: "VIDEO CALLS", type: "video-calls" },
    { value: "00:24 min", label: "IN CHAT", type: "in-chat" },
  ];

  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Sessions:</h3>

      <div className="space-y-4">
        {sessionData.map((item, idx) => (
          <div
            key={item.label}
            className={`flex items-center justify-between p-3 rounded-xl relative ${
              idx === 0 ? "bg-blue-100/50" : "bg-white shadow-sm"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-10 ${
                  idx === 0
                    ? "bg-[#78AEFF]"
                    : idx === 1
                    ? "bg-gray-400"
                    : "bg-[#5669FF]"
                } rounded-full mr-3`}
              ></div>
              <div>
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </div>
            </div>
            <div
              className={`${
                idx === 0
                  ? "bg-blue-100"
                  : idx === 1
                  ? "bg-gray-100"
                  : "bg-blue-100"
              } px-2 py-1 rounded text-xs ${
                idx === 0
                  ? "text-blue-700"
                  : idx === 1
                  ? "text-gray-600"
                  : "text-blue-700"
              }`}
            >
              {item.value.split(" ")[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionsSummary;
