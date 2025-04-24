import React from "react";

const GreetingHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-[#1A1F2B] mb-2">
        Good morning, Dr.Olivia
      </h1>
      <p className="text-gray-600 text-sm">
        Intelly wishes you a good and productive day. 45 patients waiting for
        your treatment today. You also have one live event in your calendar
        today.
      </p>
    </div>
  );
};

export default GreetingHeader;
