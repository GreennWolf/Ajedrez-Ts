import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece'

class Queen extends Piece{
    constructor(color){
        super(color,['♛','♕'],PieceType.queen);
    }

    availableMovements(position:[number , number],boardMatrix:Cell[][]){
        //Linear

        //Up
        this.MovementsX8(position,[0,-1],boardMatrix);
        //Left
        this.MovementsX8(position,[1,0],boardMatrix);
        //Right
        this.MovementsX8(position,[-1,0],boardMatrix);
        //Down
        this.MovementsX8(position,[0,1],boardMatrix);
        
        //Diagonals

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

export default Queen