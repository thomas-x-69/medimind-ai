import React from "react";

const ConditionsSummary = ({
  cardType,
  isLoaded,
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
    { count: 14, label: "STABLE", color: "#4CAF50" },
    { count: 5, label: "FAIR", color: "#FFC107" },
    { count: 1, label: "CRITICAL", color: "#FF5454" },
  ];

  return (
    <div
      key={`card-${cardType}`}
      className={`bg-[#bdf5d720] rounded-2xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-400 col-span-2 
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

      {/* First flex container - Header */}
      <div className="flex justify-between items-center mb-6 relative z-20">
        <h2 className="text-xl font-bold text-[#92400E]">By condition</h2>
      </div>

      {/* Second flex container with responsive classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
        {/* First column - Patient conditions */}
        <div className="flex flex-col space-y-6">
          {conditionData.map((item) => (
            <div
              key={item.label}
              className="flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const el = e.currentTarget;
                el.classList.add("animate-bounce");
                setTimeout(() => el.classList.remove("animate-bounce"), 300);

                setShowToast(true);
                setToastMessage(
                  `${
                    item.count
                  } patients in ${item.label.toLowerCase()} condition`
                );
                setTimeout(() => setShowToast(false), 2000);
              }}
            >
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2`}
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-sm font-medium text-[#92400E]">
                  {item.label}
                </div>
              </div>
              <div className="font-bold text-2xl text-[#78350F] ml-5">
                {item.count} pers
              </div>
              <div
                className="w-full mt-1 border-b border-[#92400E] opacity-30 ml-5"
                style={{ width: "8rem" }}
              />
            </div>
          ))}
        </div>

        {/* Second column - Charts or stats */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 relative">
          <div className="space-y-4">
            {conditionData.map((item, index) => (
              <div key={`progress-${item.label}`} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-[#92400E]">
                    {item.label}
                  </span>
                  <span className="text-xs text-[#78350F]">
                    {Math.round((item.count / 20) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-[#F3E1C8] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.count / 20) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-[#92400E] border-opacity-20">
              <div className="flex justify-center text-xl text-[#92400E] ">
                <div>
                  Total patients: <span className="font-bold ">20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsSummary;
