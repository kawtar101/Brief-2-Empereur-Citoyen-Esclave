// the starting point of our js application
//Connects everything together.

// 1st we have to connect the form to js
import {loadPlayers,savePlayers} from "./storage.js";
import {createPlayer} from "./players.js"
import { displayPlayers,displaycards,displayComputercards } from "./ui.js";
import { createHand } from "./game.js";
const formplayer = document.getElementById("player-form");
const nicknameInput = document.getElementById("nickname");
const computerhand = createHand("slave");
const playerHand = createHand("emperor");
const playersList = document.getElementById("players-list");
const activePlayerDisplay = document.getElementById("active-player");
const startGameButton = document.getElementById("start-game");
const gameMessage = document.getElementById("game-message");
const errorMessage = document.getElementById("error-message");
const nicknameRegex = /^[A-Za-z0-9 ]{3,15}$/;
const gameSection = document.getElementById("game-section");
 const duelMessage = document.getElementById("duel-message");
const profilesScreen = document.getElementById("profiles-screen");
let players = loadPlayers();
let editplayerId = null;// this will remeber th ID of the player we are editing
let activePlayer = null;
formplayer.addEventListener("submit", function(event) {
    event.preventDefault(); // we do this so that i can prevent it from refreshing the page
const nickname = nicknameInput.value.trim();
const selectedAvatar = formplayer.querySelector(
'input[name="avatar"]:checked'
);
if(!selectedAvatar){
    errorMessage.textContent = "plz select an avatar";
    return;
}
const avatar = selectedAvatar.value;
    if(!nicknameRegex.test(nickname)){
       errorMessage.textContent = "Please enter a valid nickname (3–15 characters).";

    return;
    } 
    //.some checks the player until it finds a matching ickname when it finds one it returns true
     const duplicate = players.some(function(player) {
        return player.nickname.toLowerCase() === nickname.toLowerCase()&& player.id !== editplayerId;;
     });
    if(duplicate){
    errorMessage.textContent = "Nickname already exists!";
        return;
    }
   if (editplayerId !== null){
    const playerToEdit = players.find(function(player){
return player.id === editplayerId;
    });
    playerToEdit.nickname = nickname;
     playerToEdit.avatar = selectedAvatar.value;
 editplayerId = null;
   }
   else{
    const player = createPlayer(nickname, avatar);
     players.push(player);
   }
   savePlayers(players);
   displayPlayers(players, playersList);
   formplayer.reset();
   errorMessage.textContent = "";
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
const avatarRadio = formplayer.querySelector(
    'input[name="avatar"][value="' + playerToEdit.avatar + '"]'
);
if(avatarRadio){
    avatarRadio.checked = true;
}
 });

    startGameButton.addEventListener("click", function() {
  if (activePlayer === null){
    gameMessage.textContent = "you have to select a player first";
    return;
  }
  profilesScreen.style.display = "none";
   gameSection.style.display = "block";
     
    });   
  
   const playerHandContainer = document.getElementById("player-hand");
const playerhandcontainer = document.getElementById("player-hand")
playerhandcontainer.addEventListener("click",function(event){
    const cardButton =  event.target.closest("button");
        if(!cardButton){
            return;
        }
         const position = Number(cardButton.dataset.index);
 const playerCard = playerHand[position];
 const computerCard = computerhand[Math.floor(Math.random() * computerhand.length)];
     console.log("You:", playerCard, "Computer:", computerCard);
});


displayPlayers(players,playersList);
displaycards(playerHand);
displayComputercards(computerhand.length);
