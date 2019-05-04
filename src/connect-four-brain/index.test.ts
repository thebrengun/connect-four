import { createBoard, findWin, findLandingRow } from './index.ts';

describe('createBoard', () => {
	test('it should create a board with default width and height', () => {
		expect(createBoard()).toEqual([
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null)
		]);
	});

	test('it should accept width and height parameters', () => {
		expect(createBoard(2, 2)).toEqual([[null, null], [null, null]]);
	});

	test('it should contain unique rows, not references!', () => {
		const board = createBoard();
		expect(board[0]).not.toBe(board[1]);
	});
});

describe('findLandingRow', () => {
	test('it should take a board and a given column and return the row a token will land in', () => {
		const board:number[][] = createBoard();
		expect(findLandingRow(board, 0)).toBe(board.length - 1);
		board[board.length - 1] = new Array(8).fill('X');
		expect(findLandingRow(board, 3)).toBe(board.length - 2);
	});

	test('if the column is full it will throw an error', () => {
		const width = 8, height = 6;
		const board:number[][] = createBoard(width, height);
		const column = 2;
		for(let i = 0; i < board.length; i++) {
			board[findLandingRow(board, column)][column] = i;
		}
		const mockBoard = new Array(height).fill(null).map(
			(row, rowIdx) => new Array(width).fill(null).map(
					(col, colIdx) => colIdx === column ? height - 1 - rowIdx : col
			)
		);
		expect(board).toEqual(mockBoard);
		expect(() => findLandingRow(board, column)).toThrow();
	});
});

describe('findWin', () => {
	test('it should throw an exception if provided location has no token', () => {
		const board = createBoard();	
		const randomRow = Math.floor(Math.random() * board.length);
		const randomCol = Math.floor(Math.random() * board[randomRow].length);
		expect(() => findWin(board, [randomRow, randomCol])).toThrow();
	});

	test('it should return empty array if no win on board', () => {
		for(let i = 0; i < 3; i++) {
			const board = createBoard();
			const randomRow = Math.floor(Math.random() * board.length);
			const randomCol = Math.floor(Math.random() * board[randomRow].length);
			board[randomRow][randomCol] = 'RED';
			expect(findWin(board, [randomRow, randomCol])).toEqual([]);
		}
	});

	test('it should find a vertical win', () => {
		const location = [0, 6];
		const streak = [[0, 6], [1, 6], [2, 6], [3, 6]];
		const board = [
			[null, null, null, null, null, null, 'RED', null],
			[null, null, null, null, null, null, 'RED', null],
			[null, null, null, null, null, null, 'RED', null],
			[null, null, null, null, null, null, 'RED', null],
			[null, null, null, null, null, null, 'BLK', null],
			[null, null, null, null, null, null, 'BLK', null]
		];
		expect(findWin(board, location)).toEqual(streak);
	});

	test('it should find a horizontal win', () => {
		const location = [5, 2];
		const streak = [[5, 2], [5, 3], [5, 4], [5, 5]];
		const board = [
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, 'RED', 'RED', 'RED', 'RED', null, null]
		];
		expect(findWin(board, location)).toEqual(streak);
	});

	test('it should find an ascending diagonal win', () => {
		const location = [3, 3];
		const streak = [[5, 1], [4, 2], [3, 3], [2, 4]];
		const board = [
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, 'BLK', null, null, null],
			[null, null, null, 'BLK', 'BLK', null, null, null],
			[null, null, 'BLK', 'BLK', 'BLK', null, null, null],
			[null, 'BLK', 'RED', 'RED', 'RED', 'RED', null, null]
		];
		expect(findWin(board, location)).toEqual(streak);
	});

	test('it should find a descending diagonal win', () => {
		const location = [4, 3];
		const streak = [[2, 1], [3, 2], [4, 3], [5, 4]];
		const board = [
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, 'RED', null, null, null, null, null, null],
			[null, 'BLK', 'RED', null, null, null, null, null],
			[null, 'RED', 'BLK', 'RED', null, null, null, null],
			[null, 'RED', 'BLK', 'RED', 'RED', null, null, null]
		];
		expect(findWin(board, location)).toEqual(streak);
	});
});