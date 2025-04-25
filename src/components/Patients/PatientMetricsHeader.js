import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { COLORS } from "@/utils/colors";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PatientMetricsHeader = ({ patientMetrics, isLoaded, fadeInClass }) => {
  // Data for condition distribution chart
  const conditionData = {
    labels: ["Stable", "Fair", "Critical"],
    datasets: [
      {
        data: [
          patientMetrics.conditionSummary?.stable || 14,
          patientMetrics.conditionSummary?.fair || 5,
          patientMetrics.conditionSummary?.critical || 1,
        ],
        backgroundColor: [
          COLORS.ACCENT_GREEN,
          COLORS.CHART_YELLOW,
          COLORS.ACCENT_RED,
        ],
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1A1F2B",
        padding: 10,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} patients (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Convenience function to format numbers with + sign for increases
  const formatNumber = (num, prevNum) => {
    if (!prevNum) return num;
    const diff = num - prevNum;
    if (diff > 0) {
      return (
        <>
          {num} <span className="text-xs text-green-500">+{diff}</span>
        </>
      );
    }
    if (diff < 0) {
      return (
        <>
          {num} <span className="text-xs text-red-500">{diff}</span>
        </>
      );
    }
    return num;
  };

  return (
    <div
      className={`bg-white p-6 border-b ${fadeInClass} transition-all duration-500`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side - title and statistics */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Patients</h1>
          <p className="text-gray-500">
            Manage and monitor all patients in your care
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
              <div className="flex items-center">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                  >
                    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                    <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-sm">Total Patients</p>
                  <p className="font-bold text-xl">
                    {formatNumber(
                      patientMetrics.total,
                      patientMetrics.total - patientMetrics.newToday
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <rect
                      x="2"
                      y="14"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-sm">Appointments</p>
                  <p className="font-bold text-xl">
                    {patientMetrics.scheduled}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-sm">New Today</p>
                  <p className="font-bold text-xl">
                    {patientMetrics.newToday}
                    <span className="text-xs text-green-500 ml-1">+3</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-sm">Critical Cases</p>
                  <p className="font-bold text-xl">{patientMetrics.urgent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - health status chart */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-medium text-sm mb-3">Patients by Condition</h2>
            <div className="flex items-center">
              <div className="w-20 h-20 relative">
                <Doughnut data={conditionData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold">
                      {patientMetrics.total}
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>

              <div className="ml-4 flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">Stable</span>
                    </div>
                    <span className="text-sm font-medium">
                      {patientMetrics.conditionSummary?.stable || 14}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      <span className="text-sm">Fair</span>
                    </div>
                    <span className="text-sm font-medium">
                      {patientMetrics.conditionSummary?.fair || 5}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-sm">Critical</span>
                    </div>
                    <span className="text-sm font-medium">
                      {patientMetrics.conditionSummary?.critical || 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMetricsHeader;
