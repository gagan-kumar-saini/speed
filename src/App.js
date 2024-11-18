import React, { useState, useEffect } from 'react';
import DigitalNumber from './DigitalNumber';  // Assuming DigitalNumber component is in the same folder
import './App.css'; // Import your CSS for styling

const App = () => {
  const [speed, setSpeed] = useState(0);
  const [unit, setUnit] = useState("km/h"); // Default unit is km/h

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { speed } = position.coords;
          const speedKmh = speed ? (speed * 3.6).toFixed(2) : 0;  // Convert m/s to km/h
          setSpeed(speedKmh);
        },
        (error) => {
          console.error("Error fetching location data: ", error);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to convert speed based on the selected unit
  const getConvertedSpeed = () => {
    if (unit === "km/h") {
      return speed;
    } else if (unit === "m/s") {
      return (speed / 3.6).toFixed(2);  // Convert km/h to m/s
    }
    return speed;
  };

  return (
    <div id="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Speed Tracker App</h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="digital-speed-container">
          <DigitalNumber
            nums={getConvertedSpeed()}  // Show the converted speed as a string
            color="#FF0000"  // Active line color
            unActiveColor="#22221e"  // Inactive line color
            backgroundColor="transparent"  // Remove background color
            transform={true}  // Apply transformation (animation)
            transformDuration={600}  // Animation duration in ms
          />
        </div>

        {/* Unit Selector */}
        <div className="unit-selector">
          <label htmlFor="unit-selector">Select Unit: </label>
          <select
            id="unit-selector"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="km/h">km/h</option>
            <option value="m/s">m/s</option>
          </select>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>© 2024 Speed Tracker App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
