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
let canvas, ctx, nextCanvas, nextCtx, holdCanvas, holdCtx;
let board = [];
let currentPiece = null;
let nextPiece = null;
let holdPiece = null;
let canHold = true;
let ghostPiece = null;
let score = 0;
let lines = 0;
let level = 1;
let highScore = 0;
let gameRunning = false;
let isPaused = false;
let dropTime = 0;
let lastTime = 0;

// Estatísticas do jogo
let gameStats = {
    piecesPlaced: 0,
    tetrisCount: 0,
    startTime: null,
    gameTime: 0
};

// Sistema de Som
let soundEnabled = true;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Configurações
let currentTheme = 'classic';

// Sistema de Animação
let animatingLines = [];
let animationTime = 0;
const ANIMATION_DURATION = 500; // 500ms

// Funções de Som
function playSound(frequency, duration, type = 'sine') {
    if (!soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playMoveSound() {
    playSound(200, 0.1);
}

function playRotateSound() {
    playSound(300, 0.1);
}

function playDropSound() {
    playSound(150, 0.2);
}

function playLineClearSound() {
    playSound(400, 0.3);
    setTimeout(() => playSound(500, 0.2), 100);
}

function playTetrisSound() {
    playSound(600, 0.4);
    setTimeout(() => playSound(700, 0.3), 150);
    setTimeout(() => playSound(800, 0.3), 300);
    setTimeout(() => playSound(900, 0.4), 450);
}

function playGameOverSound() {
    playSound(200, 0.5);
    setTimeout(() => playSound(150, 0.5), 200);
    setTimeout(() => playSound(100, 0.8), 400);
}

// Funções de Tema
function loadSettings() {
    const savedTheme = localStorage.getItem('tetris-theme');
    const savedSound = localStorage.getItem('tetris-sound');
    
    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme(currentTheme);
        document.getElementById('theme-selector').value = currentTheme;
    }
    
    if (savedSound !== null) {
        soundEnabled = savedSound === 'true';
        updateSoundButton();
    }
}

function saveSettings() {
    localStorage.setItem('tetris-theme', currentTheme);
    localStorage.setItem('tetris-sound', soundEnabled.toString());
}

function applyTheme(theme) {
    document.body.className = theme === 'classic' ? '' : `theme-${theme}`;
    currentTheme = theme;
    saveSettings();
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundButton();
    saveSettings();
    
    if (soundEnabled) {
        playMoveSound(); // Som de teste
    }
}

function updateSoundButton() {
    const button = document.getElementById('sound-toggle');
    button.textContent = soundEnabled ? '🔊' : '🔇';
    button.title = soundEnabled ? 'Desativar som' : 'Ativar som';
}

// Pontuação
const POINTS = {
    1: 40,   // 1 linha
    2: 100,  // 2 linhas
    3: 300,  // 3 linhas
    4: 1200  // 4 linhas (Tetris)
};

// Funções de High Score
function loadHighScore() {
    const saved = localStorage.getItem('tetris-highscore');
    highScore = saved ? parseInt(saved) : 0;
    updateScore();
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('tetris-highscore', highScore.toString());
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('next-canvas');
    nextCtx = nextCanvas.getContext('2d');
    holdCanvas = document.getElementById('hold-canvas');
    holdCtx = holdCanvas.getContext('2d');
    
    // Ajustar tamanho do canvas baseado no CSS
    resizeCanvas();
    
    // Carregar high score e configurações
    loadHighScore();
    loadSettings();
    
    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // Event listeners para configurações
    document.getElementById('sound-toggle').addEventListener('click', toggleSound);
    document.getElementById('theme-selector').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    // Controles móveis
    document.getElementById('left-btn').addEventListener('click', () => movePiece(-1, 0));
    document.getElementById('right-btn').addEventListener('click', () => movePiece(1, 0));
    document.getElementById('down-btn').addEventListener('click', () => movePiece(0, 1));
    document.getElementById('rotate-btn').addEventListener('click', rotatePiece);
    document.getElementById('hold-btn').addEventListener('click', holdCurrentPiece);
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
    
    // Para desktop, garantir que o canvas se adapte à altura da viewport
    if (window.innerWidth > 768) {
        const maxHeight = window.innerHeight * 0.7; // 70% da altura da viewport
        const maxWidth = maxHeight / 2; // Manter proporção 1:2
        
        canvas.width = Math.min(rect.width, maxWidth);
        canvas.height = Math.min(rect.height, maxHeight);
    } else {
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
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
    isPaused = false;
    holdPiece = null;
    canHold = true;
    
    // Reset das estatísticas
    gameStats = {
        piecesPlaced: 0,
        tetrisCount: 0,
        startTime: Date.now(),
        gameTime: 0
    };
    
    // Gerar primeira peça
    currentPiece = generatePiece();
    nextPiece = generatePiece();
    updateGhostPiece();
    
    // Atualizar UI
    updateScore();
    updateStats();
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

// Sistema de Hold Piece
function holdCurrentPiece() {
    if (!gameRunning || isPaused || !canHold) return;
    
    if (holdPiece === null) {
        // Primeira vez segurando uma peça
        holdPiece = {
            type: currentPiece.type,
            color: currentPiece.color
        };
        currentPiece = nextPiece;
        nextPiece = generatePiece();
    } else {
        // Trocar peça atual com a segurada
        const temp = {
            type: holdPiece.type,
            color: holdPiece.color
        };
        
        holdPiece = {
            type: currentPiece.type,
            color: currentPiece.color
        };
        
        currentPiece = {
            type: temp.type,
            shape: PIECES[temp.type][0],
            rotation: 0,
            x: Math.floor(BOARD_WIDTH / 2) - Math.floor(PIECES[temp.type][0][0].length / 2),
            y: 0,
            color: temp.color
        };
    }
    
    canHold = false; // Só pode segurar uma vez por peça
    updateGhostPiece();
}

// Sistema de Ghost Piece
function updateGhostPiece() {
    if (!currentPiece) return;
    
    ghostPiece = {
        type: currentPiece.type,
        shape: currentPiece.shape,
        rotation: currentPiece.rotation,
        x: currentPiece.x,
        y: currentPiece.y,
        color: currentPiece.color
    };
    
    // Encontrar a posição mais baixa possível
    while (isValidPosition(ghostPiece.shape, ghostPiece.x, ghostPiece.y + 1)) {
        ghostPiece.y++;
    }
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
        case 'KeyC':
            e.preventDefault();
            holdCurrentPiece();
            break;
    }
}

function movePiece(dx, dy) {
    if (!gameRunning || isPaused) return;
    
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    
    if (isValidPosition(currentPiece.shape, newX, newY)) {
        currentPiece.x = newX;
        currentPiece.y = newY;
        updateGhostPiece();
        
        // Som de movimento
        if (dx !== 0) {
            playMoveSound();
        }
        
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
    if (!gameRunning || isPaused) return;
    
    const rotations = PIECES[currentPiece.type];
    const nextRotation = (currentPiece.rotation + 1) % rotations.length;
    const rotatedShape = rotations[nextRotation];
    
    if (isValidPosition(rotatedShape, currentPiece.x, currentPiece.y)) {
        currentPiece.shape = rotatedShape;
        currentPiece.rotation = nextRotation;
        updateGhostPiece();
        playRotateSound();
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
    // Som de drop
    playDropSound();
    
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
    
    // Atualizar estatísticas
    gameStats.piecesPlaced++;
    
    // Verificar linhas completas
    const linesCleared = clearLines();
    if (linesCleared > 0) {
        lines += linesCleared;
        
        // Som de linha limpa
        if (linesCleared === 4) {
            playTetrisSound();
        } else {
            playLineClearSound();
        }
        
        // Calcular pontuação baseada no número de linhas
        let points = 0;
        switch(linesCleared) {
            case 1: points = POINTS[1]; break;
            case 2: points = POINTS[2]; break;
            case 3: points = POINTS[3]; break;
            case 4: 
                points = POINTS[4];
                gameStats.tetrisCount++;
                break;
        }
        
        score += points * level;
        level = Math.floor(lines / 10) + 1;
        updateScore();
        updateStats();
    }
    
    // Permitir hold novamente
    canHold = true;
    
    // Gerar nova peça
    currentPiece = nextPiece;
    nextPiece = generatePiece();
    updateGhostPiece();
    
    // Verificar game over
    if (!isValidPosition(currentPiece.shape, currentPiece.x, currentPiece.y)) {
        gameOver();
    }
}

function clearLines() {
    let completedLines = [];
    
    // Encontrar linhas completas
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            completedLines.push(row);
        }
    }
    
    if (completedLines.length > 0) {
        // Iniciar animação
        animatingLines = completedLines.map(row => ({
            row: row,
            startTime: Date.now(),
            originalColors: [...board[row]]
        }));
        
        // Aguardar animação antes de remover linhas
        setTimeout(() => {
            // Remover linhas após animação
            completedLines.sort((a, b) => b - a); // Ordenar do maior para o menor
            completedLines.forEach(row => {
                board.splice(row, 1);
                board.unshift(Array(BOARD_WIDTH).fill(0));
            });
            animatingLines = [];
        }, ANIMATION_DURATION);
    }
    
    return completedLines.length;
}

function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    if (gameRunning && !isPaused) {
        dropTime += deltaTime;
        
        // Velocidade baseada no nível
        const dropInterval = Math.max(50, 1000 - (level - 1) * 100);
        
        if (dropTime > dropInterval) {
            if (!movePiece(0, 1)) {
                // Peça não conseguiu descer
            }
            dropTime = 0;
        }
        
        // Atualizar estatísticas
        updateStats();
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
                // Verificar se esta linha está sendo animada
                const animatingLine = animatingLines.find(line => line.row === row);
                if (animatingLine) {
                    drawAnimatedBlock(col * blockSize, row * blockSize, blockSize, board[row][col], animatingLine);
                } else {
                    drawBlock(col * blockSize, row * blockSize, blockSize, board[row][col]);
                }
            }
        }
    }
    
    // Desenhar peça atual
    if (currentPiece) {
        drawPiece(currentPiece, blockSize);
    }
    
    // Desenhar peça fantasma
    if (ghostPiece && ghostPiece.y !== currentPiece.y) {
        drawGhostPiece(ghostPiece, blockSize);
    }
    
    // Desenhar próxima peça
    drawNextPiece();
    
    // Desenhar peça segurada
    drawHoldPiece();
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

function drawAnimatedBlock(x, y, size, color, animatingLine) {
    const elapsed = Date.now() - animatingLine.startTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    
    ctx.save();
    
    // Efeito de pulsação
    const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    
    // Mudança de cor gradual para branco
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    const newR = Math.floor(r + (255 - r) * progress);
    const newG = Math.floor(g + (255 - g) * progress);
    const newB = Math.floor(b + (255 - b) * progress);
    
    const animatedColor = `rgb(${newR}, ${newG}, ${newB})`;
    
    // Desenhar bloco animado
    ctx.fillStyle = animatedColor;
    ctx.fillRect(x, y, size, size);
    
    // Brilho adicional
    ctx.fillStyle = `rgba(255, 255, 255, ${progress * 0.5})`;
    ctx.fillRect(x, y, size, size);
    
    // Borda brilhante
    ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);
    
    ctx.restore();
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

function drawGhostPiece(piece, blockSize) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const x = (piece.x + col) * blockSize;
                const y = (piece.y + row) * blockSize;
                
                // Desenhar apenas a borda
                ctx.strokeStyle = piece.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 1, y + 1, blockSize - 2, blockSize - 2);
            }
        }
    }
    
    ctx.restore();
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

function drawHoldPiece() {
    holdCtx.fillStyle = '#000';
    holdCtx.fillRect(0, 0, holdCanvas.width, holdCanvas.height);
    
    if (holdPiece) {
        const shape = PIECES[holdPiece.type][0];
        const blockSize = 20;
        const offsetX = (holdCanvas.width - shape[0].length * blockSize) / 2;
        const offsetY = (holdCanvas.height - shape.length * blockSize) / 2;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const x = offsetX + col * blockSize;
                    const y = offsetY + row * blockSize;
                    
                    holdCtx.fillStyle = holdPiece.color;
                    holdCtx.fillRect(x, y, blockSize, blockSize);
                    
                    // Borda 3D
                    holdCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    holdCtx.fillRect(x, y, blockSize, 2);
                    holdCtx.fillRect(x, y, 2, blockSize);
                    
                    holdCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                    holdCtx.fillRect(x, y + blockSize - 2, blockSize, 2);
                    holdCtx.fillRect(x + blockSize - 2, y, 2, blockSize);
                }
            }
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = score.toLocaleString();
    document.getElementById('lines').textContent = lines;
    document.getElementById('level').textContent = level;
    document.getElementById('high-score').textContent = highScore.toLocaleString();
}

function updateStats() {
    document.getElementById('pieces-count').textContent = gameStats.piecesPlaced;
    document.getElementById('tetris-count').textContent = gameStats.tetrisCount;
    
    // Calcular tempo de jogo
    if (gameStats.startTime) {
        const currentTime = Date.now();
        gameStats.gameTime = Math.floor((currentTime - gameStats.startTime) / 1000);
        
        const minutes = Math.floor(gameStats.gameTime / 60);
        const seconds = gameStats.gameTime % 60;
        document.getElementById('game-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Calcular PPS (Pieces Per Second)
        const pps = gameStats.gameTime > 0 ? (gameStats.piecesPlaced / gameStats.gameTime).toFixed(1) : '0.0';
        document.getElementById('pps').textContent = pps;
    }
}

function togglePause() {
    if (!gameRunning) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
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
    playGameOverSound();
    saveHighScore();
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