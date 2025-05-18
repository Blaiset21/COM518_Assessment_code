import express from 'express';
import Database from 'better-sqlite3';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

const app = express();

const sessDb = new Database('session.db');

const SqliteStore = betterSqlite3Session(expressSession, sessDb);


import 'dotenv/config';

import userRouter from './routes/users.mjs';
import PoiRouter from './routes/POI.mjs';
import checkUser from './routes/middleware.mjs';
import reviewRouter from './routes/review.mjs';
//Part E task 10 impelent a session based login system

app.use(expressSession({
    store: new SqliteStore(), 

    secret: 'f8a31d4e7f0fd9d4edf6c029a0d36c034732', 

    resave: true, 

    saveUninitialized: false, 

    rolling: true, 

    unset: 'destroy', 

    proxy: true, 

    cookie: { 
        maxAge: 600000, 
        httpOnly: false
    }
}));

app.use(express.json()); 

app.use(express.static('public'));

app.use('/users', userRouter);

app.post('*', checkUser);

app.use('/POI', PoiRouter);

app.use('/review', reviewRouter);

app.listen(3000);


