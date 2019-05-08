import { getEmptyBoard, getNextBoard, addToColumn, findWin } from './index.ts';

describe('Connect Four Brain', () => {
	const width = Math.floor(Math.random() * 8) + 6;
	const height = Math.floor(Math.random() * 8) + 4;
	const streak = 4;
	const RED_TOKEN = {id: 'RED_TOKEN'};
	const BLK_TOKEN = {id: 'BLK_TOKEN'};
	let board = getEmptyBoard(width, height);
	test('length of columns should equal width', () => {
		expect(board.length).toBe(width);
	});

	test('each column should contain an array equal to height with null values', () => {
		board.map(column => {
			expect(Array.isArray(column)).toBe(true);
			expect(column.length).toBe(height);
			expect(column.every(v => v === null)).toBe(true);
		});
	});

	test('each column should be unique', () => {
		expect(board[0]).not.toBe(board[1]);
	});

	test('an item can be added to a column', () => {
		board = getNextBoard(addToColumn(0, board), board, RED_TOKEN);
		expect(board[0][0]).toBe(RED_TOKEN);
	});

	test('an error will be thrown if the column is full', () => {
		while(board[0].indexOf(null) > -1) {
			board = getNextBoard(addToColumn(0, board), board, RED_TOKEN);
		}
		expect(() => addToColumn(0, board, RED_TOKEN)).toThrow();
	});

	test('a vertical streak will win', () => {
		expect(findWin([0, 0], board)).toEqual([[0, 3], [0, 2], [0, 1], [0, 0]]);
	});

	test('a horizontal streak will win', () => {
		board = getEmptyBoard(width, height);
		board[1][0] = BLK_TOKEN;
		board[2][0] = BLK_TOKEN;
		board[3][0] = BLK_TOKEN;
		board[4][0] = BLK_TOKEN;
		expect(findWin([4, 0], board)).toEqual([[1, 0], [2, 0], [3, 0], [4, 0]]);
	});

	test('a diagonal streak will win', () => {
		board = getEmptyBoard(width, height);
		board[0][0] = RED_TOKEN;
		board[1][1] = RED_TOKEN;
		board[2][2] = RED_TOKEN;
		board[3][3] = RED_TOKEN;
		board[1][3] = RED_TOKEN;
		board[2][2] = RED_TOKEN;
		board[3][1] = RED_TOKEN;
		board[4][0] = RED_TOKEN;
		expect(findWin([3, 3], board)).toEqual([[0, 0], [1, 1], [2, 2], [3, 3]]);
		expect(findWin([1, 3], board)).toEqual([[1, 3], [2, 2], [3, 1], [4, 0]]);
	});

	test('and if there is no win an epmty array will be returned', () => {
		board = addToColumn(0, getEmptyBoard(width, height), RED_TOKEN);
		expect(findWin([0, 0], board)).toEqual([]);
	});
});
