import React, { useState } from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import GamePage from './components/GamePage'
import WelcomePage from './components/WelcomePage'
import useThrottle from './Hooks/useThrottleFn'

const App = () => {
  const [chosenSet,setChosenSet] = useState("3")

  
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<WelcomePage chosenSet={chosenSet}   setChosenSet={setChosenSet} />} />
        <Route path='/game/set/:setId' element={<GamePage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </React.Fragment>
  )
}

export default App


