import React from "react";

function Header() {
  const handleZoomIn = () => {
    // Додайте код для збільшення масштабу
  };

  const handleZoomOut = () => {
    // Додайте код для зменшення масштабу
  };

  const handleCenter = () => {
    // Додайте код для переміщення всієї схеми до центру
  };

  return (
    <div className="header">
      <div className="title">Services</div>
      <div className="buttons">
        <button onClick={handleZoomIn}>Збільшити масштаб</button>
        <button onClick={handleZoomOut}>Зменшити масштаб</button>
        <button onClick={handleCenter}>Помістити в центр</button>
        {/* Додайте кнопку масштабу та інші елементи за потреби */}
      </div>
    </div>
  );
}

export default Header;
