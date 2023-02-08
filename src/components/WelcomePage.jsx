import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/WelcomePage.css"
import { GoUnmute, GoMute } from "react-icons/go";
import {MdDarkMode} from "react-icons/md"
import {BsSun} from "react-icons/bs"
import useThrottle from "../Hooks/useThrottleFn";
import { useEffect } from "react";

const WelcomePage = ({ chosenSet, setChosenSet }) => {
  

    const initialValue = localStorage.getItem("audioMute") !== null ? localStorage.getItem("audioMute") : "false" 
    
    const initialDarkMode = localStorage.getItem("darkTheme") !== null ? localStorage.getItem("darkTheme") : "true"
  
  
  const [mute,setMute] = useState(initialValue)
  const [darkMode,setDarkMode] = useState(initialDarkMode)
  const navigate = useNavigate();



  const handleChange = (e) => {
    const set = e.target.value;
    setChosenSet(set);
  };


  const handleStartGame = () => {
    if (chosenSet === "") {
      alert("Please Choose Game Set");
      return;
    }

    navigate(`/game/set/${chosenSet}`);
  };

  const handleMute = () => {
    (mute ==="true") ? setMute("false"):setMute("true");
    
  };


  const handleToggleTheme =()=>{
   
    if(darkMode === "true"){
      setDarkMode("false");
     
    }else{
      setDarkMode("true");
      
    }
  
  }

  const changeTheme = useThrottle(handleToggleTheme,1000)

  useEffect(()=>{
    localStorage.setItem("darkTheme", darkMode);
  },[darkMode])

  useEffect(()=>{
    localStorage.setItem("audioMute", mute);
  },[mute])
  
  useEffect(()=>{
    document.title="Rock Paper Scissor Game";

  },[])


  const renderMuteIcon = () =>{

    if(mute ==="true"){
      return (<div title="Click To Unmute">
                 <GoMute className="mute" />
            </div>)

    }else{
      return(<div title="Click To Mute">         
               <GoUnmute className="unmute" />
              </div>
      )

    }
  }


  const renderThemeIcon = () =>{
    if(darkMode ==="true"){
      return(<span><BsSun title="Light-Theme"/></span>)
    }else{
      return(<span> <MdDarkMode title="Dark-Theme" /></span>)
    }
  }



  return (
    <React.Fragment>
      <div className={darkMode ==="true" ? "welcomePageLayout" : "light-welcomePageLayout"}>
        <header className="welcomePageLayout-header-animation">
          <div className={darkMode ==="true" ? "heading":"light-heading "}>Rock Paper Scissor</div>

          <div className={darkMode ==="true" ? "mButton-outer":"light-mButton-outer"}>

            <button onClick={changeTheme} className={darkMode ==="true" ? "toggleBtn" :"light-toggleBtn"}>
              
              {
                renderThemeIcon()
              }   
             
            </button>

            <button onClick={handleMute} className="mButton-inner">
              {
                renderMuteIcon()
              }
            </button>

            
          </div>
        </header>

        <div className="centerCard ">
          <div className="card">

            <span className="centerCard-animation">
          <label> Choose Game Set </label>

          <select
            value={chosenSet}
            id="gamesetSelect"
            onChange={handleChange}
          >
            <option value="3" >3</option>
            <option value="5">5</option>color
            <option value="10">10</option>
          </select>

            </span>
           

            <div className="inButton">
              <button onClick={handleStartGame} className="startGame inButton-animation">
                Start Game
              </button>
            </div>
          </div>
        </div>

        <footer className="footer-animation">
          <div>
            <span style={{ paddingRight: "0.25rem" }}>@</span>
            shakthi.gamers-paradise.com | <span>Shakthi N R </span>
        
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
