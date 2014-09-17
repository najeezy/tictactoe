function Game(difficulty) {
	this.difficulty = difficulty;
}

Game.prototype.plays = [0,0,0,0,0,0,0,0,0];
Game.prototype.lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
Game.prototype.new_spot = '';
Game.prototype.num_turns = 0;
Game.prototype.winning_move = false;
Game.prototype.player_wins = false;
Game.prototype.comp_wins = false;
Game.prototype.move_made = false;
Game.prototype.winning_line = [];

Game.prototype.playTurn = function() {
	//for now, computer goes first
	var counter = 0;
	this.winning_move = true;
	while (counter < 9) {
		if (this.plays[counter] == 0) {
			this.winning_move = false;
		}
		counter++;
	}

	if (this.difficulty == 'easy') {
		this.checkPlayerWin();
		

		//pick a random square
		if(this.winning_move == false) {
			this.randomMove();
			this.checkCompWin();
		}
		
	}
	else if (this.difficulty == 'hard' || this.difficulty == 'extreme') {
		//check if the player has won
		this.checkPlayerWin();
		
		if (this.winning_move == false) {
			//has computer take a corner as second move if player
			//takes middle box as first move.
			if (this.num_turns == 1 && this.plays[4] == 2 && this.difficulty == 'extreme') {
				var corners = [0,2,6,8];
				this.takeSpot(corners[Math.floor(Math.random() * 3.99)]);
				this.move_made = true;
			}

			//check if computer has winning move and make move.
			this.checkWinningMove();

			if (this.move_made == false) {
				//check if player has a winning move and block.
				this.playerNearWin();
			}

			if (this.checkSpot(4) && this.move_made == false) {
				//check if middle spot is taken and take if not.
				this.takeSpot(4);
				this.move_made = true;
			}

			if (this.move_made == false) {
				this.checkNearWin();
			}

			if (this.move_made == false) {
				this.randomMove();
			}
		}

		this.num_turns++;
		this.move_made = false;
		
		
	}
};

Game.prototype.randomMove = function() {
	var moved = false;

		while (moved == false){

			var index = Math.floor(Math.random() * 8.99);
			if(this.checkSpot(index)) {
				this.takeSpot(index);
				moved = true;
			}
		}
};

Game.prototype.checkSpot = function(idx) {
	if (this.plays[idx] != 0) {
		return false;
	}
	else {
		return true;
	}
};

Game.prototype.takeSpot = function(idx) {
	this.plays[idx] = 1;

	if (idx == 0) {
		this.new_spot = '.one';
	}
	else if (idx == 1) {
		this.new_spot = '.two';
	}
	else if (idx == 2) {
		this.new_spot = '.three';
	}
	else if (idx == 3) {
		this.new_spot = '.four';
	}
	else if (idx == 4) {
		this.new_spot = '.five';
	}
	else if (idx == 5) {
		this.new_spot = '.six';
	}
	else if (idx == 6) {
		this.new_spot = '.seven';
	}
	else if (idx == 7) {
		this.new_spot = '.eight';
	}
	else if (idx == 8) {
		this.new_spot = '.nine';
	}

};

Game.prototype.playerTurn = function(spot) {
	if (spot == 'one hov') {
		this.plays[0] = 2;
	}
	else if (spot == 'two hov') {
		this.plays[1] = 2;
	}
	else if (spot == 'three hov') {
		this.plays[2] = 2;
	}
	else if (spot == 'four hov') {
		this.plays[3] = 2;
	}
	else if (spot == 'five hov') {
		this.plays[4] = 2;
	}
	else if (spot == 'six hov') {
		this.plays[5] = 2;
	}
	else if (spot == 'seven hov') {
		this.plays[6] = 2;
	}
	else if (spot == 'eight hov') {
		this.plays[7] = 2;
	}
	else if (spot == 'nine hov') {
		this.plays[8] = 2;
	}

	this.num_turns++;

};

Game.prototype.checkWinningMove = function() {
	var counter1 = 0;
	while (counter1 < 8) {
		var zeroes = 0;
		var ones = 0;
		var zero_index = 0;

		var counter2 = 0;
		while (counter2 < 3) {
			if (this.plays[this.lines[counter1][counter2]] == 2) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 0) {
				zeroes++;

				zero_index = this.lines[counter1][counter2];
			}
			else if (this.plays[this.lines[counter1][counter2]] == 1) {
				ones++;
			}

			counter2++;

		}

		if (zeroes == 1 && ones == 2) {
			this.winningLineClasses(this.lines[counter1]);
			this.takeSpot(zero_index);
			this.winning_move = true;
			this.comp_wins = true;
			this.move_made = true;
			break;
		}

		counter1++;
	}
};

Game.prototype.checkNearWin = function() {
	var counter1 = 0;
	while (counter1 < 8) {
		
		var zeroes = 0;
		var ones = 0;
		var zero_index = [];

		var counter2 = 0;
		while (counter2 < 3) {
			if (this.plays[this.lines[counter1][counter2]] == 2) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 0) {
				zeroes++;
				zero_index.push(this.lines[counter1][counter2]);
			}
			else if (this.plays[this.lines[counter1][counter2]] == 1) {
				ones++;
			}

			counter2++;

		}

		if (zeroes == 2 && ones == 1) {
			this.takeSpot(zero_index[Math.floor(Math.random() * 1.99)]);
			this.move_made = true;
			break;
		}

		counter1++;
	}
};

Game.prototype.playerNearWin = function() {
	var counter1 = 0;
	while (counter1 < 8) {
		
		var zeroes = 0;
		var twos = 0;

		var counter2 = 0;
		while (counter2 < 3) {
			if (this.plays[this.lines[counter1][counter2]] == 1) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 0) {
				zeroes++;
				var zero_index = this.lines[counter1][counter2];
			}
			else if (this.plays[this.lines[counter1][counter2]] == 2) {
				twos++;
			}

			counter2++;

		}

		if (zeroes == 1 && twos == 2) {
			this.takeSpot(zero_index);
			this.move_made = true;
			break;
		}

		counter1++;
	}
};

Game.prototype.checkPlayerWin = function() {
	var counter1 = 0;
	while (counter1 < 8) {
		
		var zeroes = 0;
		var twos = 0;

		var counter2 = 0;
		while (counter2 < 3) {
			if (this.plays[this.lines[counter1][counter2]] == 1) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 0) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 2) {
				twos++;
			}

			counter2++;

		}

		if (twos == 3) {
			this.winningLineClasses(this.lines[counter1]);
			this.winning_move = true;
			this.player_wins = true;
			this.move_made = true;
			break;
		}

		counter1++;
	}

};

Game.prototype.checkCompWin = function() {
	var counter1 = 0;
	while (counter1 < 8) {
		
		var zeroes = 0;
		var ones = 0;

		var counter2 = 0;
		while (counter2 < 3) {
			if (this.plays[this.lines[counter1][counter2]] == 1) {
				ones++;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 0) {
				break;
			}
			else if (this.plays[this.lines[counter1][counter2]] == 2) {
				break;
			}

			counter2++;

		}

		if (ones == 3) {
			this.winning_move = true;
			this.comp_wins = true;
			this.move_made = true;
			break;
		}

		counter1++;
	}

};

Game.prototype.winningLineClasses = function(arr) {
	var counter = 0;

	while (counter < 3) {
		if (arr[counter] == 0) {
			this.winning_line.push('.one');
		}
		else if (arr[counter] == 1) {
			this.winning_line.push('.two');
		}
		else if (arr[counter] == 2) {
			this.winning_line.push('.three');
		}
		else if (arr[counter] == 3) {
			this.winning_line.push('.four');
		}
		else if (arr[counter] == 4) {
			this.winning_line.push('.five');
		}
		else if (arr[counter] == 5) {
			this.winning_line.push('.six');
		}
		else if (arr[counter] == 6) {
			this.winning_line.push('.seven');
		}
		else if (arr[counter] == 7) {
			this.winning_line.push('.eight');
		}
		else if (arr[counter] == 8) {
			this.winning_line.push('.nine');
		}

		counter++;
	}
};




//---------------------------------------------
//---------------------------------------------
//---------------------------------------------
//---------------------------------------------
//The Game Playing


var level = '';
var go_first = '';



$('.restart').click(function() {
	location.reload(true);
});

$('button').click(function() {
	if ($(this).attr('class') == 'level1') {
		level = 'easy';
	}
	else if ($(this).attr('class') == 'level2') {
		level = 'hard';
	}
	else if ($(this).attr('class') == 'level3') {
		level = 'extreme';
	}

	$('.diff-screen').css('display', 'none');

	$('.who-goes').css('display', 'block');

	$('.who-goes button').click(function() {

		if ($(this).attr('class') == 'computer') {
			go_first = 'computer'
		}

		$('.who-goes').css('display', 'none');

		var new_game = new Game(level);

		if (go_first == 'computer') {
			new_game.playTurn();
			$(new_game.new_spot).html('o');
		}

		
		$('span').click(function() {
			
			if ($(this).html() == '' && new_game.winning_move == false) {
				$(this).html('x');
	
				new_game.playerTurn($(this).attr('class'));

				new_game.playTurn();
				$(new_game.new_spot).html('o');

				if (new_game.player_wins == true) {
					$('h2').css('background', '#8DB0FF');
					$('h2').html('You Win!');
				}
				else if (new_game.comp_wins == true) {
					$('h2').css('background', '#FF8A7A');
					$('h2').html('You Lose.');
				}
				else if (new_game.num_turns > 8) {
					$('h2').css('background', '#FFC25B');
					$('h2').html('It\'s a draw.');
				}

				if (new_game.winning_move == true || new_game.num_turns > 8) {

					for (var i = 0; i < 3; i++) {
						$(new_game.winning_line[i]).toggleClass('blinky');
					};

					$('span').toggleClass('hov');
				}


			}
		});

	});
});

















