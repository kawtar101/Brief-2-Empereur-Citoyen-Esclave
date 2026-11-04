// displaying information on the screen
//Everything related to what appears on the screen.// Display all players on the page
export function displayPlayers(players, playersList) {

    playersList.innerHTML = "";

players.forEach(function(player) {

const playerCard = document.createElement("div");
 playerCard.className = `
 bg-carte border border-white/10 rounded-x1 p-5 text-texte shadow-md flex flex-col items-center gap-3`;

        playerCard.innerHTML = `
          
            <img src="${player.avatar}" alt="avatar"    class="w-28 h-28 rounded-full object-cover border-2 border-empereur">
    <h3 class="text-xl font-bold">${player.nickname}</h3>
            <p>Games played: 0</p>  
    <div class="flex flex-wrap justify-center gap-2 mt-4">

    <button  class="edit-btn bg-white/10 text-texte px-4 py-2 rounded-md"
            data-action="edit" data-id="${player.id}">Edit</button>
<button class="delete-btn bg-red-900 text-white px-4 py-2 rounded-md"
            data-action="delete" data-id="${player.id}">Delete</button>
<button  class="select-btn bg-empereur text-fond px-4 py-2 rounded-md"
            data-action="select" data-id="${player.id}">select player</button>
    `;
        playersList.appendChild(playerCard);
    });
}
// we are going to replace the cards with buttons
export function displaycards(hand){
const cards=document.getElementById("player-hand");

cards.innerHTML = hand
// card the current word and index is the current position 
.map(function(card,index){
          return `<button data-index="${index}" class="w-12 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 flex items-center justify-center rounded-lg border border-white/20 bg-fond text-texte text-[10px] sm:text-xs md:text-sm capitalize cursor-pointer hover:border-empereur hover:-translate-y-1 focus:outline-none focus-visible:border-empereur disabled:opacity-40 disabled:cursor-not-allowed transition">
          ${card}</button>`;
})
.join("");// bcz we have pieces of text (seperate ) ,it glue them into one long string with nothing between thrm and that string is what goes in innerhtml
}
export function displayComputercards(count){
    const cards = document.getElementById("computer-hand");
    cards.innerHTML = Array(count)
    .fill("") 
    .map(function(){
        //im gonna use div bcz the computer's cards aren't clickable
        return `<div class="w-12 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 flex items-center justify-center rounded-lg border border-white/20 bg-fond text-texte text-[10px] sm:text-xs md:text-sm capitalize cursor-pointer hover:border-empereur hover:-translate-y-1 focus:outline-none focus-visible:border-empereur disabled:opacity-40 disabled:cursor-not-allowed transition"> ? </div>`;
    })
    .join("");
}