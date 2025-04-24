import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PatientsSummary = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Sample data to match the design
      const data = {
        labels: ["07:30 p.m", "", "", "", "12:00 p.m", ""],
        datasets: [
          {
            data: [2, 1, 3, 1, 5, 2],
            backgroundColor: "#FFD166",
            borderRadius: 4,
            barThickness: 10,
            maxBarThickness: 12,
          },
        ],
      };

      // Create the chart
      chartInstance.current = new Chart(ctx, {
        type: "bar",
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
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-4">Patients:</h3>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">14</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">22-32 Y/O</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">5</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">32-45 Y/O</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">2</span>
          <span className="text-xs text-gray-500 uppercase">pers</span>
          <span className="text-xs text-gray-500">45+ Y/O</span>
        </div>
      </div>
      <div className="h-36 relative">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default PatientsSummary;
