import React from 'react';

const ProgressBar = ({ status }) => {
  // Define the stages
  const stages = ['Pending', 'In Progress', 'Completed'];

  // Get the index of the current status
  const statusIndex = stages.indexOf(status);

  // Circle color and check mark class based on the status
  const stageClasses = (index) => {
    if (statusIndex >= index) {
      return "bg-blue-500 text-white";
    } else {
      return "bg-white border-2 border-gray-300 text-gray-300";
    }
  };

  // Line fill color
  const lineClasses = (index) => {
    if (statusIndex >= index) {
      return "bg-blue-500";
    } else {
      return "bg-transparent";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-8 text-2xl">Tracking Status</h1>
      <div className="flex items-center justify-between relative w-[90%]">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"></div>
        <div
          className={`w-8 h-8 z-10 rounded-full flex items-center justify-center ${stageClasses(0)}`}
        >
          {statusIndex >= 0 && <span className="text-white">✔</span>}
        </div>
        <div
          className={`absolute top-1/2 left-0 right-1/2 h-1 ${lineClasses(1)}`}
        ></div>
        <div
          className={`w-8 h-8 z-10 rounded-full flex items-center justify-center ${stageClasses(1)}`}
        >
          {statusIndex >= 1 && <span className="text-white">✔</span>}
        </div>
        <div
          className={`absolute top-1/2 left-1/2 right-0 h-1 ${lineClasses(2)}`}
        ></div>
        <div
          className={`w-8 h-8 z-10 rounded-full flex items-center justify-center ${stageClasses(2)}`}
        >
          {statusIndex >= 2 && <span className="text-white">✔</span>}
        </div>
      </div>
      <div className="flex items-center justify-between gap-16 w-full">
        <p>Pending</p>
        <p>In Progress</p>
        <p>Completed</p>
      </div>
    </div>
  );
};

export default ProgressBar;
