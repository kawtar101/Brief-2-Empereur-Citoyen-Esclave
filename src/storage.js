//reading and writing data to local storage
//Everything related to saving and retrieving data.
export function savePlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}
export function loadPlayers(){
    const savedPlayers = localStorage.getItem("players");
    // if sm1 visits the web for the first time nothing has been saved yet 
    if (savedPlayers === null){
     return[];
    }
    return JSON.parse(savedPlayers);
}