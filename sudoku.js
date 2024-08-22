document.addEventListener("DOMContentLoaded", () => {
	createGrid();
});

// Function to create the Sudoku grid
function createGrid() {
	const grid = document.getElementById("sudoku-grid");
	for (let row = 0; row < 9; row++) {
		const tr = document.createElement("tr");
		for (let col = 0; col < 9; col++) {
			const td = document.createElement("td");
			const input = document.createElement("input");
			input.type = "number";
			input.min = 1;
			input.max = 9;
			td.appendChild(input);
			tr.appendChild(td);
		}
		grid.appendChild(tr);
	}
}

// Function to solve the Sudoku puzzle
function solveSudoku() {
	const grid = getGrid();
	if (solve(grid)) {
		setGrid(grid);
	} else {
		alert("No solution exists!");
	}
}

// Function to get the current state of the grid
function getGrid() {
	const grid = [];
	const rows = document.querySelectorAll("#sudoku-grid tr");
	rows.forEach((row) => {
		const rowData = [];
		const cells = row.querySelectorAll("input");
		cells.forEach((cell) => {
			rowData.push(cell.value ? parseInt(cell.value) : 0);
		});
		grid.push(rowData);
	});
	return grid;
}

// Function to set the grid with the solved puzzle
function setGrid(grid) {
	const rows = document.querySelectorAll("#sudoku-grid tr");
	rows.forEach((row, rowIndex) => {
		const cells = row.querySelectorAll("input");
		cells.forEach((cell, colIndex) => {
			cell.value = grid[rowIndex][colIndex] || "";
		});
	});
}

// Recursive function to solve the Sudoku puzzle using backtracking
function solve(grid) {
	const emptyCell = findEmptyCell(grid);
	if (!emptyCell) {
		return true; // Puzzle solved
	}
	const [row, col] = emptyCell;
	for (let num = 1; num <= 9; num++) {
		if (isValid(grid, row, col, num)) {
			grid[row][col] = num;
			if (solve(grid)) {
				return true;
			}
			grid[row][col] = 0; // Backtrack
		}
	}
	return false; // Trigger backtracking
}

// Function to find an empty cell in the grid
function findEmptyCell(grid) {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (grid[row][col] === 0) {
				return [row, col];
			}
		}
	}
	return null; // No empty cells found
}

// Function to check if placing a number in a cell is valid
function isValid(grid, row, col, num) {
	// Check the row
	for (let i = 0; i < 9; i++) {
		if (grid[row][i] === num) {
			return false;
		}
	}

	// Check the column
	for (let i = 0; i < 9; i++) {
		if (grid[i][col] === num) {
			return false;
		}
	}

	// Check the 3x3 subgrid
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[startRow + i][startCol + j] === num) {
				return false;
			}
		}
	}

	return true;
}
