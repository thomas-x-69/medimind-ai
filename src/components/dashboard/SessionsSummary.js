import React from 'react';

const SessionsSummary = ({
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
  handleDrop,
  setModalType,
  setShowModal
}) => {
  // Session data
  const sessionData = [
    {value: '03:45 h', label: 'IN CLINIC', icon: 'clipboard'},
    {value: '02:00 min', label: 'VIDEO CALLS', icon: 'message'},
    {value: '00:24 min', label: 'IN CHAT', icon: 'coffee'}
  ];

  const renderIcon = (iconName) => {
    if (iconName === 'clipboard') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      );
    }
    if (iconName === 'message') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      );
    }
    if (iconName === 'coffee') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      );
    }
    return null;
  };

  return (
    <div 
      key={`card-${cardType}`}
      className={`${cardBgClasses[cardType]} rounded-2xl p-5 relative overflow-hidden transition-all duration-500 transform ${scaleInClass} ${fadeInClass} delay-500 cursor-move hover:shadow-lg ${hoveredCard === cardType ? 'scale-[1.02]' : ''} ${isDragging && draggedItem === cardType ? 'opacity-50' : 'opacity-100'}`}
      onMouseEnter={() => setHoveredCard(cardType)}
      onMouseLeave={() => setHoveredCard(null)}
      draggable={true}
      onDragStart={() => handleDragStart(cardType)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(cardType)}
    >
      <h2 className="text-xl font-bold mb-4">Sessions:</h2>
      <div className="space-y-4">
        {sessionData.map((item, idx) => (
          <div 
            key={item.label} 
            className="transition-all duration-300 hover:transform hover:scale-105 cursor-pointer relative"
            onClick={(e) => {
              e.stopPropagation();
              // Show modal based on type
              setModalType(item.label.toLowerCase().replace(' ', '-'));
              setShowModal(true);
            }}
          >
            <div className={`${idx === 0 ? 'bg-blue-100/50' : 'bg-white'} p-3 rounded-xl flex items-center justify-between`}>
              <div className="flex items-center">
                <div className={`w-2 h-10 ${
                  idx === 0 ? 'bg-[#78AEFF]' : 
                  idx === 1 ? 'bg-gray-400' : 'bg-[#5669FF]'
                } rounded-full mr-3`}></div>
                <div>
                  <p className="text-gray-500 text-xs">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              </div>
              <div className={`${
                idx === 0 ? 'bg-blue-100 text-blue-700' : 
                idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'
              } px-2 py-1 rounded text-xs`}>
                {item.value.split(' ')[1]}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden w-full">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                style={{ width: isLoaded ? `${(idx === 0 ? 75 : idx === 1 ? 45 : 15)}%` : '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-tl-full opacity-50 transition-transform duration-700 transform group-hover:rotate-12"></div>
      
      {/* Interactive data indicator */}
      <div className="flex mt-4 justify-center">
        <div className="text-xs px-2 py-1 bg-blue-100 rounded-full transition-all duration-300 hover:bg-blue-200 cursor-pointer">
          Compare with last week →
        </div>
      </div>
    </div>
  );
};

export default SessionsSummary;