const CreatePlayerMarker = (name, marker) => {
    return { name, marker };
};

const CreateBoard = () => {
    return ["", "", "", "", "", "", "", "", ""];
};

const CreatePlayer = async () => {
    const Dialog = document.querySelector("dialog");
    const SubmitButton = document.querySelector(".Start-Game");

    Dialog.showModal();

    const playerDataPromise = new Promise((resolve) => {
        SubmitButton.addEventListener("click", () => {
            const player1Name = document.querySelector(".Name_Input").value;
            const player1Choice = document.querySelector(".Player1_Select").value;
            const player2Name = document.querySelector(".Name2_Input").value;
            const player2Choice = document.querySelector(".Player2_Select").value;
            let Player1 = CreatePlayerMarker(player1Name, player1Choice);
            let Player2 = CreatePlayerMarker(player2Name, player2Choice);
            Dialog.close();
            resolve({ Player1, Player2 });
        });
    });

    const playerData = await playerDataPromise;
    return playerData;
};

function PlayGame() {
    let Counter = 0
    const Status = document.querySelector(".Status");
    const Reset_Button = document.querySelector(".Reset_Button");
    let Player1;
    let Player2;
    let CurrentPlayer;
    let board = CreateBoard();
    let winner = null;

    CreatePlayer().then((First_Player) => {
        Player1 = First_Player.Player1;
        Player2 = First_Player.Player2;
        CurrentPlayer = Player1;

        const check = () => {
            const result = CheckForWinner(board, { player1: Player1, player2: Player2 });
            if (result) {
                Status.textContent = `${CurrentPlayer.name} wins!`;
                winner = result;
                return true;
            }
            return false;
        };

        const play = () => {
            const Grid = document.querySelectorAll(".Grid");
            Grid.forEach(cell => {
                cell.addEventListener("click", () => {
                    if (board[cell.dataset.value] !== "" || winner) {
                        if (winner === null) {
                            Status.textContent = "Cell already taken or game over!";
                            Counter += 1
                        }
                        if (Counter >= 2  ) {
                            Status.textContent = `${CurrentPlayer.name} Foul` 
                            CurrentPlayer = CurrentPlayer.marker === Player1.marker ? Player2 : Player1;
                            Status.textContent = `${CurrentPlayer.name}'s Turn`;
                        }
                        return;
                    }

                    board[cell.dataset.value] = CurrentPlayer.marker;
                    cell.textContent = CurrentPlayer.marker;

                    if (check()) return;

                    if (!board.includes("")) {
                        winner = "draw";
                        Status.textContent = "It's a draw!";
                        return;
                    }

                    CurrentPlayer = CurrentPlayer.marker === Player1.marker ? Player2 : Player1;
                    Status.textContent = `${CurrentPlayer.name}'s Turn`;
                });
            });
        };

        const Reset = () => {
            Reset_Button.addEventListener("click", () => {
                board = CreateBoard(); 
                const Grid = document.querySelectorAll(".Grid");
                Grid.forEach(cell => {
                    cell.textContent = ""; 
                });
                winner = null;
                CurrentPlayer = Player1; 
                Status.textContent = `${CurrentPlayer.name}'s Turn`;
            });
        };

        play();
        Reset();
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
            const winner = cellA === players.player1.marker ? players.player1 : players.player2;
            console.log(`${winner.name} wins!`);
            return winner.marker;
        }
    }

    return false;
};

PlayGame();
