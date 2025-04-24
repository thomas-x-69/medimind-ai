import React, { useState, useEffect, useRef } from "react";
import TopBar from "../layout/TopBar";
import Sidebar from "../layout/Sidebar";
import PatientsSummary from "./PatientsSummary";
import VisitsSummary from "./VisitsSummary";
import ConditionsSummary from "./ConditionsSummary";
import SessionsSummary from "./SessionsSummary";
import PatientsList from "./PatientsList";
import VisitDetails from "./VisitDetails";
import Calendar from "./Calendar";
import Toast from "../ui/Toast";
import Modal from "../ui/Modal";

const MedicalDashboard = () => {
  // Advanced state management
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("Taigo Wilkinson");
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");
  const [showNotification, setShowNotification] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("May 2024");
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchValue, setSearchValue] = useState("Lisa");
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [nextPatientTimer, setNextPatientTimer] = useState(15);
  const [liveTimeUpdate, setLiveTimeUpdate] = useState(
    new Date().toLocaleTimeString()
  );
  const [activeTags, setActiveTags] = useState(["Patients"]);
  const [isEditing, setIsEditing] = useState(false);
  const [patientNotes, setPatientNotes] = useState(
    "High fever and cough at normal hemoglobin levels."
  );
  const [timelineView, setTimelineView] = useState("All");
  const [pendingAlert, setPendingAlert] = useState(false);
  const [isExpanded, setIsExpanded] = useState({});
  const [patientStatus, setPatientStatus] = useState({
    "Taigo Wilkinson": "critical",
    "Samantha Williams": "stable",
    "Amy White": "fair",
    "Tyler Young": "stable",
  });
  const [patientVitals, setPatientVitals] = useState({
    heartRate: 88,
    bloodPressure: "130/85",
    temperature: 38.2,
    oxygen: 97,
  });
  const [isAnimatingVitals, setIsAnimatingVitals] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dashboardLayout, setDashboardLayout] = useState([
    "patients",
    "visits",
    "condition",
    "sessions",
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchInputRef = useRef(null);
  const patientCardRef = useRef(null);
  const chartRef = useRef(null);

  // Demo data
  const patients = [
    {
      id: 1,
      name: "Taigo Wilkinson",
      type: "Emergency Visit",
      time: "09 : 15 AM",
      color: "pink",
      icon: "alert",
      status: "critical",
    },
    {
      id: 2,
      name: "Samantha Williams",
      type: "Routine Check-Up",
      time: "09 : 15 AM",
      color: "blue",
      icon: "user",
      status: "stable",
    },
    {
      id: 3,
      name: "Amy White",
      type: "Video Consultation",
      time: "09 : 15 AM",
      color: "pink",
      icon: "video",
      status: "fair",
    },
    {
      id: 4,
      name: "Tyler Young",
      type: "Report",
      time: "09 : 45 AM",
      color: "green",
      icon: "file",
      status: "stable",
    },
  ];

  const patientData = [
    { age: "22-32 Y.O.", count: 14, time: "07:30 p.m" },
    { age: "32-45 Y.O.", count: 5, time: null },
    { age: "45+ Y.O.", count: 2, time: "12:00 p.m" },
  ];

  const visitData = [
    { label: "AVERAGE", value: "24 min" },
    { label: "MINIMUM", value: "15 min" },
    { label: "MAXIMUM", value: "01:30 h" },
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

  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  const events = [
    {
      time: "07:00",
      icon: "heart",
      color: "pink",
      title: "Emergency visit",
      location: "West camp, Room 312",
      duration: "07:00 - 07:50",
    },
    {
      time: "07:30",
      icon: "file",
      color: "gray",
      title: "Diagnostic test",
      location: "East camp, Laboratory floor 5",
      duration: "07:30 - 07:50",
    },
    {
      time: "08:00",
      icon: "team",
      color: "amber",
      title: "Team daily planning",
      location: "East camp, Room 200",
      duration: "08:00 - 09:00",
      hasParticipants: true,
    },
    {
      time: "09:00",
      icon: "heart",
      color: "pink",
      title: "Emergency visit",
      location: "West camp, Room 312",
    },
  ];

  const medications = [
    {
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "2 times a day",
      status: "active",
    },
    {
      name: "Diazepam",
      dosage: "5mg",
      frequency: "Day and Night before meal",
      status: "active",
    },
  ];

  // Simulate generating random chart data
  useEffect(() => {
    const generateLineData = () => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({
          x: i * 8,
          y: 30 + Math.random() * 25 - 15,
        });
      }

      // Make sure we have a significant dip at data point
      points[22] = { x: 176, y: 10 };

      return points;
    };

    setChartData(generateLineData());
  }, []);

  // Simulated real-time data updates
  useEffect(() => {
    if (!isLoaded) return;

    // Update clock every second
    const clockTimer = setInterval(() => {
      setLiveTimeUpdate(new Date().toLocaleTimeString());
    }, 1000);

    // Simulate patient timer countdown
    const patientTimer = setInterval(() => {
      setNextPatientTimer((prev) => (prev > 0 ? prev - 1 : 15));

      // When timer resets, show a notification
      if (nextPatientTimer === 1) {
        setShowToast(true);
        setToastMessage("Next patient: Samantha Williams arriving");
        setTimeout(() => setShowToast(false), 3000);
      }
    }, 1000);

    // Periodically update vital signs
    const vitalsTimer = setInterval(() => {
      setIsAnimatingVitals(true);
      setTimeout(() => {
        setPatientVitals({
          heartRate: 85 + Math.floor(Math.random() * 10),
          bloodPressure: `${120 + Math.floor(Math.random() * 20)}/${
            80 + Math.floor(Math.random() * 10)
          }`,
          temperature: 37.8 + (Math.random() * 0.8).toFixed(1),
          oxygen: 95 + Math.floor(Math.random() * 5),
        });
        setIsAnimatingVitals(false);
      }, 500);
    }, 5000);

    // Simulate random notifications
    const notificationTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);

        // Sometimes show alert too
        if (Math.random() > 0.6) {
          setPendingAlert(true);
          setTimeout(() => setPendingAlert(false), 5000);
        }
      }
    }, 10000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(patientTimer);
      clearInterval(vitalsTimer);
      clearInterval(notificationTimer);
    };
  }, [isLoaded, nextPatientTimer]);

  // Initial load animations
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Initial notification
    setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 1500);

    // Bind keyboard shortcuts
    const handleKeyDown = (e) => {
      // Ctrl+F to focus search
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearching(true);
      }

      // Escape to close modals
      if (e.key === "Escape") {
        setShowModal(false);
        setIsSearching(false);
        setIsEditing(false);
      }

      // Ctrl+D to toggle dark mode
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        setIsDarkMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle tag toggling
  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  // Handle patient click
  const handlePatientClick = (patientName) => {
    // Visual feedback (bounce animation)
    if (patientCardRef.current) {
      patientCardRef.current.classList.add("animate-bounce");
      setTimeout(() => {
        patientCardRef.current.classList.remove("animate-bounce");
      }, 300);
    }

    setSelectedPatient(patientName);

    // Show toast notification
    setShowToast(true);
    setToastMessage(`Patient ${patientName} selected`);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Handle drag start
  const handleDragStart = (item) => {
    setIsDragging(true);
    setDraggedItem(item);
  };

  // Handle drop
  const handleDrop = (targetPosition) => {
    if (!draggedItem) return;

    const newLayout = [...dashboardLayout];
    const draggedIndex = newLayout.indexOf(draggedItem);
    const targetIndex = newLayout.indexOf(targetPosition);

    // Swap positions
    if (draggedIndex !== -1 && targetIndex !== -1) {
      newLayout[draggedIndex] = targetPosition;
      newLayout[targetIndex] = draggedItem;
      setDashboardLayout(newLayout);

      // Show toast
      setShowToast(true);
      setToastMessage("Dashboard layout updated");
      setTimeout(() => setShowToast(false), 2000);
    }

    setIsDragging(false);
    setDraggedItem(null);
  };

  // Handle edit toggle
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Show toast when entering edit mode
      setShowToast(true);
      setToastMessage("Editing mode activated");
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Animation classes
  const baseClasses = isDarkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-amber-50 text-gray-800";
  const fadeInClass = isLoaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";
  const scaleInClass = isLoaded ? "scale-100" : "scale-95";
  const cardBgClasses = {
    patients: isDarkMode ? "bg-amber-900/30" : "bg-amber-200",
    visits: isDarkMode ? "bg-pink-900/30" : "bg-pink-100",
    condition: isDarkMode ? "bg-green-900/30" : "bg-green-100",
    sessions: isDarkMode ? "bg-blue-900/30" : "bg-blue-100",
  };

  return (
    <div
      className={`flex h-screen w-full font-sans overflow-hidden ${baseClasses} transition-colors duration-500`}
    >
      {/* Left Sidebar */}
      <Sidebar
        isLoaded={isLoaded}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        openModal={openModal}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Search Bar with Clock */}
        <TopBar
          isLoaded={isLoaded}
          fadeInClass={fadeInClass}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchInputRef={searchInputRef}
          activeTags={activeTags}
          toggleTag={toggleTag}
          liveTimeUpdate={liveTimeUpdate}
          pendingAlert={pendingAlert}
          nextPatientTimer={nextPatientTimer}
          showNotification={showNotification}
          openModal={openModal}
        />

        {/* Main Dashboard Content */}
        <div className="flex-1 flex overflow-auto">
          <div className="flex-1 p-6">
            {/* Header */}
            <div
              className={`pb-4 transition-all duration-700 ${fadeInClass} delay-100`}
            >
              <div className="flex justify-between items-center">
                <h1
                  className={`text-4xl font-bold ${
                    isEditing
                      ? "border-b-2 border-dashed border-gray-400 pb-1"
                      : ""
                  }`}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                >
                  Good morning, Dr.Olivia
                </h1>
                <button
                  onClick={toggleEdit}
                  className={`flex items-center space-x-1 text-sm px-3 py-1 rounded transition-colors duration-300 ${
                    isEditing
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>
              <p
                className={`text-gray-500 mt-1 text-sm ${
                  isEditing
                    ? "border-b-2 border-dashed border-gray-400 pb-1"
                    : ""
                }`}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
              >
                Intelly wishes you a good and productive day. 45 patients
                waiting for your treatment today. You also have one live event
                in your calendar today.
              </p>
            </div>

            <div className="flex justify-between items-center mt-3 mb-3">
              <div></div>
              <div
                className="text-sm text-gray-500 cursor-pointer hover:text-gray-800 transition-colors duration-300 flex items-center group"
                onClick={() => openModal("all")}
              >
                Show all{" "}
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 gap-4">
              {dashboardLayout.map((cardType) => {
                if (cardType === "patients") {
                  return (
                    <PatientsSummary
                      key={cardType}
                      cardType={cardType}
                      isLoaded={isLoaded}
                      cardBgClasses={cardBgClasses}
                      scaleInClass={scaleInClass}
                      fadeInClass={fadeInClass}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      isDragging={isDragging}
                      draggedItem={draggedItem}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      patientData={patientData}
                      hoveredBarIndex={hoveredBarIndex}
                      setHoveredBarIndex={setHoveredBarIndex}
                      openModal={openModal}
                    />
                  );
                }

                if (cardType === "visits") {
                  return (
                    <VisitsSummary
                      key={cardType}
                      cardType={cardType}
                      isLoaded={isLoaded}
                      cardBgClasses={cardBgClasses}
                      scaleInClass={scaleInClass}
                      fadeInClass={fadeInClass}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      isDragging={isDragging}
                      draggedItem={draggedItem}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      visitData={visitData}
                      chartData={chartData}
                      setChartData={setChartData}
                      hoveredDataPoint={hoveredDataPoint}
                      setHoveredDataPoint={setHoveredDataPoint}
                      chartRef={chartRef}
                      timeSlots={timeSlots}
                    />
                  );
                }

                if (cardType === "condition") {
                  return (
                    <ConditionsSummary
                      key={cardType}
                      cardType={cardType}
                      isLoaded={isLoaded}
                      cardBgClasses={cardBgClasses}
                      scaleInClass={scaleInClass}
                      fadeInClass={fadeInClass}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      isDragging={isDragging}
                      draggedItem={draggedItem}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      openModal={openModal}
                      setShowToast={setShowToast}
                      setToastMessage={setToastMessage}
                    />
                  );
                }

                if (cardType === "sessions") {
                  return (
                    <SessionsSummary
                      key={cardType}
                      cardType={cardType}
                      isLoaded={isLoaded}
                      cardBgClasses={cardBgClasses}
                      scaleInClass={scaleInClass}
                      fadeInClass={fadeInClass}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                      isDragging={isDragging}
                      draggedItem={draggedItem}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      setModalType={setModalType}
                      setShowModal={setShowModal}
                    />
                  );
                }

                return null;
              })}
            </div>

            {/* Patient List and Details */}
            <div
              className={`grid grid-cols-2 gap-4 mt-6 transition-all duration-500 ${fadeInClass} delay-700`}
            >
              {/* Patient List */}
              <PatientsList
                patients={patients}
                isLoaded={isLoaded}
                selectedPatient={selectedPatient}
                handlePatientClick={handlePatientClick}
                patientStatus={patientStatus}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                openModal={openModal}
              />

              {/* Visit Details */}
              <VisitDetails
                selectedPatient={selectedPatient}
                isEditing={isEditing}
                toggleEdit={toggleEdit}
                patientCardRef={patientCardRef}
                patientNotes={patientNotes}
                setPatientNotes={setPatientNotes}
                patientVitals={patientVitals}
                isAnimatingVitals={isAnimatingVitals}
                medications={medications}
                openModal={openModal}
              />
            </div>
          </div>

          {/* Calendar Sidebar */}
          <Calendar
            isLoaded={isLoaded}
            isDarkMode={isDarkMode}
            currentMonth={currentMonth}
            days={days}
            events={events}
            timelineView={timelineView}
            setTimelineView={setTimelineView}
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
            openModal={openModal}
          />
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}

      {/* Modal container */}
      {showModal && (
        <Modal modalType={modalType} onClose={() => setShowModal(false)} />
      )}

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalDashboard;
