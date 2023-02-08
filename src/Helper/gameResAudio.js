import globalAudio from "./globalAudio"

//Resultant Audio
const audioResult = (compPoints,playerPoints,mute)=>{

    if( mute === "true" ){
      return
    }

    setTimeout(()=>{
      if(compPoints === playerPoints){
        globalAudio.play("tie")
  
      }else if(compPoints > playerPoints){
         globalAudio.play("resultFail")
  
      }else if(compPoints < playerPoints){
          globalAudio.play("resultSuccess")
      }

    },100)
    

  }


  //Audio for every clicks
 export const audioAfterClick =(finalRes,count,setId,mute,setBtnDisable,setPlayerResponse)=>{
   
    const result = finalRes.output.toLowerCase();

    let myCount = count;
   

    if((myCount+1)=== +setId){
      audioResult(finalRes.compPoints,finalRes.playerPoints,mute); //Above Function
      return
    }
    setTimeout(()=>{
      setBtnDisable(false);
      
    },1550)

    if( mute === "true"){
      return
   }


   setTimeout(()=>{
    if(result.includes("computer")){
      globalAudio.play("fail");
   }else if(result.includes("tie")){
      globalAudio.play("tie");
   }else if(result.includes("you")){
     globalAudio.play("success");
   }


   },20)

    
     
    
    

  }