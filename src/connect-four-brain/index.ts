export function createBoard(width:number = 8, height:number = 6):null|string[][] {
	const board:null|string[][] = new Array(height).fill(null).map(v => new Array(width).fill(null));
	return board;
}

export function findLandingRow(board:string[][], column:number):number {
	for(let i = board.length - 1; i > -1; i--) {
		if(board[i][column] === null) {
			return i;
		}
	}
	throw new Error('No empty spaces in this row');
}

export function findWin(board:string[][], location:number[]):number[][] {
	const [ row, column ] = location;
	const symbol:string = board[row][column];

	if(symbol === null) {
		throw new Error('Cannot pass empty location as starting point to find win');
	}

	for(let i = 0; i < 4; i++) {
		const streak = [[row, column]];
		const walking = [true, true];
		let offset = 1;

		while((walking[0] || walking[1]) && streak.length < 4) {
			const bounds = getDirections([row, column], offset)[i];
			bounds.forEach(
				([offsetRow, offsetColumn], idx) => {
					const inBounds = offsetRow >= 0 && offsetRow < board.length && offsetColumn >= 0 && offsetColumn < board[offsetRow].length;
					const addToStreak = idx === 0 ? 'unshift' : 'push';
					if(walking[idx] === true && inBounds && board[offsetRow][offsetColumn] === symbol) {
						streak[addToStreak]([offsetRow, offsetColumn]);
					} else {
						walking[idx] = false;
					}
				}
			);
			offset++;
		}
		// We found a win including the symbol at given location
		if(streak.length === 4) {
			return streak;
		}
	}
	return [];
}

function getDirections([row, column]:number[], offset:number):number[][] {
	return [
		[[row - offset, column], [row + offset, column]], 									// Vertical
		[[row, column - offset], [row, column + offset]],										// Horizontal
		[[row - offset, column - offset], [row + offset, column + offset]],	// Descending Diagonal
		[[row + offset, column - offset], [row - offset, column + offset]]	// Ascending Diagonal
	];
}

function getNextBoard(board:any[][], [row, column]:number[], nextValue:any) {
	return board.slice(0, row).concat([
		board[row].slice(0, column).concat([nextValue]).concat(board[row].slice(column + 1))
	]).concat(
		board.slice(row + 1)
	);
}

export function dropPiece(board:any[][], col:number, piece:string) {
	try {
		const landingRow = findLandingRow(board, col);
		const location = [landingRow, col];
		const nextBoard = getNextBoard(board, location, piece);
		return {
			board: nextBoard,
			streak: findWin(nextBoard, location)
		};

	} catch(err) {
		throw err;
	}
}