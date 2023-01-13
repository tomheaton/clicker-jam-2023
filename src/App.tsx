import React, { useEffect, useReducer, useState } from "react";
import Game from "./components/game";
import {
  GameDataContext,
  GameDataDispatchContext,
  initialGameData,
  gameDataReducer,
  GameDataActions,
} from "./hooks/game_data";

const App: React.FC = () => {
  const [start, setStart] = useState<boolean>(false);
  const [gameData, dispatch] = useReducer(gameDataReducer, initialGameData);

  // useEffect(() => {
  //   console.log("here");

  //   const onUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     console.log("DON'T LEAVE ME!");
  //     alert("DON'T LEAVE ME!");

  //     const confirmationMessage = "Some message";
  //     e.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };

  //   window.addEventListener("beforeunload", onUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", onUnload);
  //   };
  // }, []);

  useEffect(() => {
    console.log("loading saved data");

    const savedData = localStorage.getItem("gameData");

    if (!savedData) {
      console.log("no saved data");
      return;
    }

    const parsedData = JSON.parse(savedData);

    console.log("parsed data", parsedData);

    if (!parsedData || !parsedData.score || !parsedData.money) {
      alert("don't mess with the local storage!");
      return;
    }

    dispatch({
      type: GameDataActions.SET_MONEY,
      value: parsedData.money,
    });

    dispatch({
      type: GameDataActions.SET_SCORE,
      value: parsedData.score,
    });
  }, []);

  const handleStart = () => {
    setStart(true);
    let audio = new Audio("walking_in_the_highlands_1.mp3");
    audio.loop = true;
    audio.play();
  };

  if (start) {
    return (
      <GameDataContext.Provider value={gameData}>
        <GameDataDispatchContext.Provider value={dispatch}>
          <Game />
        </GameDataDispatchContext.Provider>
      </GameDataContext.Provider>
    );
  }

  return (
    <div
      className={"bg-black h-screen flex flex-col items-center justify-center"}
    >
      <h1 className={"mt-2 text-white font-bold text-5xl"}>clicker-jam-2023</h1>
      <br />
      <button
        onClick={handleStart}
        className={
          "px-4 py-2 text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600"
        }
      >
        start game
      </button>
    </div>
  );
};

export default App;
