import { createContext, useState, useRef, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// the following is initial states
const initialState = {
  currentPlayer: '❌',
  gameBoard: Array(9).fill(''),
  winnerPad: [],
  scoreX: 0,
  scoreO: 0,
  result: '',
  finalWinner: false,
  resultWinner: false,
  showFinalWinner: '',
};

// winning conditions
const winnerCoditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// actions must be take in cases
const Action = {
  MAKE_MOVE: 'MAKE_MOVE',
  CHANGEPLAYER: 'changePlayer',
  RESET: 'RESET',
  TRY_AGAIN: 'TRY_AGAIN',
  LAST_ROUND: 'LAST_ROUND',
};

// useReducer function
function gameReducer(state, action) {
  switch(action.type){

    case "MAKE_MOVE": {
      const { index } = action;

      if(state.gameBoard[index] || state.result){
        return { ...state, result: "Invalid 😔" };
      }

      const newBoard = [...state.gameBoard];
      newBoard[index] = state.currentPlayer;

      let newState = {
        ...state,
        gameBoard: newBoard,
        currentPlayer: state.currentPlayer === '❌' ? '🎃' : '❌',
      };

      for(let condition of winnerCoditions){
        const [a,b,c] = condition;
        if(newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]){

          let scoreX = state.scoreX;
          let scoreO = state.scoreO;

          if(newBoard[a] === '❌') 
            {
              scoreX++;
              if(scoreX === 5){
                return {
                  ...newState,
                 showFinalWinner: `Winner is ${newBoard[a]} 🎉`,
                 finalWinner: true,
                 result: `Winner is ${newBoard[a]} 🎉`,
                 resultWinner: true,
                 scoreX
                }
              }
            } else
            {
             scoreO++;
             if(scoreO === 5){
             return {
                  ...newState,
                 showFinalWinner: `Winner is ${newBoard[a]} 🎉`,
                 finalWinner: true,
                 result: `Winner is ${newBoard[a]} 🎉`,
                 resultWinner: true,
                 scoreO
                }
            }
          }
          return {
            ...newState,
            winnerPad: condition,
            result: `Winner is ${newBoard[a]} 🎉`,
            scoreX,
            scoreO,
            resultWinner: true
          };
        }
      }

      if(!newBoard.includes('')){
        return {
          ...newState,
          result: "It's Draw 😮",
          resultWinner: true
        };
      }

      return newState;
    }

    case "changePlayer":
      return {
        ...state,
        currentPlayer: state.currentPlayer === '❌' ? '🎃' : '❌',
      };

      case "LAST_ROUND":
        return {
          ...state, result: `Last Round of ${state.currentPlayer}`
        }

    case "RESET":
      return initialState;

    case "TRY_AGAIN":
      return {
        ...state,
        gameBoard: Array(9).fill(''),
        winnerPad: [],
        result: '',
        resultWinner: false,
        currentPlayer: '❌'
      };

    default:
      throw new Error();
  }
}

// the following is context Api Code

export const DataContext = createContext({});

export const DataProvider = ({children}) => {

    
// use this useReducer
const [state, dispatch] = useReducer(gameReducer, initialState);

// useStates
const [countDown, setCountDown] = useState(10);
const speed1 = 1000;
const speed2 = 2000;
const speed3 = 4000;
const speed4 = 50;

const navigate = useNavigate();
const startBtnIntervalRf = useRef(null);
const endValue = 100;
const countDownIntervalRf = useRef(0);
const [startBtn, setStartBtn] = useState(false);
const bgRf = useRef(null);
const countUpBtnRf = useRef(null);
let intervalRf = useRef(null);

// Start Button Game and clear interval

  useEffect(() => {

    resetGame();

}, []);
      // start button

  useEffect(() => {
  return () => {
    clearInterval(intervalRf.current);
    clearInterval(startBtnIntervalRf.current);
  };
}, []);
  
  const startGame = () => {
    if(startBtn) return;
    setStartBtn(true);
    startBtnIntervalRf.current = setInterval(() => {
      countDownIntervalRf.current += 1;
      let newValue = countDownIntervalRf.current;
      let degree = newValue * 3.6;
      bgRf.current.style.background = 
      `conic-gradient(#4ade80 ${degree}deg,white ${degree}deg)`;
      countUpBtnRf.current.textContent = newValue;

      if(newValue === 10){
        countUpBtnRf.current.classList.add('text-white','text-2xl');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_white]'); 
      }
      if(newValue === 30){
        countUpBtnRf.current.classList.remove('text-white','text-2xl');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_white]'); 

        countUpBtnRf.current.classList.add('text-green-500','text-3xl');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_green]'); 
      } 
      if(newValue === 80){
        countUpBtnRf.current.classList.remove('text-white','text-2xl');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_white]'); 
        countUpBtnRf.current.classList.remove('text-green-500','text-3xl');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_green]');

        countUpBtnRf.current.classList.add('text-red-500','text-4xl');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_red]'); 
      }
      if(newValue === endValue){
        clearInterval(startBtnIntervalRf.current);
        setStartBtn(false);
        countDownIntervalRf.current = 0;
        resetGame();
        tryAgain();
        navigate('/playGame');    
      }
    }, speed4);
  }

  const endGame = () => {
    navigate('/startBtn');
    resetGame();
  }

// header code timer

const startsCountDown = () => {
  clearInterval(intervalRf.current);
  setCountDown(10);
  intervalRf.current = setInterval(() => {
    setCountDown((prev) => prev - 1);
  }, speed1);
}

useEffect(() => {
 if(countDown === 0){
    dispatch({type: Action.CHANGEPLAYER});
    setCountDown(10);
    clearInterval(intervalRf.current);
    startsCountDown();
  }
}, [countDown]);

// main code
// useEffect is used for multiple conditions
useEffect(() => {
  if(state.result === "It's Draw 😮" || state.resultWinner === true){
    const timer = setTimeout(() => {
      dispatch({ type: Action.TRY_AGAIN });
    }, speed2);
    return () => clearTimeout(timer);
  } 
  if(state.finalWinner === true) {
    const timer = setTimeout(() => {
      dispatch({ type: Action.RESET });
    }, speed3);
    return () => clearTimeout(timer);
  };

  if(state.scoreX === 4 || state.scoreO === 4){
    dispatch({ type: Action.LAST_ROUND });
  }
}, [state.result, state.resultWinner, state.finalWinner, state.scoreX, state.scoreO]);


  const handleClick = (index) => {

    dispatch({ type: Action.MAKE_MOVE, index });
    startsCountDown();
  }

  // Reset code

  const resetGame = () => {
    clearInterval(intervalRf.current);
    setCountDown(10);
    dispatch({ type: Action.RESET });

    setStartBtn(false);
    countDownIntervalRf.current = 0;
    clearInterval(startBtnIntervalRf.current);
  };

  // tryAgain

  const tryAgain = () => {
    clearInterval(intervalRf.current);
    setCountDown(10);
    dispatch({ type: Action.TRY_AGAIN });

  }
    return (
        <DataContext.Provider value={{
            currentPlayer: state.currentPlayer,
            gameBoard: state.gameBoard,
            winnerPad: state.winnerPad,
            finalWinner: state.finalWinner,
            showFinalWinner: state.showFinalWinner,
            scoreO: state.scoreO,
            scoreX: state.scoreX,
            result: state.result,
            resultWinner: state.resultWinner,
            
            handleClick,
            countDown,
            endGame,
            resetGame,
            startBtn,
            startGame,
            countUpBtnRf,
            bgRf
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider