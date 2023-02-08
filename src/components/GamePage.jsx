import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlayerComp } from "./PlayerComp";
import globalAudio from "../Helper/globalAudio";
import { rockPaperScissorGame, resetValue } from "../Helper/helperFn";
import {VscDebugRestart} from "react-icons/vsc"
import "../Styles/GamePage.css";
import { audioAfterClick } from "../Helper/gameResAudio";
import {AiFillBackward} from "react-icons/ai"
import Confetti from "react-confetti";
import tieReaction from "../assets/Images/tieReaction.gif"
import lossReaction from "../assets/Images/lossReaction.gif"

const GamePage = () => {
  /* get params */
  const { setId } = useParams();
  const [mute,setMute]  = useState(localStorage.getItem("audioMute"));
  const [darkMode,setDarkMode] = useState(localStorage.getItem("darkTheme"))
  
  const navigate = useNavigate();

  /* Declaring useState hook */
  const [timeLeft, setTimeLeft] = useState(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const [count,setCount] = useState(0)
  const [playerResponse,setPlayerResponse] = useState("")
  const [computerResponse,setComputerResponse] = useState("")
  const [finalRes,setFinalRes] = useState({
    output:"",
    playerPoints:0,
    compPoints:0
  })



  /* For Confettie */
  const [dimension,setDimension] = useState({height:null,width:null})
  const [stop,setStop] = useState(50)
  const confetiRef = useRef(null);
  useEffect(() => {
    document.title=`Rock Paper Scissor Game - Set ${setId} `
    setDimension({height:confetiRef.current.clientHeight,width:confetiRef.current.clientWidth})
    
  }, []);



 var compRes =""

  /*   Assigning Arrays for computer response */
  const array = ["rock", "paper", "scissor"];

  /*  Go Back Function */
  const handleBackHome = () => {
    const flag = window.confirm(`Are You Sure To Leave the Game`);
    //Confirm and move back
    if (flag) {
      globalAudio.pause("countDown");
      resetValue(true)
      navigate("/");
    }
  };









  //Check for wrongly entered game set in url
  useEffect(() => {
    if (setId !== "3" && setId !== "5" && setId !== "10") {
     // alert(`Error in Game set! Allowed sets are 3/5/10`);
       alert(`Url is Modified :) Restricted to Access`)
      navigate("/");
    }
  },[setId]);

 

  //Count Down for 3 seconds
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
    //  setPlayerResponse(""); //remove playerResponse after 3 sec(it remove select btn)




    //  setBtnDisable(false); //enable btn after 3 seconds

      setCount((curr)=>curr+1) //increment the count (check for setId)

      
      audioAfterClick(finalRes,count,setId,mute,setBtnDisable,setPlayerResponse)
    
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  //Call Game Function
  const getOutput = (playerRes) => {
    //random number - to take value from array
    const rndm = Math.floor(Math.random() * 3);
    compRes = array[rndm];
    setComputerResponse(compRes)

/* if((count+1) < +setId){
  setTimeout(()=>{
    setComputerResponse("")
  },1700)  

}
*/ 



    //promise in helper function
    rockPaperScissorGame(playerRes, compRes)
      .then((res) => {
        const response = res.result; //received response as array
        setFinalRes({output:response[0],playerPoints:response[1],compPoints:response[2]})
      
        
      })
      .catch((err) => console.log("Error is", err));
  };

  //Get the change value from form
  const getValueFn = (e) => {
    e.preventDefault();

   
    //As initial value of timeLeft is null and 0, call this function only when timeLeft is in initial value
    
   if(timeLeft === null || timeLeft === 0){

    var playerRes = e.target.value //Set it in variable
    setPlayerResponse(e.target.value) //set it in state to change the btn color
    setTimeLeft(null)
    setBtnDisable(true); //Disable button after selected
    setTimeout(() => {
      setTimeLeft(2);
    }, 360);
    //Play Count Down(for 3 sec)
    if( mute === "false"){
      globalAudio.play("countDown");
    }

    

    //Call Game Fn after 3.1 sec
    setTimeout(() => {
      getOutput(playerRes);
    }, 2200);



  }

  };

  //reset the game
  const handleReset = async () => {
    try {
      //var res = await resetValue(true);
      await resetValue(true);
     // setCount(0)

     (
        ()=>{
          window.history.go(0)
        }
     )()
      
    //  window.location.reload();
      
    } catch (err) {
      console.log(err);
    }
 /*    if (res) {
      setFinalRes({output:"",playerPoints:0,compPoints:0})
    } */
  };



  const handleResult = ()=>{

    
      if(finalRes.compPoints === finalRes.playerPoints){

        return(<>

<div className="flex-emoji">
          <div> &#128162; Game Tied &#128162;, Compete Again</div>
          <div>
            <img src={tieReaction} alt="Tied-Emoji"  className="image-dimensions"/> 
          </div>
</div>         
        </>
        )

      }else if(finalRes.compPoints > finalRes.playerPoints){
        return (
          <>
          
          <div>
          Computer Win - Compete Again, &#128532; 
          </div>
          <div className="flex-emoji">
          <div>Never Give Up !!!</div>
          <div><img src={lossReaction} alt="Loss-Emoji" className="image-dimensions" /></div>
          </div>
          
          </>
        )
      }else{
        
        setTimeout(()=>{
          setStop(0)
        },4000)
        return (
          <>
            <div>  You Win &#128076;, Start Again &#128516;</div>
          

          </>
        )

     }

  }


const winnerCheckResult = count === parseInt(setId) && (finalRes.compPoints < finalRes.playerPoints )

  return (
    <React.Fragment>



    <div className= { `${darkMode ==="true" ? "game-layout" :"light-game-layout" }` } ref={confetiRef}>

      <div className="game-layout--container"    >

{
  winnerCheckResult && <Confetti numberOfPieces={stop} width={dimension.width} height={dimension.height} />
}
      

        <div className="game-layout--container--header header-animation">

          <div className={`${darkMode ==="true" ?  "header--backButton" :"light-header--backButton"}`}>

              <div>
              <AiFillBackward className={ `${darkMode ==="true" ? "backButton-icon" :"light-backButton-icon "}`  } />
              </div>

              <div>
                <button onClick={handleBackHome} className={`${darkMode ==="true" ? "backButton" :"light-backButton"}`}   >
                    <span className="backButton-mob"> Go Home</span> <span className="backButton-lap">Back To Home  </span> 
                </button>
              </div>
              
          </div>

          <div className={`${darkMode ==="true" ? "header--gameSet" :"light-header--gameSet"}`}>
            <span>Game Set - &nbsp;</span>  {count} i {setId} 
          </div>


          <div className="header--startAgain">
           
            <button onClick={handleReset} className={`${ darkMode ==="true" ? "startAgain" :"light-startAgain"}`} title="Restart Your Game" >


            <VscDebugRestart className="startAgain-icon"/> 


            <div style={{paddingLeft:"0.5rem"}}>
               <span className="startAgain-mob">Restart</span> <span className="startAgain-lap">Start Again </span>   
              </div> 


            </button>




          
           
          </div>

        </div>

        <div className="game-layout--container--card">

          <div className="card-box  card--player">
        
                <PlayerComp player="Player" 
                score={finalRes?.playerPoints} resp={playerResponse}
                count={count} setId={setId} getValueFn={getValueFn} btnDisable={btnDisable}
                timeLeft={timeLeft} darkMode={darkMode}
                />
              
          </div>

         
          <div className="card--between">


 {/*            {
             ((count+1) < +setId) && (timeLeft < 0 || timeLeft === null ? <> {finalRes?.output} </> : <>{timeLeft} </> )
            } 
            
 */}

            {
              timeLeft < 1 ? (  count !== +setId && <span className="card--between-eachResult "> {finalRes?.output} </span> ): <span className="card--between-timer">{timeLeft} </span> 
            } 

          </div>


          <div className=" card-box card--computer">
             
            <PlayerComp player="Computer" score={finalRes?.compPoints} darkMode={darkMode} resp={computerResponse}timeLeft={timeLeft} />

           
          </div>

        </div>



        

        <div className="game-layout--container--result">


{
   timeLeft < 1 ? (  count !== +setId && <span className="card--between-eachResults eachResult-mobile "> {finalRes?.output} </span>) : null
}
        

{
 count === parseInt(setId) && <><div className="result-animation"> Game Over <br/> {handleResult()} </div> </>   
}

               {/*  { 
                  count === parseInt(setId) && 
              (<>
              
              <div> Game Over </div>
                
                <div>
                  {
              finalRes.compPoints === finalRes.playerPoints ? <>Game Tied - Compete Again, &#128580; </>  :  
              finalRes.compPoints > finalRes.playerPoints ? <>Computer Win - Compete Again, &#128532; Never Give Up !!! </> :
              <>You Win, Start Again &#128516;</>
              
              } 
              </div>
              </>
              )
              } */}

        </div>



     
     
      </div>

    </div>
   

    </React.Fragment>
  );
};

export default GamePage;
