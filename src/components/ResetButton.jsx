import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const ResetButton = () => {
  const {resetGame} = useContext(DataContext);
  return (
    <article className="w-[95%] h-[10%] mt-4">
        <button onClick={resetGame} className="w-full h-full text-black rounded-3xl cursor-pointer 
        bg-white border-none outline-none font-bold uppercase tracking-widest
        transition-all duration-300 ease-in-out focus:text-shadow-[0_0_2px_#4ade80]
         hover:text-shadow-[0_0_2px_#4ade80]
         focus:shadow-[0_0_2px_5px_#4ade80] hover:shadow-[0_0_2px_5px_#4ade80]
         focus:text-white hover:text-white focus:bg-black/80 hover:bg-black/80
         header-fs
        ">
            Reset
        </button>
    </article>
  )
}

export default ResetButton

