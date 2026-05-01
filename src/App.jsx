import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import StartGameBtn from "./components/StartGameBtn";
import DataProvider from './components/context/DataContext';
import { useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

const navigate = useNavigate();

  useEffect(() => {
    navigate('/startBtn');
  },[]);

  return (
    <DataProvider>
      <>
      <Routes>
        < Route path="/playGame" element={
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
        
          <main className='text-white w-[40%] h-[70%] bg-blue-300
          flex flex-col items-center justify-center p-3 rounded-xl max-[1000px]:w-full
          max-[1000px]:h-full
          '
          >
            <Header />
              <Main />
            <Footer />
          </main>
        </div>
        }/>
        <Route path="/startBtn" element={<StartGameBtn />}/>
        </Routes>
      </>
    </DataProvider>
  )
}

export default App
