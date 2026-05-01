import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const StartGameBtn = () => {
  const {startGame, bgRf, countUpBtnRf} = useContext(DataContext);
  return (
    <section className="w-full h-screen bg-black flex items-center justify-center">
      <article className="
      w-[40%] h-[70%] flex items-center justify-center
      ">
        <button
        ref={bgRf}
        onClick={() => startGame()}
        className="text-black borderRadius fs 
         cursor-pointer bg-[conic-gradient(#4ade80_3deg,white_3deg)] relative
        border-none outline-none font-bold uppercase tracking-widest
        transition-all duration-300 ease-in-out focus:text-shadow-[0_0_2px_#4ade80]
        hover:text-shadow-[0_0_2px_#4ade80] focus:text-white hover:text-white
        flex items-center justify-center
        after:absolute after:block after:bg-white borderRF 
        after:transition-all after:duration-300 after:ease-in-out
      focus:after:bg-[#333] hover:after:bg-[#333]
        "
        >
          <span ref={countUpBtnRf} className="z-10">Start Game</span>
        </button>
      </article>
    </section>
  )
}

export default StartGameBtn