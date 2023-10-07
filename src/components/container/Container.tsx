import React, { useState } from "react";
import Block from "../block/Block";
import Schema from "../schema/Schema";
import "./Container.css";

interface ContainerProps {
  scale: number;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

function Container({ scale, position, setPosition }: ContainerProps) {
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
        style={{
          left: position.x,
          top: position.y,
          transform: `scale(${scale})`,
        }}
      >
        <Schema />
      </div>
    </div>
  );
}

export default Container;
