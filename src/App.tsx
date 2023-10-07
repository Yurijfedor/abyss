import React, { useState } from "react";
import Container from "./components/container/Container";
import Header from "./components/header/Header";

function App() {
  const [scale, setScale] = useState(1); // Initialize the scale state with 1
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  return (
    <>
      <Header scale={scale} setScale={setScale} setPosition={setPosition} />
      <Container scale={scale} position={position} setPosition={setPosition} />;
    </>
  );
}

export default App;
