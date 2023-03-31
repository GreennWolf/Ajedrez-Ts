import { Color, PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece'

class Rook extends Piece{
    constructor(color:Color){
        super(color,['♜','♖'],PieceType.rook);
    }
    
    availableMovements(position:[number , number],boardMatrix:Cell[][]){
        //Up
        this.MovementsX8(position,[0,-1],boardMatrix);
        //Left
        this.MovementsX8(position,[1,0],boardMatrix);
        //Right
        this.MovementsX8(position,[-1,0],boardMatrix);
        //Down
        this.MovementsX8(position,[0,1],boardMatrix);
    }
    
}

export default Rook