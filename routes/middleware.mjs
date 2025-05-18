import express from 'express';
import Database from 'better-sqlite3';


import db from '../db.mjs';

//Part E task 11 prevent a user from adding or recommending a location wihthout loggin in first

function checkUser(req, res, next) {
	if(req.session.username === undefined) {
		res.status(401).json({error: "You're not logged in. Please Login first"});
	} else {
        const stmt = db.prepare("SELECT * FROM poi_users WHERE username=?");
        const results = stmt.get(req.session.username);
        if(results != undefined) {
            next();
        } else {
			res.status(401).json({error: `${req.session.username} is not a user please login properly`});	
		}
	}
}

export default checkUser;