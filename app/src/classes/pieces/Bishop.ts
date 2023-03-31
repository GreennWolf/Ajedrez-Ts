import { Color, PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece'

class Bishop extends Piece{
    constructor(color:Color){
        super(color,['♝','♗'],PieceType.bishop);
    }

    availableMovements(position:[number , number],boardMatrix:Cell[][]){
        //Down Right
        this.MovementsX8(position,[1,1],boardMatrix);
        //Down Left
        this.MovementsX8(position,[-1,1],boardMatrix);
        //Up Right
        this.MovementsX8(position,[1,-1],boardMatrix);
        //Up Left
        this.MovementsX8(position,[-1,-1],boardMatrix);
    }

}

export default Bishop