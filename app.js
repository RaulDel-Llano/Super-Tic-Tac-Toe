var nextPlayer = 'X';
var XColor = 'red';
var OColor = 'blue';

$( document ).ready(function() {
    console.log( "ready!" );
    $(".Medium div").click(onClick);
    setNextPlayer(nextPlayer);
});

function setNextPlayer(player) {
	$("#panel").removeClass()
	$("#panel").addClass("next"+player)
	$("#panel").text("Next Turn: "+player)
}

function setWinner(winner) {
	$("#panel").removeClass()
	$("#panel").addClass("winner"+winner)
	$("#panel").text("Winner: "+winner)
}

function onClick(evt) {
	var parent = $(this).parent();
	var grandparent = $(parent).parent();


	if ( $(grandparent).data('winner') ) return;
	if ( $(parent).data('winner') ) return;
	if ( $(this).data('winner') ) return;

	$(this).text(nextPlayer);
	$(this).data('winner', nextPlayer)
	$(this).addClass( "square"+ nextPlayer);

	nextPlayer = nextPlayer == 'X' ? 'O' : 'X';

	var winner = winnerOf(parent);
	if (winner) {
	 	$(parent).addClass( "square"+ winner);
		$(parent).data('winner', winner);

		var gameWinner = winnerOf(grandparent);
		if ( gameWinner ) {
			$(grandparent).data('winner', gameWinner);
			setWinner(gameWinner);
			return;
		}

	}

	setNextPlayer(nextPlayer);
}


var winnerChecks = [
  [1,2,3] ,
  [1,5,9] ,
  [1,4,7] ,
  [2,5,8] ,
  [3,6,9] ,
  [3,5,7] ,
  [4,5,6] ,
  [7,8,9]
]

function winnerOf(game) {

	var boxes = []

	$(game).children("div").each(function( index ) {
		var winner = $(this).data('winner');
		boxes[index] = winner ? winner : index;
	}); 

	for ( var i = 0; i < winnerChecks.length; i++) {
		var check = winnerChecks[i];
		var first = check[0] -1;
		var second = check[1] -1;
		var third = check[2] -1;

		if( boxes[first] && boxes[first] == boxes[second] && boxes[first] == boxes[third])
			return boxes[first];
	}
	return null;
}