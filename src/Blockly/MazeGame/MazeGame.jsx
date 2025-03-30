import React, { useState } from "react";
import { motion } from "motion/react";
import { Ship } from "lucide-react";

const GRID_SIZE = 6;

// Updated maze structure ensuring a valid path from start to shore
const MAZE = [
  ["W", "W", "W", "L", "L", "L"],
  ["L", "W", "L", "L", "W", "L"],
  ["L", "W", "W", "W", "W", "L"],
  ["L", "L", "L", "L", "W", "L"],
  ["L", "W", "W", "W", "W", "F"],
  ["L", "L", "L", "L", "L", "L"],
];
const CELL_SIZE = 50; // Size of each cell in pixels

const MAZE_IMAGES = {
  W: "/assets/water.png",
  L: "/assets/boatland_3.png",
  F: "/assets/shore.png",
};

const DIRECTIONS = [
  { x: 0, y: -1, rotation: 0 }, // Up
  { x: 1, y: 0, rotation: 90 }, // Right
  { x: 0, y: 1, rotation: 180 }, // Down
  { x: -1, y: 0, rotation: 270 }, // Left
];

const BoatMaze = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [directionIndex, setDirectionIndex] = useState(1); // Facing right initially
  const [errorMessage, setErrorMessage] = useState("");

  const moveForward = () => {
    const newX = position.x + DIRECTIONS[directionIndex].x;
    const newY = position.y + DIRECTIONS[directionIndex].y;
    if (MAZE[newY] && MAZE[newY][newX] && MAZE[newY][newX] === "W") {
      setPosition({ x: newX, y: newY });
      setErrorMessage("");
    } else {
      setErrorMessage("Cannot move there! It's not a water block.");
    }
  };

  const turnLeft = () => {
    setDirectionIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  const turnRight = () => {
    setDirectionIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col items-center my-5">
      <div
        className={`grid grid-cols-6 gap-1 border-4 border-gray-700 p-2 bg-gray-900 relative`}
      >
        {MAZE.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 flex items-center justify-center border border-gray-600 
                 `}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={MAZE_IMAGES[cell]} alt="" />
              </div>
              {position.x === colIndex && position.y === rowIndex && (
                <motion.div
                  key={`${position.x}-${position.y}-${directionIndex}`} // Ensures Framer Motion resets animations properly
                  animate={{ rotate: DIRECTIONS[directionIndex].rotation }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center absolute "
                >
                  <img src="/assets/boat.png" alt="" />
                </motion.div>
              )}
            </div>
          ))
        )}
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="mt-4 space-x-2">
        <button
          onClick={moveForward}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Move Forward
        </button>
        <button
          onClick={turnLeft}
          className="px-4 py-2 bg-yellow-600 text-white rounded shadow"
        >
          Turn Left
        </button>
        <button
          onClick={turnRight}
          className="px-4 py-2 bg-red-600 text-white rounded shadow"
        >
          Turn Right
        </button>
      </div>
    </div>
  );
};

export default BoatMaze;
