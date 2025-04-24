import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const VisitsSummary = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
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
        labels: ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"],
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
  }, []);

  return (
    <div className="p-5 bg-pink-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-pink-200 opacity-20 -mr-10 -mt-10"></div>
      <h3 className="text-lg font-semibold mb-4">Visits summary:</h3>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">24</span>
          <span className="text-xs text-gray-500 uppercase">min</span>
          <span className="text-xs text-gray-500">AVERAGE</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">15</span>
          <span className="text-xs text-gray-500 uppercase">min</span>
          <span className="text-xs text-gray-500">MINIMUM</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">01:30</span>
          <span className="text-xs text-gray-500 uppercase">h</span>
          <span className="text-xs text-gray-500">MAXIMUM</span>
        </div>
      </div>
      <div className="h-36 relative">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default VisitsSummary;
