//creating ,editing and deleting player profiles
//Everything related to players.

function createplayer(nichname,avatar){
    const player ={
        id : "player_" + Date.now(),
        nichname:nichname,
        avatar:avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };
    return player;
}