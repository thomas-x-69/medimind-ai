import React, { useRef, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const Chart = ({
  type = "line",
  data,
  options = {},
  height = 200,
  width = "100%",
  className = "",
  isDarkMode = false,
  isLoaded = true,
  onHover = () => {},
  ...props
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(data);

  // Create gradient for chart backgrounds
  const createGradient = (ctx, color, opacity = 0.5) => {
    if (!ctx) return color;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(
      0,
      `${color}${Math.round(opacity * 255).toString(16)}`
    );
    gradient.addColorStop(1, `${color}00`);

    return gradient;
  };

  useEffect(() => {
    if (chartRef.current && isLoaded) {
      // Get the context
      const ctx = chartRef.current.getContext("2d");

      // Process data if we need to create gradients
      let processedData = { ...data };

      if (type === "line" && data.datasets) {
        processedData.datasets = data.datasets.map((dataset) => {
          if (dataset.fill) {
            return {
              ...dataset,
              backgroundColor: createGradient(ctx, dataset.borderColor, 0.3),
            };
          }
          return dataset;
        });
      }

      // Set default options based on theme
      const defaultOptions = {
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
              color: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            },
            ticks: {
              color: isDarkMode ? "#9ca3af" : "#6B7588",
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
            ticks: {
              color: isDarkMode ? "#9ca3af" : "#6B7588",
            },
          },
        },
      };

      // Merge default options with provided options
      const mergedOptions = {
        ...defaultOptions,
        ...options,
        scales: {
          ...defaultOptions.scales,
          ...(options.scales || {}),
        },
      };

      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new ChartJS(ctx, {
        type,
        data: processedData,
        options: mergedOptions,
      });

      // Set up hover event handler
      chartInstance.current.options.onHover = (event, elements) => {
        if (elements && elements.length > 0) {
          onHover(elements[0].index);
        } else {
          onHover(null);
        }
      };
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options, height, isLoaded, isDarkMode]);

  // Method to update the chart data
  const updateChart = (newData) => {
    if (chartInstance.current) {
      chartInstance.current.data = newData;
      chartInstance.current.update();
      setChartData(newData);
    }
  };

  // Expose the update method
  React.useImperativeHandle(props.chartRef, () => ({
    updateChart,
    getChart: () => chartInstance.current,
  }));

  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      <canvas ref={chartRef} {...props} />
    </div>
  );
};

export default Chart;
