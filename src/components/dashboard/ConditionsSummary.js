import React from "react";

const ConditionsSummary = ({
  cardType,
  isLoaded,
  cardBgClasses,
  scaleInClass,
  fadeInClass,
  hoveredCard,
  setHoveredCard,
  isDragging,
  draggedItem,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  openModal,
  setShowToast,
  setToastMessage,
  draggingEnabled,
}) => {
  // Condition data
  const conditionData = [
    { count: 14, label: "STABLE", color: "green" },
    { count: 5, label: "FAIR", color: "amber" },
    { count: 1, label: "CRITICAL", color: "red" },
  ];

  return (
    <div
      key={`card-${cardType}`}
      className={`bg-green-100 rounded-3xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-400 
      ${draggingEnabled ? "draggable-component" : ""}
      ${hoveredCard === cardType ? "scale-[1.02]" : ""} 
      ${isDragging && draggedItem === cardType ? "dragging" : "opacity-100"}`}
      onMouseEnter={() => setHoveredCard(cardType)}
      onMouseLeave={() => setHoveredCard(null)}
      draggable={draggingEnabled}
      onDragStart={() => handleDragStart(cardType)}
      onDragOver={(e) => {
        e.preventDefault();
        if (draggingEnabled && draggedItem && draggedItem !== cardType) {
          e.currentTarget.classList.add("drag-over");
        }
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("drag-over");
      }}
      onDrop={(e) => {
        e.currentTarget.classList.remove("drag-over");
        handleDrop(cardType);
      }}
    >
      {draggingEnabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-white bg-opacity-80 px-3 py-1 rounded-lg text-sm font-medium">
            Drag to reposition
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 relative z-20">
        <h2 className="text-xl font-bold">By condition:</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal("condition");
          }}
          className="text-xs bg-black text-white px-2 py-0.5 rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          Details
        </button>
      </div>

      <div className="flex space-x-12 relative z-20">
        {conditionData.map((item, idx) => (
          <div
            key={item.label}
            className="transition-all duration-300 hover:transform hover:scale-105 cursor-pointer relative group"
            onClick={(e) => {
              e.stopPropagation();
              // Visual feedback
              const el = e.currentTarget;
              el.classList.add("animate-bounce");
              setTimeout(() => el.classList.remove("animate-bounce"), 300);

              // Show toast
              setShowToast(true);
              setToastMessage(
                `${
                  item.count
                } patients in ${item.label.toLowerCase()} condition`
              );
              setTimeout(() => setShowToast(false), 2000);
            }}
          >
            <div
              className={`font-bold text-lg ${
                isLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-700 delay-${(idx + 1) * 100}`}
            >
              {item.count} pers
            </div>
            <div
              className={`text-xs text-gray-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-700 delay-${(idx + 1) * 100}`}
            >
              {item.label}
            </div>

            {/* Animated indicator */}
            <div
              className={`absolute -right-4 top-0 h-2 w-2 rounded-full ${
                item.color === "green"
                  ? "bg-green-500"
                  : item.color === "amber"
                  ? "bg-amber-500"
                  : "bg-red-500"
              } ${item.label === "CRITICAL" ? "animate-ping" : ""}`}
            ></div>

            {/* Hover details */}
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs z-10 w-32">
              <div className="font-bold">{item.label}</div>
              <div className="mt-1">
                <div className="flex justify-between">
                  <span>Male:</span>
                  <span>{Math.round(item.count * 0.6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Female:</span>
                  <span>{Math.round(item.count * 0.4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg age:</span>
                  <span>{30 + idx * 10} yrs</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-tr-full opacity-50 transition-transform duration-700 transform group-hover:rotate-12"></div>

      {/* Animated decoration */}
      <div
        className={`absolute bottom-4 left-4 transition-all duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500 rounded-full opacity-10 animate-ping"></div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ConditionsSummary;
