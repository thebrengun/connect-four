interface Board extends Array<any[]> {}
interface LocationTuple extends Array<number> {0: number, 1: number}
interface Token {id: string}

export function getEmptyBoard(width: number = 7, height:number = 6):Board {
	return new Array(width).fill(null).map(v => new Array(height).fill(null));
}

export function getNextBoard([column, row]:LocationTuple, board:Board, token:Token):Board {
	return board.slice(0, column).concat([
			board[column].slice(0, row).concat([ token ]).concat(board[column].slice(row + 1))
		]).concat(board.slice(column + 1));
}

export function addToColumn(column:number, board:Board):LocationTuple {
	const row = board[column].indexOf(null);
	if(row === -1) {
		throw new Error('No empty spaces in this column');
	}
	return [column, row];
}

export function findWin(location:LocationTuple, board:Board, streakLen:number = 4) {
	const [ column, row ] = location;
	const token:Token|null = board[column][row];
	if(token === null) {
		return [];
	}
	const directions:LocationTuple[][] = [
		[[0, 1], [0, -1]], [[-1, 0], [1, 0]],  // Vertical, Horizontal
		[[-1, 1], [1, -1]], [[-1, -1], [1, 1]] // Diagonal
	];

	enum AddMethod {push = 'push', unshift = 'unshift'};

	for(let j = 0; j < directions.length; j++) {
		const vectors:LocationTuple[] = directions[j];
		let i = 1, streak = [location], addMethod = AddMethod.push;
		while(streak.length < streakLen && vectors.length > 0) {
			const currentVector = vectors.pop();
			if(!currentVector) {
				throw new Error('Vector cannot be undefined');
			}
			const [ offsetColumn, offsetRow ] = [
				location[0] + (currentVector[0] * i),
				location[1] + (currentVector[1] * i)
			];
			const inBounds = (
				(offsetColumn >= 0 && offsetColumn < board.length) && 
				(offsetRow >= 0 && offsetRow < board[offsetColumn].length)
			);

			if(inBounds && board[offsetColumn][offsetRow] !== null && board[offsetColumn][offsetRow].id === token.id) {
				streak[addMethod]([offsetColumn, offsetRow]);
				vectors.push(currentVector);
				i++;
			} else {
				i = 1;
				addMethod = AddMethod.unshift;
			}
		}

		if(streak.length === 4) {
			return streak;
		}
	}
	return [];
}
