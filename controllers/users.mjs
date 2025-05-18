import UserDao from '../dao/users.mjs';

class UserController {
	constructor(db) {
	this.dao = new UserDao(db, 'poi_users');
	}

    loginUser(req, res){
        try {
            const user = this.dao.loginUser(req.body.username, req.body.password);
            if(user == null) {
                res.status(401).json({error: "Incorrect login!"});
            } else {
                req.session.username = req.body.username; 
                res.json({username: req.session.username});
            } 
        } catch(e) {
            throw e;
        }
    }

    logOut(req, res){
        try {
            req.session = null;
            res.json({'success': 1 });
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    loggedIn (req, res){
        try {
            res.json({username: req.session.username || null} );
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

}

export default UserController;