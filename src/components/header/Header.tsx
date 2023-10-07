import React, { useState } from "react";
import "./Header.css";
import { FaPlus, FaMinus, FaLocationArrow } from "react-icons/fa"; // Або інші іконки з бібліотеки react-icons

interface HeaderProps {
  scale: number;
  setScale: (scale: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
}

function Header({ scale, setScale, setPosition }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentScale, setCurrentScale] = useState(scale * 100);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleScaleChange = (newScale: number) => {
    setCurrentScale(newScale);
    setScale(newScale / 100); // Оновлюємо масштаб в форматі від 0.1 до 1
    setIsDropdownOpen(false); // Закриваємо дропдаун після вибору значення
  };

  const handleZoomIn = () => {
    // Додайте код для збільшення масштабу
    setScale(scale + 0.1); // Збільшуємо масштаб на 0.1 (можете змінити за потребою)
    setCurrentScale(currentScale + 10);
  };

  const handleZoomOut = () => {
    // Додайте код для зменшення масштабу
    setScale(scale - 0.1);
    setCurrentScale(currentScale - 10);
  };

  const handleCenter = () => {
    const innerBlock = document.querySelector(".inner-block");
    if (innerBlock) {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const innerWidth = innerBlock.clientWidth;
      const innerHeight = innerBlock.clientHeight;

      // Обчислюємо нові координати, щоб центрувати внутрішній блок
      const newX = (containerWidth - innerWidth * scale) / 2;
      const newY = (containerHeight - innerHeight * scale) / 2;

      setPosition({ x: newX, y: newY });
    }
  };

  return (
    <div className="header">
      <div className="title">Services</div>
      <div className="buttons">
        <button style={{ backgroundColor: "blue" }}>list view</button>
        <button onClick={handleCenter}>
          <FaLocationArrow />
        </button>
        <button onClick={handleZoomIn}>
          <FaPlus />
        </button>
        <button onClick={toggleDropdown}>{currentScale}%</button>
        {/* Відображення дропдауна, якщо він відкритий */}
        {isDropdownOpen && (
          <div className="dropdown">
            {Array.from({ length: 15 }, (_, index) => (
              <div
                key={index}
                onClick={() => handleScaleChange((index + 1) * 10)}
              >
                {`${(index + 1) * 10}%`}
              </div>
            ))}
          </div>
        )}
        <button onClick={handleZoomOut}>
          <FaMinus />
        </button>

        {/* Додайте кнопку масштабу та інші елементи за потреби */}
      </div>
    </div>
  );
}

export default Header;
