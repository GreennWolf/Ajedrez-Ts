
import Board from "./classes/Board";
import Piece from "./classes/Piece";
import Bishop from "./classes/pieces/Bishop";
import King from "./classes/pieces/King";
import Knight from "./classes/pieces/Knigth";
import Pawn from "./classes/pieces/Pawn";
import Queen from "./classes/pieces/Queen";
import Rook from "./classes/pieces/Rook";
import socket from "./helpers/socket";
import { Color, PieceType } from "./types";

const WIDTH = 400;
const HEIGHT = 400;

const FILES = 8;
const RANKS = 8;

const theme = {
    ligth:'#eeeed2',
    dark:'#769656',
}

const pieceTheme = {
    ligth:'#fff',
    dark:'#000',
}

const board = new Board(WIDTH,HEIGHT,FILES,RANKS,theme,pieceTheme);

socket.on('init board',(serverPieces)=>{
//Ubicar Piezas
serverPieces.forEach((rank,y)=>{
    rank.forEach((p,x)=>{
        if(!p)return
        const [colorType,pieceType=''] = p.split('');
        console.log([{colorType,pieceType}])
        let piece;
        const color = colorType === 'b' ? Color.dark : Color.ligth
        if (pieceType === PieceType.pawn) piece =new Pawn(color);
        else if (pieceType === PieceType.rook) piece =new Rook(color);
        else if (pieceType === PieceType.knight) piece =new Knight(color);
        else if (pieceType === PieceType.bishop) piece =new Bishop(color);
        else if (pieceType === PieceType.queen) piece =new Queen(color);
        else if (pieceType === PieceType.king) piece =new King(color);

        board.initPlacePiece(x,y,piece)
    })
})
board.render();
})





