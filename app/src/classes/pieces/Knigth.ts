import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece'

class Knight extends Piece{
    constructor(color){
        super(color,['♞','♘'],PieceType.knight);
    }

    availableMovements(position:[number , number],boardMatrix:Cell[][]){
        //Jump Up Rigth
        this.MovementsX1(position,[1,-2],boardMatrix);
        //Jump Down Right
        this.MovementsX1(position,[1,2],boardMatrix);
        //Jump Rigth Up
        this.MovementsX1(position,[2,-1],boardMatrix);
        //Jump Rigth Down
        this.MovementsX1(position,[2,+1],boardMatrix);
        //Jump Up Left
        this.MovementsX1(position,[-1,-2],boardMatrix);
        //Jump Down Left
        this.MovementsX1(position,[-1,2],boardMatrix);
        //Jump Left Up
        this.MovementsX1(position,[-2,-1],boardMatrix);
        //Jump Left Down
        this.MovementsX1(position,[-2,1],boardMatrix);

    }

}

export default Knight