import countDown from "../assets/countDownTrimer.mp3";
import fail from "../assets/fail.mp3";
import resultFail from "../assets/resultFail.mp3";
import resultSuccess from "../assets/resultSuccess.mp3";
import success from "../assets/success.mp3";
import tie from "../assets/tie.mp3";

const audios = {
  countDown: new Audio(countDown),
  success: new Audio(success),
  fail: new Audio(fail),
  tie: new Audio(tie),
  resultSuccess: new Audio(resultSuccess),
  resultFail: new Audio(resultFail),
};

const play = (name) => {
  audios[name].play();
};

const pause = (name) => {
  audios[name].pause();
  audios[name].currentTime = 0;
};

export default {
  pause,
  play,
};
