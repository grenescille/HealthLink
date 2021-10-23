/* eslint-disable */

import { Server, Socket } from 'socket.io';
import express from 'express';

const app = express(); // express object created
const server = require('http').createServer(app); // http server object created (remark: only created, but hasn't started yet.. this will be only done with the server.listen())
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const cors = require('cors');
const bodyParser = require('body-parser');
import session from 'express-session';
const cookieParser = require('cookie-parser');
const db = require('./models/model');
const router = require('./router');
require('dotenv').config();

declare module 'express-session' {
  export interface SessionData {
    uid: { [key: string]: any };
  }
}
declare module 'express' {
  export interface Request {
    server: Server;
  }
}
declare var process: {
  env: {
    NODE_ENV: string;
    devPORT: string;
    SESS_SECRET: string;
    DB_PORT: string;
  };
};
const corsConfig = {
  // REMOVE-START
  origin: 'http://localhost:3000',
  credentials: true,
  // REMOVE-END
};

const { devPORT } = process.env || 5000;
const { SESS_SECRET } = process.env;
// console.log(SESS_SECRET);

app.use(cors(corsConfig));
app
  .use(express.json())
  .use(cookieParser())
  .use(
    session({
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
    })
  )
  .use(router);

async function bootstrap() {
  //   await db.sequelize.sync({force:true}); //drop all tables and create again
  await db.sequelize.sync();

  io.on('connection', (socket: Socket) => {
    socket.emit('ownuser', socket.id);

    socket.on('disconnect', () => {
      socket.broadcast.emit('callended');
    });

    socket.on('call', ({ destinationUser, signallingData, from, name }) => {
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
}
bootstrap();
