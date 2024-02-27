
const puzzleContainer = document.getElementById('puzzle');
const distanceDisplay = document.getElementById('distance');
const currentDistance = document.getElementById('current-distance');
const size = 4;
// posición inicial del espacio vacío en el rompecabezas
let emptyPosition = { row: size - 1, col: size - 1 };

// Matrices ejemplo de distribucion
const puzzles = [
    [
        // Distancia total entre piezas: 0
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ],
    [
        // Distancia total entre piezas: 29
        [12, 1, 2, 15],
        [11, 6, 5, 8],
        [7, 10, 9, 4],
        [0, 13, 14, 3]
    ],
    [
        // Distancia total entre piezas: 37
        [1, 8, 9, 0],
        [2, 7, 10, 15],
        [3, 6, 11, 14],
        [4, 5, 12, 13]
    ],
    [
        // Distancia total entre piezas: 39
        [15, 4, 5, 6],
        [14, 3, 0, 7],
        [13, 2, 1, 8],
        [12, 11, 10, 9]
    ]
];

// Genera numero aleatorio entre 0 y el tamaño de la matriz puzzles
let currentPuzzleIndex = Math.floor(Math.random() * puzzles.length);

function createPuzzle() {
    console.log("function createPuzle()");
    const puzzle = puzzles[currentPuzzleIndex];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            console.log("for col | for row");
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (puzzle[row][col] === 0) {
                console.log("if cell empty = vacio");
                cell.textContent = '';
                cell.style.backgroundColor = 'white';
                emptyPosition = { row, col };
            } else {
                console.log("if cell not empty = numero del 1 al 15");
                cell.textContent = puzzle[row][col];
                cell.addEventListener('click', () => moveTile(row, col));
                console.log("call function moveTile()");
            }
            const correctNumber = row * size + col + 1;
            if (cell.textContent === correctNumber.toString()) {
                cell.classList.add('correct');
                console.log("if call correct color change");
            }
            puzzleContainer.appendChild(cell);
        }
    }

    // Calcular y mostrar distancias
    calculateAndShowDistances();

    // Agregar detectores de eventos para la entrada del teclado
    document.addEventListener('keydown', handleKeyDown);
}

function moveTile(row, col) {
    console.log("function moveTile()");
    const puzzle = puzzles[currentPuzzleIndex];
    // Calcula la distancia entre la posición actual de la celda seleccionada y la posición de la vacía
    const distance = Math.abs(row - emptyPosition.row) + Math.abs(col - emptyPosition.col);
    if (distance === 1) {
        console.log("loop if function moveTile()");
        const clickedTile = puzzleContainer.children[row * size + col];
        const emptyTile = puzzleContainer.children[emptyPosition.row * size + emptyPosition.col];
        emptyTile.textContent = clickedTile.textContent;
        clickedTile.textContent = '';
        emptyPosition = { row, col };

        // Actualizar clases
        updateCellClasses();

        // Calcular y mostrar distancias
        calculateAndShowDistances();

        // Calcular la distancia entre las piezas
        const pieces = puzzleContainer.getElementsByClassName('cell');
        let totalDistance = 0;
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].textContent !== '') {
                console.log("loop for-if function moveTile() for current position");
                const currentRow = Math.floor(i / size);
                const currentCol = i % size;
                const correctNumber = parseInt(pieces[i].textContent) - 1;
                const correctRow = Math.floor(correctNumber / size);
                const correctCol = correctNumber % size;
                // Calcula la distancia total entre la posición actual de una pieza y su posición correcta
                totalDistance += Math.abs(currentRow - correctRow) + Math.abs(currentCol - correctCol);
            }
        }
        // distancia entre piezas (no logro comprender bien el concepto)
        distanceDisplay.textContent = 'Distancia total entre piezas: ' + totalDistance;
    }
}

function updateCellClasses() {
    console.log("function updateCellClasses()");
    const pieces = puzzleContainer.getElementsByClassName('cell');
    for (let i = 0; i < pieces.length; i++) {
        console.log("for loop updateCellClasses()");
        const currentRow = Math.floor(i / size);
        const currentCol = i % size;
        const correctNumber = currentRow * size + currentCol + 1;
        if (pieces[i].textContent === correctNumber.toString()) {
            pieces[i].classList.add('correct');
            console.log("if cell is correct = change color a verde");
        } else {
            pieces[i].classList.remove('correct');
            console.log("if cell is in-correct = color is equals blanco");
        }
    }
}

function handleKeyDown(event) {
    console.log("function handleKeyDown()");
    let rowChange = 0;
    let colChange = 0;
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            rowChange = -1;
            console.log("arrowUp | W | w");
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            rowChange = 1;
            console.log("arrowDown | S | s");
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            colChange = -1;
            console.log("arrowLeft | A | a");
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            colChange = 1;
            console.log("arrowRight | D | d");
            break;
        default:
            return; // Salir de esta función para otras teclas
            console.log("another tecla to keyboard");

    }
    const newRow = emptyPosition.row + rowChange;
    const newCol = emptyPosition.col + colChange;
    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        console.log("call function moveTile()");
        moveTile(newRow, newCol);
    }
}

function calculateAndShowDistances() {
    console.log("function calculateAndShowDistances()");
    const puzzle = puzzles[currentPuzzleIndex];
    // Creamos array para guardar las posiciones
    let distances = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            console.log("for col | for row in function calculateAndShowDistances()");
            const piece = puzzle[row][col];
            const correctRow = Math.floor((piece - 1) / size);
            const correctCol = (piece - 1) % size;
            const distance = Math.abs(row - correctRow) + Math.abs(col - correctCol);
            distances.push(`${piece} = ${distance}`);
        }
    }
    currentDistance.textContent = 'pz = dis: [' + distances.join(' ][ ') + ' ] ';
}

createPuzzle();


/* ---------------------------------------------------------------------------------------- */

/*

<script>

    const puzzleContainer = document.getElementById('puzzle');
    const size = 4;
    let emptyPosition = { row: size - 1, col: size - 1 };

    function createPuzzle() {
        
        let number = 1;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (row === emptyPosition.row && col === emptyPosition.col) {
                    
                    cell.textContent = '';
                    cell.style.backgroundColor = 'white';
                } else {
                    
                    cell.textContent = number;
                    cell.addEventListener('click', () => moveTile(row, col));
                    
                    number++;
                }
                puzzleContainer.appendChild(cell);
            }
        }
        // Agregar detectores de eventos para la entrada del teclado
        document.addEventListener('keydown', handleKeyDown);
    }

    function moveTile(row, col) {
        
        const distance = Math.abs(row - emptyPosition.row) + Math.abs(col - emptyPosition.col);
        if (distance === 1) {
            
            const clickedTile = puzzleContainer.children[row * size + col];
            const emptyTile = puzzleContainer.children[emptyPosition.row * size + emptyPosition.col];
            emptyTile.textContent = clickedTile.textContent;
            clickedTile.textContent = '';
            emptyPosition = { row, col };
        }
    }

    function handleKeyDown(event) {
        
        let rowChange = 0;
        let colChange = 0;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                rowChange = -1;
                
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                rowChange = 1;
                
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                colChange = -1;
                
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                colChange = 1;
                
                break;
            default:
                return; // Exit this function for other keys
                
        }
        const newRow = emptyPosition.row + rowChange;
        const newCol = emptyPosition.col + colChange;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
            moveTile(newRow, newCol);
            
        }
    }

    createPuzzle();

</script>

*/