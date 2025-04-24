// PatientsSummaryNew.js - Create this as a new file
import React, { useRef, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientsSummaryNew = ({
  cardType = "patients",
  isLoaded = true,
  patientData = [
    { age: "5-21 Y.O", count: 5, time: "07:30 p.m" },
    { age: "22-32 Y.O", count: 14, time: "07:30 p.m" },
    { age: "32-45 Y.O", count: 5, time: null },
    { age: "45+ Y.O", count: 2, time: "12:00 p.m" },
  ],
}) => {
  // Create a ref to access chart methods
  const chartRef = useRef(null);

  // Chart data
  const chartData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        // Background bars
        label: "Background",
        data: [25, 30, 35, 40, 32, 28, 22],
        backgroundColor: "#fe9a0070",
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        order: 2,
      },
      {
        // Main bars
        label: "Patients",
        data: [35, null, 45, 90, 30, null, 0],
        backgroundColor: (context) => {
          const index = context.dataIndex;

          return "#000000";
        },
        borderWidth: (context) => {
          const index = context.dataIndex;
          if (index === 1 || index === 5) {
            return 2;
          }
          return 0;
        },
        borderColor: "rgb(156, 163, 175)",
        borderDash: [5, 5],
        borderRadius: 4,
        barPercentage: 0.7,
        order: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        beginAtZero: true,
        max: 100,
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            if (index === 1 || index === 5) return "";
            const value = context.raw;
            if (value > 0) return `${Math.round(value / 8)} patients`;
            return "";
          },
        },
      },
    },
    animation: { duration: 0 }, // Disable animations to prevent constant updates
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #E3B15C, #FFECD1)",
        borderRadius: "1.5rem",
        padding: "1.25rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cross decoration in background */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "8rem",
          height: "8rem",
          opacity: 0.2,
          transform: "rotate(20deg)",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-2rem",
            right: "2rem",
            width: "3rem",
            height: "11rem",
            backgroundColor: "#b85011",
            borderRadius: "0.5rem",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "-1.5rem",
            width: "11rem",
            height: "3rem",
            backgroundColor: "#b85011",
            borderRadius: "0.5rem",
          }}
        ></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
          position: "relative",
          zIndex: 20,
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#92400E", // amber-800
          }}
        >
          Patients
        </h2>
      </div>

      {/* Patient data display */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 20,
        }}
      >
        {patientData.map((item, idx) => (
          <div key={item.age} style={{ transition: "all 0.3s" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                color: "#78350F", // amber-900
              }}
            >
              {item.count} pers
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#92400E", // amber-800
              }}
            >
              {item.age}
            </div>
            <div style={{ position: "relative", marginTop: "0.25rem" }}>
              <div
                style={{
                  width: "3.5rem",
                  borderBottom: "1px solid #92400E",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart section - Using Chart.js directly */}
      <div
        style={{
          marginTop: "1.5rem",
          height: "7rem",
          position: "relative",
          zIndex: 20,
        }}
      >
        <Bar data={chartData} options={chartOptions} height={112} />
      </div>

      {/* Time labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.25rem",
          zIndex: 20,
          padding: "0 0.5rem",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "#92400E", // amber-800
          }}
        >
          07:30 p.m
        </div>
        <div style={{ flex: "1" }}></div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "#92400E", // amber-800
          }}
        >
          12:00 p.m
        </div>
      </div>
    </div>
  );
};

export default PatientsSummaryNew;
