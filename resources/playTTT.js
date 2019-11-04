function idToIndex (string) {
	if (string == "A1")
		return 0;
	if (string == "A2")
		return 1;
	if (string == "A3")
		return 2;
	if (string == "B1")
		return 3;
	if (string == "B2")
		return 4;
	if (string == "B3")
		return 5;
	if (string == "C1")
		return 6;
	if (string == "C2")
		return 7;
	if (string == "C3")
		return 8;
	return -1;//string does not match any board space
}
/*
checkWin function:
1. checks if either player has won the game
2. checks if game ends in a tie
*/
function checkWin () {
	var players = [1, 0];
	var gameOver = false;
	for (var i = 0; i < 2; i++) {
		if (board_state[0] == players[i] && board_state[1] == players[i] && board_state[2] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for top row win
			gameOver = true;
		}
		if (board_state[3] == players[i] && board_state[4] == players[i] && board_state[5] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for middle row win
			gameOver = true;
		}
		if (board_state[6] == players[i] && board_state[7] == players[i] && board_state[8] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for bottom row win
			gameOver = true;
		}
		if (board_state[0] == players[i] && board_state[3] == players[i] && board_state[6] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for left column win
			gameOver = true;
		}
		if (board_state[1] == players[i] && board_state[4] == players[i] && board_state[7] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for middle column win
			gameOver = true;
		}
		if (board_state[2] == players[i] && board_state[5] == players[i] && board_state[8] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for right column win
			gameOver = true;
		}
		if (board_state[0] == players[i] && board_state[4] == players[i] && board_state[8] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for diagonal win #1
			gameOver = true;
		}
		if (board_state[2] == players[i] && board_state[4] == players[i] && board_state[6] == players[i]) {
			alert("Player " + (i+1) + " wins the game!");//check for diagonal win #2
			gameOver = true;
		}
	}
	if (gameOver == true) {
		reset_play();//reset the page when the game is over
		return;
	}
	if (!board_state.includes(-1)) {
		alert("Cat's game! Thanks for playing.");//checks for any remaining available moves
		reset_play();
	}
}

//IDs for all the table elements.
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
/*
This is to store the state to the tictactoe board.
the move of player 1 = '1' and player 2 = '0'. -1 means the space is a free space
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn.
1 means player_1
0 means player_2
*/
var turn = 1

 //The methods @Returns true if the _str is null or it has a length of 0, otherwise, the methods returns false
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}
/*
begin_play function:
1. checks for necessary conditions to begin play
2. begins play
*/
function begin_play(){
	if (started == true) {
		alert("Game has already been started. Click the'reset play' button to start a new game.")
		return;//if a game has already been started, do not start a new game
	}
	else if (isEmpty(document.getElementById("player1_id").value) || isEmpty(document.getElementById('player2_id').value)) {
		alert("Player names cannot be empty");//if the name fields are empty, then do not start the game
		return;
	}
	else {
		started = true;//game is started
		document.getElementById("player1_id").value += " (X)";
		document.getElementById("player2_id").value += " (O)";//player name fields will display their game marker
		document.getElementById("player1_id").disabled = true;
		document.getElementById("player2_id").disabled = true;//player names can no longer be modified
		document.getElementById("turn_info").innerHTML = "Turn for: <b>X</b>";//display who's turn it is
	}
}

/*
reset_play function:
1. empties the page and returns it to its initial state
*/
function reset_play(){
	started = false;
	document.getElementById("player1_id").value = "";
	document.getElementById("player2_id").value = "";//reset player name fields
	document.getElementById("player1_id").disabled = false;
	document.getElementById("player2_id").disabled = false;//enable name fields
	document.getElementById("turn_info").innerHTML = "Game has not been started";
	document.getElementById("A1").innerHTML = "A1";
	document.getElementById("A2").innerHTML = "A2";
	document.getElementById("A3").innerHTML = "A3";
	document.getElementById("B1").innerHTML = "B1";
	document.getElementById("B2").innerHTML = "B2";
	document.getElementById("B3").innerHTML = "B3";
	document.getElementById("C1").innerHTML = "C1";
	document.getElementById("C2").innerHTML = "C2";
	document.getElementById("C3").innerHTML = "C3";//reset board values
	for (var i = 0; i < 9; i++) {
		board_state[i] = -1;//reset board state to original
	}
}
/*
play function:
1. Handles turn to turn execution
2. takes player input and updates the game board accordingly
3. Checks win conditions via a helper function and displays message if condition is met
*/
function play() {
	var input = document.getElementById("move_text_id").value;
	var index = idToIndex(input);
	//index holds the array index of the board space indicated by the player input
	if (!table_ids.includes(input)) {
		alert("Invalid move. Please input a valid square. Ex. 'A3'");//check for valid move
		return;
	}
	else if (started == false){
		alert("No game has been started.");
		return;//check to make sure a game is in progress
	}
	else if (board_state[index] != -1){
		alert("That move has already been taken!");//make sure that the desired move is available
		return;
	}
	else {
		if (turn == 1) {//player 1's turn
			board_state[index] = 1;
			document.getElementById(input).innerHTML = "<b>X</b>";//update the game board
			document.getElementById("turn_info").innerHTML = "Turn for: <b>O</b>";
			turn = 0;//switch turn to player 2
		}
		else {//player 2's turn
			board_state[index] = 0;
			document.getElementById(input).innerHTML = "<b>O</b>";//update the game board
			document.getElementById("turn_info").innerHTML = "Turn for: <b>X</b>";
			turn = 1;//switch turn to player 1
		}
	}
	setTimeout(function() {//delay to allow the game board to update for winning move
		checkWin();
	}, 200);
	document.getElementById("move_text_id").value = "";//empty the move field once player has entered their move
}

function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}
}
