import React from "react";

const DeviceFilterSidebar = ({ devices, selectedDevice, onSelect }) => {
  return (
    <div className="device-filter-sidebar">
      <button className="back-button">←</button>
      <ul className="device-list">
        {devices.map((device) => (
          <li
            key={device}
            className={`device-item ${
              selectedDevice === device ? "active" : ""
            }`}
            onClick={() => onSelect(device)}
          >
            {device}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceFilterSidebar;
     