//creating ,editing and deleting player profiles
//Everything related to players.

export function createPlayer(nickname,avatar){
    const player ={
        id : "p_" + Date.now(),
        nickname:nickname,
        avatar:avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };
    return player;
}