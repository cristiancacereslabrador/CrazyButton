import { FaHeart } from "react-icons/fa/index.esm.js";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

const getRandomPosition = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const buttonWidth = 120;
  const buttonHeight = 40;

  const maxX = windowWidth - buttonWidth;
  const maxY = windowHeight - buttonHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  return { x: randomX, y: randomY };
};

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-orange-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const App = () => {
  const [showButton, setShowButton] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState(getRandomPosition());
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: getRandomColor(),
    color: "text-white",
  });
  const [showLoveText, setShowLoveText] = useState(false);
  const [textColor, setTextColor] = useState("text-red-500");
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const buttonInterval = setInterval(() => {
      setButtonPosition(getRandomPosition());
    }, 350);

    const colorInterval = setInterval(() => {
      setTextColor((prevColor) => {
        const colors = [
          "text-red-500",
          "text-blue-500",
          "text-green-500",
          "text-indigo-500",
          "text-pink-500",
          "text-purple-500",
          "text-teal-500",
          "text-orange-500",
        ];

        const nextIndex = (colorIndex + 1) % colors.length;
        setColorIndex(nextIndex);

        return colors[nextIndex];
      });
    }, 1000);

    return () => {
      clearInterval(buttonInterval);
      clearInterval(colorInterval);
    };
  }, [colorIndex]);

  const handleClick = () => {
    if (clickCount < 4) {
      setClickCount(clickCount + 1);

      const newPosition = getRandomPosition();
      const newColor = getRandomColor();

      setButtonPosition(newPosition);
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        backgroundColor: newColor,
        color: "text-white",
      }));
    } else if (clickCount === 4) {
      setClickCount(clickCount + 1);
      setShowButton(false);
      setShowLoveText(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {showButton && (
        <div className="absolute top-0 left-0 m-4">
          <p className={`text-2xl text-center font-comforter ${textColor}`}>
            SI ME QUIERES TOCA EL BOTON 5 VECES!
          </p>
        </div>
      )}

      <Transition
        show={showButton}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <button
          className={`px-4 py-2 rounded-full mb-4 uppercase text-bold ${buttonStyle.backgroundColor} ${buttonStyle.color}`}
          style={{
            position: "absolute",
            top: `${buttonPosition.y}px`,
            left: `${buttonPosition.x}px`,
            transition: "top 0.5s, left 0.5s",
          }}
          onClick={handleClick}
        >
          TOCAME!
        </button>
      </Transition>

      {showLoveText && (
        <div className="flex flex-col items-center">
          <p className={`text-6xl text-center font-comforter ${textColor}`}>
            YO TE QUIERO MÁS A TI!
          </p>
          <FaHeart className={`w-60 h-60 animate-pulse mt-4 ${textColor}`} />
        </div>
      )}
      {showLoveText && (
        <div className="absolute bottom-0 right-0 m-4">
          <p className={`text-2xl text-center font-comforter ${textColor}`}>
            C.V.C.L.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
