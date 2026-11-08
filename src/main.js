// the starting point of our js application
//Connects everything together.

// 1st we have to connect the form to js
import {loadPlayers,savePlayers} from "./storage.js";
import {createPlayer} from "./players.js"
import { displayPlayers,displaycards,displayComputercards,displayTable} from "./ui.js";
import { createHand ,duel} from "./game.js";
const formplayer = document.getElementById("player-form");
const nicknameInput = document.getElementById("nickname");

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

//     startGameButton.addEventListener("click", function() {
//   if (activePlayer === null){
//     gameMessage.textContent = "you have to select a player first";
//     return;
//   }
//   profilesScreen.style.display = "none";
//    gameSection.style.display = "block";
   
//     });    
//    const playerHandContainer = document.getElementById("player-hand");
// const playerhandcontainer = document.getElementById("player-hand")
// playerhandcontainer.addEventListener("click",function(event){
//     const cardButton =  event.target.closest("button");
//         if(!cardButton){
//             return;
//         }
//          const position = Number(cardButton.dataset.index);
//  const playerCard = playerHand[position];
//  const computerCard = computerhand[Math.floor(Math.random() * computerhand.length)];
//      console.log("You:", playerCard, "Computer:", computerCard);
// });
// displayPlayers(players,playersList);
// displaycards(playerHand);
// displayComputercards(computerhand.length);
let playerSide = "emperor";
let computerSide = "slave";
let playerHand = [];  //they start as empty lists bcz the cards are onyl dealt when the game starts
let computerHand=[];  // same thing 
let round = 1;
let playerscore = 0;
let computerscore=0;
const plaerHandContainer = document.getElementById("player-hand"); // it looks for the the div that holds my hand  so we can listen for clicks 



function newHANDS(){  // function that deals the cards
    playerHand = createHand(playerSide); // this asks game.js for a new list of 5 cards 
    computerHand= createHand(computerSide);
    displaycards(playerHand);  // draws my cards face up as buttons i can click
    displayComputercards(computerHand.length);// 
    document.getElementById("player-played").innerHTML="";
    document.getElementById("computer-played").innerHTML="";
}
function endRound(){
    setTimeout(function(){
        round = round + 1;
        console.log("now round",round);
        newHANDS();
    },1500);
}
  startGameButton.addEventListener("click", function() {
  if (activePlayer === null){ // this so it' important to select a player first 
   gameMessage.textContent = "you have to select a player first"; 
     return;
   }
  profilesScreen.style.display = "none";
    gameSection.style.display = "block";
    newHANDS();
     
   });
   plaerHandContainer.addEventListener("click", function(event){
const cardButton = event.target.closest("button");
if (!cardButton){
    return;
}
const position = Number(cardButton.dataset.index);
const playerCard = playerHand[position];
const computerpositon= Math.floor(Math.random() * computerHand.length );
const computerCard = computerHand[computerpositon];

displayTable(playerCard,computerCard,false);
setTimeout(function(){
    displayTable(playerCard,computerCard,true);
    const result = duel(playerCard,computerCard);
    if (result === "victory"){
       let points = 1;
       if (playerCard =="slave"){
        points = 5;
       }
       playerscore = playerscore + points;
       duelMessage.textContent = "you wind this round +" + points + "(you "+ playerscore + " - " + computerscore + "computer) ";
       endRound();

    }else if (result === "defeat"){
       let points = 1;
       if(computerCard =="slave"){
        points = 5;
       }
       computerscore = computerscore + points;
duelMessage.textContent = "you lose this round! computer +" + points + " (you " + playerscore + " - " + computerscore + " computer)";       endRound();
    }else {
        duelMessage.textContent ="DRAW!!";
        setTimeout(function(){
            playerHand = [...playerHand];
            playerHand.splice(position,1);

            computerHand = [...computerHand];
            computerHand.splice(computerpositon,1); 

            displaycards(playerHand);
            displayComputercards(computerHand.length);

            document.getElementById("player-played").innerHTML= "";
            document.getElementById("computer-played").innerHTML= "";
        },1000);
    }
},1000);
    });
   displayPlayers(players,playersList);
