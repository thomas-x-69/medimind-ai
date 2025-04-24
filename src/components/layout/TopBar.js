import React, { useRef, useState } from "react";
import {
  Search,
  Bell,
  User,
  Settings
} from "lucide-react";

const TopBar = () => {
  const [searchValue, setSearchValue] = useState("Lis");
  const [activeTags, setActiveTags] = useState(["Patients"]);
  
  const searchInputRef = useRef(null);

  const navigationItems = [
    { name: "Patients", active: activeTags.includes("Patients") },
    { name: "Education", active: activeTags.includes("Education") },
    { name: "Prescriptions", active: activeTags.includes("Prescriptions") },
    { name: "Test results", active: activeTags.includes("Test results") },
  ];

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 bg-[#fef6e6]">
      <div className="flex-1 relative max-w-xs">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="search"
            className="block w-full py-2 pl-10 pr-4 rounded-full bg-pink-100 border-none text-sm focus:ring-0 focus:outline-none"
            placeholder="Lis|"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center text-sm mx-2">
        <span className="mr-2 text-gray-500">In:</span>
        {navigationItems.map((item) => (
          <button
            key={item.name}
            className={`px-4 py-1 mx-1 rounded-full ${
              item.active
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => toggleTag(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100">
          <User size={22} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100">
          <Bell size={22} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100">
          <Settings size={22} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;