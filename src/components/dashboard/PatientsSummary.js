import React from "react";

const PatientsSummary = ({
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
  patientData,
  hoveredBarIndex,
  setHoveredBarIndex,
  openModal,
  draggingEnabled,
}) => {
  return (
    <div
      key={`card-${cardType}`}
      className={`${
        cardBgClasses[cardType]
      } rounded-2xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-200 
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

      <div className="flex justify-between items-start mb-4 relative z-20">
        <h2 className="text-xl font-bold">Patients:</h2>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal("patients");
            }}
            className="text-xs bg-black text-white px-2 py-0.5 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            View all
          </button>
        </div>
      </div>

      <div className="flex space-x-12 relative z-20">
        {patientData.map((item, idx) => (
          <div key={item.age} className="transition-all duration-300">
            <div className="font-bold text-lg">{item.count} pers</div>
            <div className="text-xs text-gray-500">{item.age}</div>
            <div className="mt-4 flex items-end justify-center h-28 relative">
              <div
                className="relative group"
                onMouseEnter={() => setHoveredBarIndex(idx)}
                onMouseLeave={() => setHoveredBarIndex(null)}
              >
                <div
                  className="transition-all duration-700 w-10 bg-black rounded-t-md relative"
                  style={{
                    height: isLoaded
                      ? idx === 0
                        ? "80px"
                        : idx === 1
                        ? "40px"
                        : "96px"
                      : "0px",
                    transition: "height 1s ease-out, transform 0.3s ease-out",
                    transform:
                      hoveredBarIndex === idx
                        ? "translateY(-4px)"
                        : "translateY(0)",
                  }}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-20 rounded-t-md"></div>
                </div>
                <div className="absolute -left-6 top-1/2 w-20 border-t border-dashed border-gray-400"></div>

                {hoveredBarIndex === idx && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                    {item.count} patients
                  </div>
                )}
              </div>
            </div>
            {item.time && (
              <div className="text-xs text-gray-500 mt-1">{item.time}</div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive visual elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-300 rounded-full opacity-30 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-45"></div>
      <div className="absolute top-4 right-4">
        <div className="text-xs bg-white bg-opacity-70 rounded-full px-2 py-0.5 animate-pulse">
          Live
        </div>
      </div>
    </div>
  );
};

export default PatientsSummary;
