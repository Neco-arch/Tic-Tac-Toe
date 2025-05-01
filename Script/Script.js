const CreatePlayerMarker = (name, marker) => {
    return { name, marker };
};


const CreateBoard = () => {
    return ["", "", "", "", "", "", "", "", ""];
};


const CreatePlayer = (callback) => {
    document.addEventListener("DOMContentLoaded", () => {
        const Dialog = document.querySelector("dialog");
        Dialog.showModal();

        const SubmitButton = document.querySelector(".Start-Game");
        SubmitButton.addEventListener("click", () => {
            const player1Name = document.querySelector(".Name_Input").value;
            const player1Choice = document.querySelector(".Player1_Select").value;
            const player2Name = document.querySelector(".Name2_Input").value;
            const player2Choice = document.querySelector(".Player2_Select").value;

            const player1 = CreatePlayerMarker(player1Name, player1Choice);
            const player2 = CreatePlayerMarker(player2Name, player2Choice);

            Dialog.close();

            callback({ player1, player2 }); 
        });
    });
};


function PlayGame() {
    let board = CreateBoard();
    let winner = null;
    let CurrentPlayer;

    CreatePlayer((Players) => {
        CurrentPlayer = Players.player1; 

        const check = () => {
            const result = CheckForWinner(board, Players);
            if (result) {
                console.log(`${CurrentPlayer.name} wins!`);
                winner = result;
                return true;
            }
            return false;
        };

        const play = () => {
            const Grid = document.querySelectorAll(".Grid");
            Grid.forEach(cell => {
                cell.addEventListener("click", () => {
                    const value = cell.dataset.value;

                    if (board[value] !== "") {
                        console.log("Cell already taken!");
                        return;
                    }

                    board[value] = CurrentPlayer.marker;
                    cell.textContent = CurrentPlayer.marker;

                    if (check()) return;

                    if (!board.includes("")) {
                        winner = "draw";
                        console.log("It's a draw!");
                        return;
                    }

                    CurrentPlayer = CurrentPlayer.marker === Players.player1.marker ? Players.player2 : Players.player1;

                });
            });
        };

        play(); 
    });
}


const CheckForWinner = (board, players) => {
    const WinningCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < WinningCondition.length; i++) {
        const [a, b, c] = WinningCondition[i];
        const cellA = board[a];
        const cellB = board[b];
        const cellC = board[c];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            const winner = players[cellA === players.player1.marker ? "player1" : "player2"];
            console.log(`${winner.name} wins!`);
            return winner.marker;
        }
    }

    return false;
};


PlayGame();
