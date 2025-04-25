import React, { useRef, useEffect } from "react";

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
  // Reference for canvas element
  const canvasRef = useRef(null);

  // Draw smooth chart on canvas
  useEffect(() => {
    if (!canvasRef.current || !chartData || !isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#dfabd1");
    gradient.addColorStop(1, "#dfabd110");

    // Draw gridlines
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const y = height - (i + 1) * (height / 5);
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.strokeStyle = "rgba(227, 177, 92, 0.15)";
    ctx.stroke();

    // Create points for smooth curve
    const points = chartData.map((point, index) => ({
      x: (index / (chartData.length - 1)) * width,
      y: height - ((point.y - 5) / 45) * height,
    }));

    // Draw the smooth curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Create smooth curve with bezier curves
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.quadraticCurveTo(
      points[points.length - 2].x,
      points[points.length - 2].y,
      points[points.length - 1].x,
      points[points.length - 1].y
    );

    // Continue the path for the fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the line on top
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.quadraticCurveTo(
      points[points.length - 2].x,
      points[points.length - 2].y,
      points[points.length - 1].x,
      points[points.length - 1].y
    );

    ctx.strokeStyle = "#E05C8C";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw highlighted data point if any
    if (hoveredDataPoint !== null) {
      const point = points[hoveredDataPoint];
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E05C8C";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Always highlight a specific point (index 22) with a smaller dot
    if (points[22]) {
      ctx.beginPath();
      ctx.arc(points[22].x, points[22].y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#E05C8C";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [chartData, isLoaded, hoveredDataPoint]);

  return (
    <div
      key={`card-${cardType}`}
      className={`rounded-2xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-300 
      ${draggingEnabled ? "draggable-component" : ""}
      ${hoveredCard === cardType ? "scale-[1.02]" : ""} 
      ${isDragging && draggedItem === cardType ? "dragging" : "opacity-100"}`}
      style={{
        background:
          "linear-gradient(to bottom, rgba(244, 114, 182, 0.75), rgba(244, 114, 182, 0.2))",
      }}
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

      {/* Heart background */}

      <div className="flex justify-between items-center mb-4 relative z-20">
        <h2 className="text-xl font-bold text-[#a74b7b]">Visits summary</h2>
        <div className="flex space-x-2"></div>
      </div>

      <div className="flex space-x-10 mb-8 relative z-20">
        {visitData.map((item, idx) => (
          <div
            key={item.label}
            className="transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
          >
            <div className="text-xs text-[#a74b7b]">{item.label}</div>
            <div className="font-bold text-lg text-[#903b67]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="h-20 w-full relative z-20 pt-2">
        <canvas
          ref={canvasRef}
          width="400"
          height="80"
          className="w-full h-full cursor-pointer"
          onMouseMove={(e) => {
            if (!chartData) return;

            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const index = Math.round((x / rect.width) * (chartData.length - 1));

            if (index >= 0 && index < chartData.length) {
              setHoveredDataPoint(index);
            }
          }}
          onMouseLeave={() => setHoveredDataPoint(null)}
        />

        {/* Tooltip for hovered data point */}
        {hoveredDataPoint !== null && chartData && (
          <div
            className="absolute bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs transform -translate-x-1/2 -translate-y-full pointer-events-none"
            style={{
              left: `${(hoveredDataPoint / (chartData.length - 1)) * 100}%`,
              top: "0",
            }}
          >
            {hoveredDataPoint === 22
              ? "10 min"
              : `${Math.round(50 - chartData[hoveredDataPoint].y)} min`}
          </div>
        )}

        <div className="absolute top-full left-0 right-0 mt-1 flex justify-between text-xs text-[#a74b7b]">
          {timeSlots.map((time, idx) => (
            <span
              key={time}
              className={`${
                idx === 3 ? "font-bold text-[#903b67]" : ""
              } cursor-pointer hover:text-[#903b67] transition-colors duration-300`}
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitsSummary;
