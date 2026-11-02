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