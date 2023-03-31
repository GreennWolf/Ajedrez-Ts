import {createServer} from 'http';
import {Server,Socket as SocketBase} from 'socket.io';

const initialBoard = [
    ['br','bn','bb','bq','bk','bb','bn','br'],
    ['b','b','b','b','b','b','b','b'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['w','w','w','w','w','w','w','w'],
    ['wr','wn','wb','wq','wk','wb','wn','wr'],
];

interface Socket extends SocketBase{
    roomId?:string
};

interface Room{
    board:[(string|null)[]];
    current:number,
    players:Socket[]
};

const rooms:Record<string,Room> = {};

const serverPieces={

};


const httpServer = createServer();
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:8080",
        methods:["GET","POST"]
    }
})

io.on('connection',(socket:Socket) =>{
    console.log('Socket Connected!');

    socket.emit('connected');

    socket.on('join room',(roomId)=>{
        socket.roomId = roomId;

        if(!rooms[roomId]){
            rooms[roomId] ={
                board:JSON.parse(JSON.stringify(initialBoard)),
                players:[],
                current:0,
            };
        }

        

        if(rooms[roomId].players?.length === 2){
            socket.emit('room full');
            return;
        }
        rooms[roomId].players?.push(socket);
        socket.join(roomId);

        socket.emit('init board',rooms[roomId].board);

        if(rooms[roomId].players.length ===2){
            const {players} = rooms[roomId]
            if(Math.random() > 0.5){
                rooms[roomId].current = 1;
                players[1].emit('te toca');
                players[0].emit('sos black');
            }else{
                players[0].emit('te toca');
                players[1].emit('sos black');
            }
        }
    });


    socket.on('move',([prev,next])=>{
        const {roomId} = socket;
        if(!roomId) return;

        const room = rooms[roomId];
        const [xNext,yNext] = next
        const [xPrev,yPrev] = prev

        if(!room) return

        room.board[yNext][xNext] = room.board[yPrev][xPrev];
        room.board[yNext][xNext] = null;
        
        io.to(roomId).emit('move',[prev,next]);

        room.current = room.current ? 0 : 1; 

        room.players[room.current].emit('te toca');
    })

    socket.on('disconnecting', ()=>{
        const socketRooms = [...socket.rooms];
        socketRooms.forEach((r) =>{
            if(!rooms[r])return;
            rooms[r].players = rooms[r].players.filter((p)=> p != socket);
            io.to(r).emit('Player Left');
        })
    })
})



httpServer.listen(5000);