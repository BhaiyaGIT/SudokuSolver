const starContainer = document.getElementById("stars-wrapper");

for (let i = 0; i < 100; i++) {
	const star = document.createElement("div");
	star.classList.add("star");

	// Random position and animation speed
	star.style.left = `${Math.random() * 100}vw`;
	star.style.top = `${Math.random() * -1}vh`;
	star.style.animationDuration = `${2 + Math.random() * 4}s`;
	star.style.opacity = Math.random();

	starContainer.appendChild(star);
}

document.addEventListener("DOMContentLoaded", () => {
	createGrid();
});

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

function solveSudoku() {
	const grid = getGrid();
	if (solve(grid)) {
		setGrid(grid);
	} else {
		alert("No solution exists!");
	}
}

function clearGrid() {
	const inputs = document.querySelectorAll("#sudoku-grid input");
	inputs.forEach((cell) => (cell.value = ""));
}

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

function setGrid(grid) {
	const rows = document.querySelectorAll("#sudoku-grid tr");
	rows.forEach((row, rowIndex) => {
		const cells = row.querySelectorAll("input");
		cells.forEach((cell, colIndex) => {
			cell.value = grid[rowIndex][colIndex] || "";
		});
	});
}

function solve(grid) {
	const emptyCell = findEmptyCell(grid);
	if (!emptyCell) return true;

	const [row, col] = emptyCell;
	for (let num = 1; num <= 9; num++) {
		if (isValid(grid, row, col, num)) {
			grid[row][col] = num;
			if (solve(grid)) return true;
			grid[row][col] = 0;
		}
	}
	return false;
}

function findEmptyCell(grid) {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (grid[row][col] === 0) return [row, col];
		}
	}
	return null;
}

function isValid(grid, row, col, num) {
	for (let i = 0; i < 9; i++) {
		if (grid[row][i] === num || grid[i][col] === num) return false;
	}

	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[startRow + i][startCol + j] === num) return false;
		}
	}

	return true;
}
