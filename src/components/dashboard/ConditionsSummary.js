import React from "react";

const ConditionsSummary = () => {
  return (
    <div className="p-5 bg-green-50/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-40 bg-green-300 opacity-20 transform rotate-45 -ml-20 -mb-20"></div>
      <h3 className="text-lg font-semibold mb-4">By condition:</h3>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">14</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">STABLE</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">5</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">FAIR</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">1</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">CRITICAL</span>
        </div>
      </div>

      {/* Custom bar chart */}
      <div className="mt-10 mb-4 space-y-6 relative z-10">
        <div className="w-full flex items-center gap-2">
          <div className="w-12 text-xs text-gray-500">STABLE</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="bg-[#79D489] h-2 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="w-12 text-xs text-gray-500">FAIR</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="bg-[#FFD166] h-2 rounded-full"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="w-12 text-xs text-gray-500">CRITICAL</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="bg-[#FF5454] h-2 rounded-full"
              style={{ width: "5%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsSummary;
