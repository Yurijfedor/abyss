import React, { useState } from "react";
import "./Container.css"; // Підключаємо CSS для стилізації

function Container() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      className="app-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="inner-block"
        style={{ left: position.x, top: position.y }}
      >
        {/* Вставте ваш блок і інші компоненти */}
        <div
          style={{
            width: 200,
            height: 50,
            border: 1,
            borderColor: "black",
            borderStyle: "dashed",
            backgroundColor: "orange",
          }}
        >
          General
        </div>
      </div>
    </div>
  );
}

export default Container;

<div
  style={{
    width: 200,
    height: 50,
    border: 1,
    borderColor: "black",
    borderStyle: "dashed",
    backgroundColor: "orange",
  }}
>
  General
</div>;
