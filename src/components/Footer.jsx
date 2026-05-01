import ResetButton from "./ResetButton";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const Footer = () => {
  const {
    scoreX,
    scoreO,
    result,
    resetGame,
    resultWinner
  } = useContext(DataContext);
  return (
    <>
      <footer className="w-[95%] h-[10%] text-black
      flex flex-col mt-1
      ">
        <hr className='w-[95%] text-black font-bold ' />
        <hr className='w-[95%] text-black font-bold  ' />

        <section className="w-full h-full flex flex-row items-center
        bg-blue-200 mt-2 rounded-xl
        ">
          { !resultWinner &&
            <>
              <article className="w-full h-full flex justify-around items-center">

                {/* X score */}
                <h1 className={`header-fs ${result ? "w-[15%]": ""}`}>❌:</h1>
                <p className="header-p-fs inline-block -ml-20">{scoreX}</p>              

              {/* O score article */}
                <h1 className={`header-fs -mr-20 ${result ? "w-[15%]": ""}`}>🎃:</h1>
                <p className="header-p-fs">{scoreO}</p>

              </article>
           </>
          }

          {
            resultWinner &&
            <article className="w-full h-full flex justify-center items-center">
              {/* winner  */}
              <h1 className="header-p-fs">{result}</h1>
            </article>
          }
        </section>
      </footer>
      {/* reset button section */}
        <ResetButton resetGame={resetGame} />
    </>
  )
}

export default Footer
