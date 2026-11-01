// displaying information on the screen
//Everything related to what appears on the screen.// Display all players on the page
export function displayPlayers(players, playersList) {

    playersList.innerHTML = "";

players.forEach(function(player) {

const playerCard = document.createElement("div");

        playerCard.innerHTML = `
          <h3>${player.nickname}</h3>
            <img src="${player.avatar}" alt="avatar" width="100" height="100">
    <p>Games played: 0</p>  
    <button class = "edit-btn" data-id="${player.id}">Edit</button>
<button class= "delete-btn" data-id="${player.id}">Delete</button>
<button class= "select-btn" data-id="${player.id}">select player</button>
    `;
        playersList.appendChild(playerCard);
    });
}