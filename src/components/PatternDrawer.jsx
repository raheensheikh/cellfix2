import React, { useRef, useEffect, useState } from "react";

const PatternDrawer = ({ onPatternImageReady }) => {
  const canvasRef = useRef(null);
  const [selectedDots, setSelectedDots] = useState([]);
  const [dotPositions, setDotPositions] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const DOT_RADIUS = 10;
  const GRID_SIZE = 3;
  const CANVAS_SIZE = 240;
  const SPACING = CANVAS_SIZE / (GRID_SIZE + 1);

  useEffect(() => {
    const positions = [];
    for (let row = 1; row <= GRID_SIZE; row++) {
      for (let col = 1; col <= GRID_SIZE; col++) {
        positions.push({
          x: col * SPACING,
          y: row * SPACING,
        });
      }
    }
    setDotPositions(positions);
    drawCanvas(positions, []);
  }, []);

  const drawCanvas = (dots, selected) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (selected.length > 1) {
      ctx.beginPath();
      ctx.moveTo(dots[selected[0]].x, dots[selected[0]].y);
      for (let i = 1; i < selected.length; i++) {
        ctx.lineTo(dots[selected[i]].x, dots[selected[i]].y);
      }
      ctx.strokeStyle = "#e0131a"; // purple
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    dots.forEach((dot, index) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = selected.includes(index) ? "#e0131a" : "#ccc";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });
  };

  const getDotIndex = (x, y) => {
    for (let i = 0; i < dotPositions.length; i++) {
      const dot = dotPositions[i];
      const dist = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
      if (dist < DOT_RADIUS + 10 && !selectedDots.includes(i)) {
        return i;
      }
    }
    return null;
  };

  const handleMouseDown = (e) => {
    setSelectedDots([]);
    setDrawing(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const index = getDotIndex(x, y);
    if (index !== null) {
      setSelectedDots((prev) => {
        const newSelected = [...prev, index];
        drawCanvas(dotPositions, newSelected);
        return newSelected;
      });
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], "pattern.png", { type: "image/png" });
      onPatternImageReady(file, URL.createObjectURL(file));
    });
  };

  return (
    <div style={{ maxWidth: CANVAS_SIZE }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          border: "1px solid #ccc",
          touchAction: "none",
          borderRadius: "10px",
          width: "100%",
          height: "auto",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default PatternDrawer;
