var playerCount = 0,
  computerCount = 0;

const finalResponse = (playerResponse, computerResponse) => {
  
  return new Promise((resolve, reject) => {
    if (playerResponse) {
      if (playerResponse === computerResponse) {
        resolve("Tie");
      } else {
        var calculation = {
          rock: {
            check: {
              paper: "Computer Win",
              scissor: "You Win"
            }
          },
          paper: {
            check: {
              rock: "You Win",
              scissor: "Computer Win"
            }
          },
          scissor: {
            check: {
              rock: "Computer Win",
              paper: "You Win"
            }
          }
        };
        var res = calculation[playerResponse].check[computerResponse];
        resolve(res);
      }
    } else {
      reject(`Error in getting player's response`);
    }
  });
};

const getCount = (res) => {
  return new Promise((resolve, reject) => {
    if (res) {
      const getStringToCheck = res.split(" ")[0];
      if (getStringToCheck !== "Tie") {
        var contRes = {
          Computer: () => {
            computerCount++;
          },
          You: () => {
            playerCount++;
          }
        };
        contRes[getStringToCheck]();
      }

      resolve(`Check Count`);
    } else {
      reject(`Error in getting Result of Count`);
    }
  });
};

export const rockPaperScissorGame = async (pRes, cRes) => {
  try {
    const res1 = await finalResponse(pRes, cRes);
    await getCount(res1);
    return { result: [res1, playerCount, computerCount] };
  } catch (err) {
    return { error: err };
  }
};

export const resetValue = (flag) => {
  return new Promise((resolve, reject) => {
    if (flag) {
      playerCount = 0;
      computerCount = 0;
      resolve(`Reset Success`);
    } else {
      reject(`Error in Reset Fn`);
    }
  });
};
