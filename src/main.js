// the starting point of our js application
//Connects everything together.

// 1st we have to connect the form to js
import {loadPlayers,savePlayers} from "./storage.js";
import {createPlayer} from "./players.js"
import { displayPlayers } from "./ui.js";
const formplayer = document.getElementById("player-form");
const nicknameInput = document.getElementById("nickname");
const avatarselection = document.getElementById("avatar");
const avatarOptions = document.querySelectorAll(".avatar-option");
avatarOptions.forEach(function(image) {
   image.addEventListener("click", function() {
     avatarselection.value = image.dataset.avatar;
      avatarOptions.forEach(function(option) {
    option.classList.remove("border-empereur");
 option.classList.add("border-transparent");
               });
               image.classList.remove("border-transparent");
                 image.classList.add("border-empereur");
            });
        });
const playersList = document.getElementById("players-list");
const activePlayerDisplay = document.getElementById("active-player");
const startGameButton = document.getElementById("start-game");
const gameMessage = document.getElementById("game-message");
const nicknameRegex = /^[A-Za-z0-9* ]{3,15}$/;

let players = loadPlayers();
let editplayerId = null;// this will remeber th ID of the player we are editing
let activePlayer = null;
formplayer.addEventListener("submit", function(event) {
    event.preventDefault(); // we do this so that i can prevent it from refreshing the page
const nickname = nicknameInput.value;
const avatar = avatarselection.value;
    if(!nicknameRegex.test(nickname)){
    console.log("Invalid nickname. Please enter a valid nickname.");
    return;
    } 
    //.some checks the player until it finds a matching ickname when it finds one it returns true
     const duplicate = players.some(function(player) {
        return player.nickname.toLowerCase() === nickname.toLowerCase()&& player.id !== editplayerId;;
     });
    if(duplicate){
        console.log("Nickname already exists. Please choose a different nickname.");
        return;
    }
   if (editplayerId !== null){
    const playerToEdit = players.find(function(player){
return player.id === editplayerId;
    });
    playerToEdit.nickname = nickname;
     playerToEdit.avatar = avatar;
 editplayerId = null;
   }
   else{
    const player = createPlayer(nickname, avatar);
     players.push(player);
   }
   savePlayers(players);
   displayPlayers(players, playersList);
   formplayer.reset();
    console.log(players);
});
playersList.addEventListener("click",function(event){
    const deleteButton = event.target.closest(".delete-btn");
    if(deleteButton){
        const playerId = deleteButton.dataset.id;
        const confirmed = confirm ("do you want to delete this player??");
        if(!confirmed){
            return;
        }
        players = players.filter(function(player){
return player.id !== playerId;
        });
        savePlayers(players);
        displayPlayers(players,playersList);
        return;
    }
    const selectButton = event.target.closest(".select-btn");
    if(selectButton){
        const playerId = selectButton.dataset.id;
         activePlayer = players.find(function(player){
            return player.id === playerId;
        });
        if (!activePlayer){
            return;
        }
          activePlayerDisplay.textContent = "Selected player: " + activePlayer.nickname;

        console.log("Active player:",activePlayer);
        return;
    }
const editButton = event.target.closest(".edit-btn");
 if(!editButton){
    return;
 }
 const playerId = editButton.dataset.id;
 const playerToEdit = players.find(function(player){
return player.id ===playerId;
 });
  if (!playerToEdit) {
        return;
}

editplayerId = playerToEdit.id;
nicknameInput.value=playerToEdit.nickname;
avatarselection.value=playerToEdit.avatar;
avatarOptions.forEach(function(image) {
    if (image.dataset.avatar === playerToEdit.avatar){
        image.classList.remove("border-transparent");
        image.classList.add("border-empereur");
    }
    else{
  image.classList.remove("border-empereur");
  image.classList.add("border-transparent");
    }
 });

    startGameButton.addEventListener("click", function() {
                if (activePlayer === null) {
  gameMessage.textContent = "Please select a player first!";
  return;
                }
                 gameMessage.textContent = "Welcome " + activePlayer.nickname + "! Let's play!";
    });
displayPlayers(players,playersList);
