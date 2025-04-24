import React from "react";

const VisitsSummary = ({
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
  visitData,
  chartData,
  setChartData,
  hoveredDataPoint,
  setHoveredDataPoint,
  chartRef,
  timeSlots,
  draggingEnabled,
}) => {
  return (
    <div
      key={`card-${cardType}`}
      className={`${
        cardBgClasses[cardType]
      } rounded-2xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-300 
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
      ref={chartRef}
    >
      {draggingEnabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-white bg-opacity-80 px-3 py-1 rounded-lg text-sm font-medium">
            Drag to reposition
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 relative z-20">
        <h2 className="text-xl font-bold">Visits summary:</h2>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Generate new random data
              setChartData(
                chartData.map((point) => ({
                  ...point,
                  y: Math.max(
                    5,
                    Math.min(45, point.y + (Math.random() * 10 - 5))
                  ),
                }))
              );
            }}
            className="text-xs flex items-center space-x-1 bg-black text-white px-2 py-0.5 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex space-x-10 mb-2 relative z-20">
        {visitData.map((item, idx) => (
          <div
            key={item.label}
            className="transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
          >
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className="font-bold text-lg">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="h-20 w-full relative z-20">
        <svg
          viewBox="0 0 400 60"
          className="w-full"
          onMouseLeave={() => setHoveredDataPoint(null)}
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="50"
            x2="400"
            y2="50"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="35"
            x2="400"
            y2="35"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="20"
            x2="400"
            y2="20"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="5"
            x2="400"
            y2="5"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Chart.js style curve with gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill under the line */}
          {chartData && (
            <path
              d={
                isLoaded
                  ? `M${chartData[0].x},${chartData[0].y} ${chartData
                      .map((point) => `L${point.x},${point.y}`)
                      .join(" ")} L${chartData[chartData.length - 1].x},50 L${
                      chartData[0].x
                    },50 Z`
                  : "M0,50 L400,50 Z"
              }
              fill="url(#lineGradient)"
              className="transition-all duration-1000"
            />
          )}

          {/* Main curve line */}
          {chartData && (
            <path
              d={
                isLoaded
                  ? `M${chartData[0].x},${chartData[0].y} ${chartData
                      .map((point) => `L${point.x},${point.y}`)
                      .join(" ")}`
                  : "M0,50 L400,50"
              }
              fill="none"
              stroke="#ec4899"
              strokeWidth="2"
              className="transition-all duration-1000"
            />
          )}

          {/* Interactive data points */}
          {chartData &&
            chartData.map((point, idx) => (
              <circle
                key={idx}
                cx={point.x}
                cy={isLoaded ? point.y : 50}
                r={idx === 22 ? 3 : 0} // Only show the highlighted point initially
                fill="#ec4899"
                stroke={idx === 22 ? "white" : "none"}
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                style={{
                  transform:
                    hoveredDataPoint === idx
                      ? "scale(1.5)"
                      : idx === 22
                      ? "scale(1)"
                      : "scale(0)",
                  transformOrigin: `${point.x}px ${point.y}px`,
                  opacity:
                    idx === 22 ||
                    hoveredDataPoint === idx ||
                    (hoveredDataPoint !== null &&
                      Math.abs(hoveredDataPoint - idx) < 2)
                      ? 1
                      : 0,
                }}
                onMouseEnter={() => setHoveredDataPoint(idx)}
              />
            ))}

          {/* Interactive tooltip for data point */}
          {hoveredDataPoint !== null && chartData && (
            <g>
              <rect
                x={chartData[hoveredDataPoint].x - 30}
                y={chartData[hoveredDataPoint].y - 30}
                width="60"
                height="22"
                rx="4"
                fill="rgba(0,0,0,0.8)"
              />
              <text
                x={chartData[hoveredDataPoint].x}
                y={chartData[hoveredDataPoint].y - 15}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {hoveredDataPoint === 22
                  ? "10 min"
                  : `${Math.round(50 - chartData[hoveredDataPoint].y)} min`}
              </text>
            </g>
          )}

          {/* Highlight line */}
          <line
            x1="180"
            y1={isLoaded ? "10" : "50"}
            x2="180"
            y2="60"
            stroke="#9ca3af"
            strokeDasharray="3"
            strokeWidth="1"
            className="transition-all duration-1000"
          />
        </svg>

        <div className="absolute top-full left-0 right-0 mt-1 flex justify-between text-xs text-gray-500">
          {timeSlots.map((time, idx) => (
            <span
              key={time}
              className={`${
                idx === 3 ? "font-bold text-black" : ""
              } cursor-pointer hover:text-gray-800 transition-colors duration-300`}
              onClick={() => {
                // Update the highlight line position
                const line = chartRef.current?.querySelector("line");
                if (line) {
                  const x = 57 + idx * 57; // Rough calculation based on 7 time slots
                  line.setAttribute("x1", x);
                  line.setAttribute("x2", x);
                }
              }}
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 transition-transform duration-700 transform group-hover:scale-110"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 transition-transform duration-700 transform group-hover:scale-110"></div>
    </div>
  );
};

export default VisitsSummary;
