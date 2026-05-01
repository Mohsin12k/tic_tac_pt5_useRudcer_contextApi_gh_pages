import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const Main = () => {
  const {
    gameBoard,
    handleClick,
    winnerPad,
    finalWinner,
    showFinalWinner
  } = useContext(DataContext);
  return (
    <>
    <hr className='w-[95%] text-black font-bold mt-3' />
    <hr className='w-[95%] text-black font-bold' />

      <main className='grid grid-cols-3 grid-rows-3 w-[95%] h-[60%]
      place-items-center
      '>
             { !finalWinner &&
              <>
               { gameBoard.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`
                      bg-amber-50 w-[80%] h-[60%] text-black
                        flex items-center justify-center rounded-3xl cursor-pointer
                        font-bold text-[180%]
                        border-none outline-none
                        transition duration-400 ease-in-out transform
                        focus:text-white hover:text-white
                        focus:bg-black/80 hover:bg-black/80
                        focus:text-shadow-[0_0_2px_#4ade80] hover:text-shadow-[0_0_2px_#4ade80]
                        focus:shadow-[0_0_2px_5px_#4ade80] hover:shadow-[0_0_2px_5px_#4ade80]
                        focus:scale-105 hover:scale-105 
                        focus:text-[190%] hover:text-[190%]
                        ${winnerPad.includes(index) ? "winner" : ""}
                      `}
                  >
                    {cell || "❓"}
                  </button>
                ))}
              </>
             }

             { finalWinner &&
              <section className="absolute w-[36%] h-[40%] grid place-content-center">
                <article className="header-fs w-full h-full finalWinner">{showFinalWinner}</article>
              </section>
             }

      </main>
    </>

  )
}

export default Main
