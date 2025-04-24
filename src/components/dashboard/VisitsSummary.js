import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const VisitsSummary = ({ isLoaded = false }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Visit data
  const visitData = [
    { label: "AVERAGE", value: "24", unit: "min" },
    { label: "MINIMUM", value: "15", unit: "min" },
    { label: "MAXIMUM", value: "01:30", unit: "h" },
  ];

  const timeSlots = [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
  ];

  useEffect(() => {
    if (chartRef.current && isLoaded) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Create gradient for fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "rgba(255, 158, 185, 0.5)");
      gradient.addColorStop(1, "rgba(255, 158, 185, 0.0)");

      // Sample data to match the design
      const data = {
        labels: timeSlots,
        datasets: [
          {
            label: "Visits",
            data: [3, 5, 4, 7, 6, 8, 9],
            borderColor: "#9E77ED",
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      };

      // Create the chart
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#6B7588",
                font: {
                  size: 10,
                },
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isLoaded, timeSlots]);

  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Visits summary:</h3>
      <div className="flex justify-between mb-5">
        {visitData.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-xl font-bold">
              {item.value}{" "}
              <span className="text-xs text-gray-500 uppercase">
                {item.unit}
              </span>
            </span>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="h-36 relative">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        {timeSlots.map((time) => (
          <span key={time}>{time}</span>
        ))}
      </div>
    </div>
  );
};

export default VisitsSummary;
