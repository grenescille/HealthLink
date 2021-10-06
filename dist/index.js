"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express object created
const server = require('http').createServer(app); // http server object created (remark: only created, but hasn't started yet.. this will be only done with the server.listen())
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const cors = require('cors');
const bodyParser = require('body-parser');
const express_session_1 = __importDefault(require("express-session"));
const cookieParser = require('cookie-parser');
const db = require('./models/model');
const router = require('./router');
require('dotenv').config();
const corsConfig = {
    // REMOVE-START
    origin: '*',
    // 'http://localhost:3000',
    credentials: true,
    // REMOVE-END
};
const { devPORT } = process.env || 5000;
const { SESS_SECRET } = process.env;
// console.log(SESS_SECRET);
app.use(cors(corsConfig));
app
    .use(express_1.default.json())
    .use(cookieParser())
    .use((0, express_session_1.default)({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        secure: false,
    },
}))
    .use(router);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        //   await db.sequelize.sync({force:true}); //drop all tables and create again
        yield db.sequelize.sync();
        io.on('connection', (socket) => {
            socket.emit('ownuser', socket.id);
            socket.on('disconnect', () => {
                socket.broadcast.emit('callended');
            });
            socket.on('call', ({ destinationUser, signallingData, from, name, }) => {
                io.to(destinationUser).emit('call', {
                    signal: signallingData,
                    senderUser: from,
                    senderName: name,
                });
            });
            socket.on('answer', (data) => {
                //    console.log('going to answer');
                //    console.log('callerId: ',data.callerId);
                //    console.log('signaldata: ',data.signaldata);
                io.to(data.callerId).emit('callaccepted', data.signaldata);
            });
        });
        server.listen(devPORT, () => {
            // eslint-disable-next-line no-console
            console.log('Server and DB Operating in port ', devPORT);
        });
    });
}
bootstrap();
//# sourceMappingURL=index.js.map