import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const Header = () => {
  const {currentPlayer, countDown, endGame} = useContext(DataContext);
  return (
    <header className='w-[95%] h-[10%] bg-blue-200 text-black 
            flex flex-row items-center justify-around 
             rounded-xl border-be-4 border-solid border-gray-500
            
            '>
            <div className="w-[30%] h-full flex flex-row items-center justify-center " >
              <h1 className="header-fs">Turn:</h1>
              <p className="header-p-fs">{currentPlayer}</p>
              <span className="header-span-fs">[{countDown}]</span>
            </div>
            <button onClick={endGame} className="
                 fs2 w-[30%] h-[80%]
                text-black rounded-3xl cursor-pointer 
                bg-white border-none outline-none font-bold uppercase tracking-widest
                transition-all duration-300 ease-in-out focus:text-shadow-[0_0_2px_#4ade80]
                hover:text-shadow-[0_0_2px_#4ade80]
                focus:shadow-[0_0_2px_5px_#4ade80] hover:shadow-[0_0_2px_5px_#4ade80]
              focus:text-white hover:text-white focus:bg-black/80 hover:bg-black/80
            ">
              End Game</button>
    </header>
  )
}

export default Header
