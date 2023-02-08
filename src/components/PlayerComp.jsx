import React from "react";
import "../Styles/PlayerComp.css";

import {FaRegHandPaper, FaRegHandRock, FaRegHandScissors} from "react-icons/fa"



export const PlayerComp = ({player,score,resp,count,setId,getValueFn,btnDisable,timeLeft,darkMode}) => {
 
  const rotateIcons =()=>{
    if(player === "Player"){
      if(resp ==="scissor"){
        return "result-icon-player-scissor"
      }else{
        return "result-icon-player"
      }
    }else{
      if(resp ==="scissor"){
        return ""
      }
      return "result-icon-computer"
    }
  }

  
 const threeButton = ()=>{
  


  return <div className="box-layout--player-btn">

  <div className="player-btn--rock">
  <button
    value="rock"
    disabled={btnDisable}
    title="Option Rock"
    onClick={getValueFn}
    className={(resp === "rock") ? "activeBtn" : null}
  >
    Rock
  </button>

  </div>
 
 <div className="player-btn--paper">
 <button
    value="paper"
    disabled={btnDisable}
    title="Option Paper"
    onClick={getValueFn}
    className={resp === "paper" ? "activeBtn" : null}
  >
    Paper
  </button>

 </div>
  <div className="player-btn--scissor">
  <button
    value="scissor"
    disabled={btnDisable}
    title="Option Scissor"
    onClick={getValueFn}
    className={resp === "scissor" ? "activeBtn" : null}
  >
    Scissor
  </button>

  </div>
 
</div>
 }

const resultantIcon = ()=>{

      if(timeLeft === null){
        return null
      }
      else if(timeLeft ===0){
        return <div className={rotateIcons()}>
        {options.filter((e)=>e.name===resp).map(e=>e.icon)[0]}
          </div>
      }


      if(player ==="Player"){
       
        return <div className= "bounce-icon-player"> 
      <FaRegHandRock size={60}/> 
      </div>
      }else{
        return <div className= "bounce-icon-computer"> 
      <FaRegHandRock size={60}/> 
      </div>
      }
    
    

     
}


const options=[
  {name:'rock',icon: <FaRegHandRock size={60} />},
  {name:'scissor',icon:<FaRegHandScissors size={60}    />},
  {name:"paper",icon:<FaRegHandPaper size={60} style={{  transform:"rotate(-40deg) !important"}}/> }
]

  return (
    <React.Fragment>
      <div   className={` box-layout ${player==="Player" ? "playerAnimation" :"computerAnimation" }`}  >
        <div className={ `box-layout--points ${darkMode==="false" && "light-box-layout--points"}`}>
          <div>  {player} -  {score}  </div>
          {/* <div>Points: </div> */}
        </div>

        <div className="box-layout--choices">
         {/*  {
            player ==="Player" ? <center style={{paddingTop:"0.25rem"}}>Player's Choice <br/> {resp} </center> : <center style={{paddingTop:"0.25rem"}}>Computer's Choice <br/>{resp}</center>
          }
           */}

          {/*  {
            player ==="Player" ?  resp : resp
           }
 */}
          <div className={` choices-icons ${ darkMode ==="false" && "light-choices-icons"}`}>




            {
              resultantIcon()
            }

{/* {
  timeLeft > 0 ? (player ==="Player" ?
                <div className="bounce-icon-player"> 
                <FaRegHandRock size={60}/> 
                </div>
           : <div className="bounce-icon-computer"> 
           <FaRegHandRock size={60}/></div>) 
  :(<>
           {options.filter((e)=>e.name===resp).map(e=>e.icon)[0]}
  </>)
}
 */}



           
            
          </div>


        </div>

 
        {
          player ==="Player" && count !== parseInt(setId) && threeButton()
             
        } 
 

    

       
        

       
      </div>
    </React.Fragment>
  );
};
