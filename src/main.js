// the starting point of our js application
//Connects everything together.

// 1st we have to connect the form to js
const formplayer = document.getElementById("player-form");
const nicknameInput = document.getElementById("nickname");
const avatarselection = document.getElementById("avatar");
formplayer.addEventListener("submit", function(event) {
    event.preventDefault(); // we do this so that i can prevent it from refreshing the page
const nickname = nicknameInput.value;
const avatar = avatarselection.value;

    console.log("nickname:");
    console.log(avatar);
});