import React from 'react';
import './DigitalNumber.css'; // Import the CSS file for styling

const DigitalNumber = ({ nums, color, unActiveColor, backgroundColor, transform, transformDuration }) => {
  const numberSegments = nums.toString().split('');  // Split the number into individual characters

  return (
    <div className="digital-number-container" style={{ backgroundColor }}>
      {numberSegments.map((num, index) => (
        <div
          key={index}
          className={`digital-number ${transform ? 'transform' : ''}`}
          style={{
            color: color,
            transitionDuration: `${transformDuration}ms`,
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default DigitalNumber;
