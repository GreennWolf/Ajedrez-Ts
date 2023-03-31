const $div = document.createElement('div');
const $canvas = document.createElement('canvas');
const ctx = $canvas.getContext('2d');

document.body.appendChild($div);
$div.appendChild($canvas);

const WIDTH = 400;
const HEIGHT = 400;

const FILES = 8;
const RANKS = 8;

const CELL_WIDTH  = WIDTH/FILES;
const CELL_HEIGHT = HEIGHT/RANKS;

const PIECE_OFFSET = CELL_HEIGHT *  0.1;

const theme = {
    ligth:'#fff1',
    dark:'#1119',
}

const pieceTheme = {
    ligth:'#fff',
    dark:'#000',
}

const pieces = {
    king: ['♚','♔'],
    queen: ['♛','♕'],
    rook: ['♜','♖'],
    bishop: ['♝','♗'],
    knight: ['♞','♘'],
    pawn: ['♟','♙'],
}

$div.className = 'container'
$canvas.width = WIDTH;
$canvas.height = HEIGHT;
$canvas.style.border = '2px solid #000';



const renderBoard = ()=>{
    for (let x = 0; x < FILES; x +=1 ){
        for(let y = 0; y < RANKS; y+=1){
            let rectColor = theme.ligth;
            let textColor = theme.dark;
            if((x + y) % 2){
                rectColor=theme.dark;
                textColor=theme.ligth;
            }
            ctx.fillStyle = rectColor;
            ctx.fillRect(x*CELL_HEIGHT,y*CELL_HEIGHT,CELL_WIDTH,CELL_WIDTH);
    
            // Dibujar posicion
            ctx.fillStyle = '#000';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'start';
            ctx.font = '10px Arial';
            ctx.fillText(`[${x};${y}]`,x * CELL_WIDTH , y * CELL_HEIGHT );
          
            // Dibujar Pieza
            const piece = boardMatrix[x][y];
            if(piece){
            ctx.fillStyle = piece.color;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font = '32px Arial';
            ctx.fillText(piece.type[0], x * CELL_WIDTH + CELL_WIDTH/2 , y * CELL_HEIGHT + CELL_HEIGHT/2 + PIECE_OFFSET);
            ctx.fillStyle =pieceTheme.dark;
            ctx.fillText(piece.type[1], x * CELL_WIDTH + CELL_WIDTH/2 , y * CELL_HEIGHT + CELL_HEIGHT /2 + PIECE_OFFSET);
            }
            
        }
    }
}

//-Initialize board
const boardMatrix = [];
for (let x = 0; x < FILES; x +=1 ){
    boardMatrix[x] = [];
    for(let y = 0; y < RANKS; y+=1){
        boardMatrix[x][y] = null;     
    }
}

//-Ubicar las piezas
for(let i = 0; i<RANKS; i += 1){
    boardMatrix[i][1] = {
        type: pieces.pawn,
        color:pieceTheme.dark,
    } 
    boardMatrix[i][6] = {
        type: pieces.pawn,
        color:pieceTheme.ligth,
    } 
}
for ( let i = 0 ; i<2; i +=1){
    boardMatrix[0][i * 7] = {
        type: pieces.rook,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[1][i * 7] = {
        type: pieces.bishop,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[2][i * 7] = {
        type: pieces.knight,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[3][i * 7] = {
        type: pieces.queen,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[4][i * 7] = {
        type: pieces.king,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[5][i * 7] = {
        type: pieces.king,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[6][i * 7] = {
        type: pieces.bishop,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
    
    boardMatrix[7][i * 7] = {
        type: pieces.rook,
        color:i ? pieceTheme.ligth : pieceTheme.dark,
    }
}




renderBoard();