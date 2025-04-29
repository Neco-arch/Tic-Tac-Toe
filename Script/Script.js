const CreatePlayerMarker = (marker, player) => {
    return { marker, player };
};

const CreateBoard = () => {
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];
    return board;
};

const CreatePlayer = () => {
    let player1Name = prompt("Player 1 Name");
    let player1Marker = prompt("Player 1 Marker");
    let player2Name = prompt("Player 2 Name");
    let player2Marker = prompt("Player 2 Marker");
    
    const player1 = CreatePlayerMarker(player1Marker, player1Name);
    const player2 = CreatePlayerMarker(player2Marker, player2Name);
    
    return { player1, player2 };
};

const PlayGame = () => { 
    let board = CreateBoard();
    //let players = CreatePlayer();
    let winner = CheckForWinner(board);
    if (winner == 'X' || winner == "O") {
        print("Game Ended")
    }

};
const CheckForWinner = (board, players) => {
    let IsThereawinner = false;
    const WinningCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal Wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical Wins
        [0, 4, 8], [2, 4, 6] // Diagonal Wins
    ];

    // Check Winning Condition
    for (let i = 0; i < WinningCondition.length; i++) {
        const [a, b, c] = WinningCondition[i];
        const cellA = board[a];
        const cellB = board[b];
        const cellC = board[c];

        console.log(cellA)
        
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }


        if (cellA === cellB && cellB === cellC) {
            IsThereawinner = true; 
            console.log(`${players[cellA]} is the winner!`);
            return players[cellA]; 
        }
    }

    return IsThereawinner ? true : false;
};


PlayGame();
