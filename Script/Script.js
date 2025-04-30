const CreatePlayerMarker = (marker, name) => {
    return { marker, name };
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
    let Players = CreatePlayer()
    let winner = null;
    let CurrentPlayer = Players.player1

    const check = () => {
        const result = CheckForWinner(board);
        winner = result;
        if (winner === Players.player1.marker || winner === Players.player2.marker ) {
            console.log("Winner");
        }
    };


    const play = () => {
        check();
        while (!winner && board.includes("")) {
            console.log(board);
            let move = prompt(`${CurrentPlayer.name}, choose a spot (0-8):`);
            board[move] = CurrentPlayer.marker

            if (board[move] !== "") {
                console.log("Already Taken");
                continue;
            }

        if (check()) break;
        CurrentPlayer = CurrentPlayer === Players.player1 ? Players.player2 : Players.player1;
        }
        if (!winner) {
            printBoard();
            console.log("It's a draw!");
        }
    };

    return {play}
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

        
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }


        if (cellA === cellB && cellB === cellC) {
            IsThereawinner = true; 
            console.log(`${players[cellA]} is the winner!`);
            return players[cellA]; 
        }
    }

    return IsThereawinner ? cellA : false;

};


//const game = PlayGame()
//game.play()