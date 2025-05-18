//Part E task 10 impelent a session based login system
import express from 'express';
const userRouter = express.Router();

import db from '../db.mjs';
import UserController from '../controllers/users.mjs';

const uController = new UserController(db);


userRouter.post('/login', uController.loginUser.bind(uController));

userRouter.post('/logout', uController.logOut.bind(uController));

userRouter.get('/loggedIn', uController.loggedIn.bind(uController));

// functions moved to clean up 

// userRouter.get('/allusers', (req, res) => {
//     try {
//         const stmt = db.prepare("SELECT * FROM poi_users ");
//         const results = stmt.all();
//         res.json(results);
//     } catch(error) {
//         res.status(500).json({ error: error });
//     }
// });

// userRouter.get('/user/:username', (req,res)=> {
//     try {
//         const stmt = db.prepare("SELECT * FROM poi_users WHERE username=?");
//         const results = stmt.all(req.params.username);
//         res.json(results);
//     } catch(error) {
//         res.status(500).json({ error: error });
//     }
// });

// userRouter.post('/login', (req, res) => {
//     try {
//        const stmt = db.prepare("SELECT * FROM poi_users	WHERE username=? AND password=?");
//        const results = stmt.all(req.body.username, req.body.password);
//        if(results.length == 1) {
//            req.session.username = req.body.username; 
//            res.json({username: req.session.username});
//        } else {
//            res.status(401).json({error: "Incorrect login!"});
//        } 
//    } catch(error) {
//        res.status(500).json({ error: error });
//    }
// });

// userRouter.post('/logout', (req, res) => {
//    req.session = null;
//    res.json({'success': 1 });
// });

// userRouter.get('/login', (req, res) => {
//     res.json({username: req.session.username || null} );
// });


export default userRouter;