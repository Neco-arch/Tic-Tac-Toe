const PlayerName_Marker = (marker,player) => {
    return {marker,player}
} 

const CreateBoard = () => {
    let Board = ["","","",
                "","","",
                "","","",
    ];
    return Board
}

const CreatePlayer = () => {
    let Player1Name = prompt("Player 1 Name");
    let Player1Marker = prompt("Player 1 Marker");
    let Player2Name = prompt("Player 2 Name");
    let Player2Marker = prompt("Player 2 Marker");
    const PlayerName_Marker1 = PlayerName_Marker(Player1Marker,Player1Name)
    const PlayerName_Marker2 = PlayerName_Marker(Player2Marker,Player2Name)
    return {PlayerName_Marker1,PlayerName_Marker2}
}


const PlayGame  = () => {
    let IsGameEnded = false
    let board = CreateBoard();
    let Player1_2 = CreatePlayer();
    let Player1Decision = prompt("Where do you want to put marker")
    board[Player1Decision] = Player1_2.PlayerName_Marker1.marker
    console.log(board);
}

PlayGame()

