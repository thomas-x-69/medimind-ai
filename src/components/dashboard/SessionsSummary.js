import React from "react";

const SessionsSummary = () => {
  return (
    <div className="p-5 bg-blue-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300 opacity-20 transform rotate-45 -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-300 opacity-20 rounded-full -ml-10 -mb-10"></div>

      <h3 className="text-lg font-semibold mb-4">Sessions:</h3>

      <div className="flex items-center justify-between mb-4 bg-blue-100/50 rounded-xl p-3 relative z-10">
        <div className="flex items-center">
          <div className="w-2 h-10 bg-[#78AEFF] rounded-full mr-3"></div>
          <div>
            <p className="text-gray-500 text-xs">IN CLINIC</p>
            <p className="font-bold">03:45 h</p>
          </div>
        </div>
        <div className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-700">
          h
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-3 shadow-sm relative z-10">
        <div className="flex items-center">
          <div className="w-2 h-10 bg-gray-400 rounded-full mr-3"></div>
          <div>
            <p className="text-gray-500 text-xs">VIDEO CALLS</p>
            <p className="font-bold">02:00 min</p>
          </div>
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
          min
        </div>
      </div>

      <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm relative z-10">
        <div className="flex items-center">
          <div className="w-2 h-10 bg-[#5669FF] rounded-full mr-3"></div>
          <div>
            <p className="text-gray-500 text-xs">IN CHAT</p>
            <p className="font-bold">00:24 min</p>
          </div>
        </div>
        <div className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-700">
          min
        </div>
      </div>
    </div>
  );
};

export default SessionsSummary;
