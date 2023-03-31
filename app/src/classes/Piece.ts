import { PieceType, Color } from "../types";
import Cell from "./Cell";

class Piece {
    type:PieceType;
    color:Color;
    miau:string[];
    moved:boolean;

    constructor(color,miau,type){
        this.color = color;
        this.miau = miau;
        this.type = type;
        this.moved = false
    }


    MovementsX1(position,movement,boardMatrix){
        const [x,y] = position;
        const [xMov,yMov] = movement;
        for(let i =1; i<=1; i +=1){
            const cell =this.getCellFromCoords([x+(i*xMov),y+(i*yMov)],boardMatrix);
            if(!cell) break
            if(cell.piece && cell.piece.color === this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
    }

    MovementsX8(position,movement,boardMatrix){
        const [x,y] = position;
        const [xMov,yMov] = movement;
        for(let i =1; i<=boardMatrix.length; i +=1){
            const cell =this.getCellFromCoords([x+(i*xMov),y+(i*yMov)],boardMatrix);
            if(!cell) break
            if(cell.piece && cell.piece.color === this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
    }

    validCell(cell:Cell):boolean{
        return cell && !(cell.piece && cell.piece.color === this.color);
    }

    getCellFromCoords(position:[number , number],boardMatrix:Cell[][]):Cell | null{
        const [x,y] = position
        const rank = boardMatrix[x]||[];
        const cell = rank[y];
        return cell
    }
    //eslint-disable-next-line np-unused-vars
    availableMovements(postion:[number , number],boardMatrix:Cell[][]){
        throw new Error(`Missing AvailableMovenet in ${this.type}`);
    }
}

export default Piece;