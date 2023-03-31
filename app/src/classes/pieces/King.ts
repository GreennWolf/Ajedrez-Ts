import { Color, PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece'

class King extends Piece{
    constructor(color:Color){
        super(color,['♚','♔'],PieceType.king);
    }

    isCastling(position:[number,number]){
        const [x,y] = position;
        if((y=== 7 || y ===0) && (x ===6 || x ===2)){
            this.moved
        };
    }

    castling(position:[number,number],boardMatrix:Cell[][]){
        const [x,y] = position;
        const yDirection = this.color === Color.dark ? 0: 7;
        if(x === 6){
            const rookCell =boardMatrix[7][1 * yDirection]
            boardMatrix[5][1 * yDirection].setPiece(rookCell.piece)
            rookCell.setPiece(null);
            
        }else if(x === 2){
            const rookCell =boardMatrix[0][1 * yDirection]
            boardMatrix[3][1 * yDirection].setPiece(rookCell.piece)
            rookCell.setPiece(null);
        }
    }

    availableMovements(position:[number , number],boardMatrix:Cell[][]){
        const [x,y] = position;
        //Up
        this.MovementsX1(position,[0,-1],boardMatrix);
        //Down
        this.MovementsX1(position,[0,1],boardMatrix);
        //Left
        this.MovementsX1(position,[1,0],boardMatrix);
        //Right
        this.MovementsX1(position,[-1,0],boardMatrix);
        //Diagonal Rigth Up
        this.MovementsX1(position,[1,-1],boardMatrix);
        //Diagonal Left Up
        this.MovementsX1(position,[-1,-1],boardMatrix);
        //Diagonal Rigth Down
        this.MovementsX1(position,[1,1],boardMatrix);
        //Diagonal Left Down
        this.MovementsX1(position,[-1,1],boardMatrix);

        if (this.moved)return;

        const cellCastlingKingSlide1 = this.getCellFromCoords([x+1,y],boardMatrix);
        const cellCastlingKingSlide2 = this.getCellFromCoords([x+2,y],boardMatrix);
        const cellCastlingKingSlideRook = this.getCellFromCoords([x+3,y],boardMatrix);
        const cellCastlingQueenSlide1 = this.getCellFromCoords([x-1,y],boardMatrix);
        const cellCastlingQueenSlide2 = this.getCellFromCoords([x-2,y],boardMatrix);
        const cellCastlingQueenSlide3 = this.getCellFromCoords([x-3,y],boardMatrix);
        const cellCastlingQueenSlideRook = this.getCellFromCoords([x-4,y],boardMatrix);

        if (!cellCastlingKingSlide1.piece
        && !cellCastlingKingSlide2.piece
        && cellCastlingKingSlideRook.piece
        && cellCastlingKingSlideRook.piece.type == PieceType.rook
        && !cellCastlingKingSlideRook.piece.moved 
        ){
            cellCastlingKingSlide2.setAvailableMovement(true);   
        }

        if (
        !cellCastlingQueenSlide1.piece
        && !cellCastlingQueenSlide2.piece
        && !cellCastlingQueenSlide3.piece
        && cellCastlingQueenSlideRook.piece
        && cellCastlingQueenSlideRook.piece.type == PieceType.rook
        && !cellCastlingQueenSlideRook.piece.moved ) {
            cellCastlingQueenSlide2.setAvailableMovement(true)
        }


    }
}

export default King