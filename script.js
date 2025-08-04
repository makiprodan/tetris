// Configurações do jogo
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

// Cores das peças (fiéis ao Tetris original)
const COLORS = {
    I: '#00f0f0', // Ciano
    O: '#f0f000', // Amarelo
    T: '#a000f0', // Roxo
    S: '#00f000', // Verde
    Z: '#f00000', // Vermelho
    J: '#0000f0', // Azul
    L: '#f0a000'  // Laranja
};

// Formas das peças (Tetrominos)
const PIECES = {
    I: [
        [[1, 1, 1, 1]],
        [[1],
         [1],
         [1],
         [1]]
    ],
    O: [
        [[1, 1],
         [1, 1]]
    ],
    T: [
        [[0, 1, 0],
         [1, 1, 1]],
        [[1, 0],
         [1, 1],
         [1, 0]],
        [[1, 1, 1],
         [0, 1, 0]],
        [[0, 1],
         [1, 1],
         [0, 1]]
    ],
    S: [
        [[0, 1, 1],
         [1, 1, 0]],
        [[1, 0],
         [1, 1],
         [0, 1]]
    ],
    Z: [
        [[1, 1, 0],
         [0, 1, 1]],
        [[0, 1],
         [1, 1],
         [1, 0]]
    ],
    J: [
        [[1, 0, 0],
         [1, 1, 1]],
        [[1, 1],
         [1, 0],
         [1, 0]],
        [[1, 1, 1],
         [0, 0, 1]],
        [[0, 1],
         [0, 1],
         [1, 1]]
    ],
    L: [
        [[0, 0, 1],
         [1, 1, 1]],
        [[1, 0],
         [1, 0],
         [1, 1]],
        [[1, 1, 1],
         [1, 0, 0]],
        [[1, 1],
         [0, 1],
         [0, 1]]
    ]
};

// Variáveis do jogo
let canvas, ctx, nextCanvas, nextCtx;
let board = [];
let currentPiece = null;
let nextPiece = null;
let gameRunning = false;
let gamePaused = false;
let score = 0;
let lines = 0;
let level = 1;
let dropTime = 0;
let lastTime = 0;

// Pontuação
const POINTS = {
    1: 40,   // 1 linha
    2: 100,  // 2 linhas
    3: 300,  // 3 linhas
    4: 1200  // 4 linhas (Tetris)
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('next-canvas');
    nextCtx = nextCanvas.getContext('2d');
    
    // Ajustar tamanho do canvas baseado no CSS
    resizeCanvas();
    
    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // Controles móveis
    document.getElementById('left-btn').addEventListener('click', () => movePiece(-1, 0));
    document.getElementById('right-btn').addEventListener('click', () => movePiece(1, 0));
    document.getElementById('down-btn').addEventListener('click', () => movePiece(0, 1));
    document.getElementById('rotate-btn').addEventListener('click', rotatePiece);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    
    // Prevenir scroll em dispositivos móveis
    document.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    document.addEventListener('touchend', e => e.preventDefault(), { passive: false });
    document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    
    // Iniciar jogo
    initGame();
    gameLoop();
});

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Recalcular tamanho dos blocos
    window.blockSize = Math.min(canvas.width / BOARD_WIDTH, canvas.height / BOARD_HEIGHT);
}

function initGame() {
    // Inicializar tabuleiro
    board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
    
    // Reset das variáveis
    score = 0;
    lines = 0;
    level = 1;
    dropTime = 0;
    gameRunning = true;
    gamePaused = false;
    
    // Gerar primeira peça
    currentPiece = generatePiece();
    nextPiece = generatePiece();
    
    // Atualizar UI
    updateScore();
    hideGameOver();
    hidePause();
}

function generatePiece() {
    const types = Object.keys(PIECES);
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
        type: type,
        shape: PIECES[type][0],
        rotation: 0,
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(PIECES[type][0][0].length / 2),
        y: 0,
        color: COLORS[type]
    };
}

function handleKeyPress(e) {
    if (!gameRunning) return;
    
    switch(e.code) {
        case 'ArrowLeft':
            e.preventDefault();
            movePiece(-1, 0);
            break;
        case 'ArrowRight':
            e.preventDefault();
            movePiece(1, 0);
            break;
        case 'ArrowDown':
            e.preventDefault();
            movePiece(0, 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            rotatePiece();
            break;
        case 'Space':
            e.preventDefault();
            togglePause();
            break;
    }
}

function movePiece(dx, dy) {
    if (!gameRunning || gamePaused) return;
    
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    
    if (isValidPosition(currentPiece.shape, newX, newY)) {
        currentPiece.x = newX;
        currentPiece.y = newY;
        return true;
    }
    
    // Se não conseguiu mover para baixo, fixar peça
    if (dy > 0) {
        placePiece();
        return false;
    }
    
    return false;
}

function rotatePiece() {
    if (!gameRunning || gamePaused) return;
    
    const rotations = PIECES[currentPiece.type];
    const nextRotation = (currentPiece.rotation + 1) % rotations.length;
    const rotatedShape = rotations[nextRotation];
    
    if (isValidPosition(rotatedShape, currentPiece.x, currentPiece.y)) {
        currentPiece.shape = rotatedShape;
        currentPiece.rotation = nextRotation;
    }
}

function isValidPosition(shape, x, y) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;
                
                // Verificar limites
                if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                    return false;
                }
                
                // Verificar colisão com peças já colocadas
                if (newY >= 0 && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece() {
    // Colocar peça no tabuleiro
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const x = currentPiece.x + col;
                const y = currentPiece.y + row;
                
                if (y >= 0) {
                    board[y][x] = currentPiece.color;
                }
            }
        }
    }
    
    // Verificar linhas completas
    const linesCleared = clearLines();
    if (linesCleared > 0) {
        lines += linesCleared;
        score += POINTS[linesCleared] * level;
        level = Math.floor(lines / 10) + 1;
        updateScore();
    }
    
    // Gerar nova peça
    currentPiece = nextPiece;
    nextPiece = generatePiece();
    
    // Verificar game over
    if (!isValidPosition(currentPiece.shape, currentPiece.x, currentPiece.y)) {
        gameOver();
    }
}

function clearLines() {
    let linesCleared = 0;
    
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            // Linha completa encontrada
            board.splice(row, 1);
            board.unshift(Array(BOARD_WIDTH).fill(0));
            linesCleared++;
            row++; // Verificar a mesma linha novamente
        }
    }
    
    return linesCleared;
}

function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    if (gameRunning && !gamePaused) {
        dropTime += deltaTime;
        
        // Velocidade baseada no nível
        const dropInterval = Math.max(50, 1000 - (level - 1) * 100);
        
        if (dropTime > dropInterval) {
            if (!movePiece(0, 1)) {
                // Peça não conseguiu descer
            }
            dropTime = 0;
        }
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

function draw() {
    // Limpar canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const blockSize = Math.min(canvas.width / BOARD_WIDTH, canvas.height / BOARD_HEIGHT);
    
    // Desenhar tabuleiro
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
            if (board[row][col]) {
                drawBlock(col * blockSize, row * blockSize, blockSize, board[row][col]);
            }
        }
    }
    
    // Desenhar peça atual
    if (currentPiece) {
        drawPiece(currentPiece, blockSize);
    }
    
    // Desenhar próxima peça
    drawNextPiece();
}

function drawBlock(x, y, size, color) {
    // Bloco principal
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    
    // Borda 3D
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x, y, size, 2);
    ctx.fillRect(x, y, 2, size);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(x, y + size - 2, size, 2);
    ctx.fillRect(x + size - 2, y, 2, size);
}

function drawPiece(piece, blockSize) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const x = (piece.x + col) * blockSize;
                const y = (piece.y + row) * blockSize;
                drawBlock(x, y, blockSize, piece.color);
            }
        }
    }
}

function drawNextPiece() {
    nextCtx.fillStyle = '#000';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        const blockSize = 20;
        const offsetX = (nextCanvas.width - nextPiece.shape[0].length * blockSize) / 2;
        const offsetY = (nextCanvas.height - nextPiece.shape.length * blockSize) / 2;
        
        for (let row = 0; row < nextPiece.shape.length; row++) {
            for (let col = 0; col < nextPiece.shape[row].length; col++) {
                if (nextPiece.shape[row][col]) {
                    const x = offsetX + col * blockSize;
                    const y = offsetY + row * blockSize;
                    
                    nextCtx.fillStyle = nextPiece.color;
                    nextCtx.fillRect(x, y, blockSize, blockSize);
                    
                    // Borda 3D
                    nextCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    nextCtx.fillRect(x, y, blockSize, 2);
                    nextCtx.fillRect(x, y, 2, blockSize);
                    
                    nextCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                    nextCtx.fillRect(x, y + blockSize - 2, blockSize, 2);
                    nextCtx.fillRect(x + blockSize - 2, y, 2, blockSize);
                }
            }
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = score.toLocaleString();
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;
}

function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    
    if (gamePaused) {
        showPause();
    } else {
        hidePause();
    }
}

function showPause() {
    document.getElementById('pause-overlay').style.display = 'flex';
}

function hidePause() {
    document.getElementById('pause-overlay').style.display = 'none';
}

function gameOver() {
    gameRunning = false;
    document.getElementById('final-score').textContent = score.toLocaleString();
    showGameOver();
}

function showGameOver() {
    document.getElementById('game-over').style.display = 'block';
}

function hideGameOver() {
    document.getElementById('game-over').style.display = 'none';
}

function restartGame() {
    initGame();
}

// Redimensionar canvas quando a janela muda de tamanho
window.addEventListener('resize', resizeCanvas);