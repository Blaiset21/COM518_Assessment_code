
import express from 'express';

const PoiRouter = express.Router();

import db from '../db.mjs';
import POIController from '../controllers/POI.mjs';

const pController = new POIController(db);

PoiRouter.get('/region/:region', pController.findPoiByRegion.bind(pController));

PoiRouter.post('/POI/create', pController.addPoi.bind(pController));

PoiRouter.post('/POI/:id/recommend', pController.recommendPoi.bind(pController));

// cleaned this part up using models and controllers
// // Part A - task 1 look up all Points of interest in a region
// PoiRouter.get('/region/:region', (req, res) => {
//     try {
//         const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE region=?");
//         const results = stmt.all(req.params.region);
//         res.json(results);
//     } catch(error) {
//         res.status(500).json({ error: error });
//     }
// });

// // Part A - task 2 Add a point of interest
// // Part C - task 7 Adding simple error checking
// PoiRouter.post('/POI/create', (req, res) => {
//     try {
//         if (req.body.name == "" || req.body.type == "" || req.body.country == "" || req.body.region == ""|| req.body.lon == ""|| req.body.lat== ""){
// 			res.status(400).json({ error: "Error Blank fields"});
// 		}
//         else {
//             const stmt = db.prepare('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description,recommendations) VALUES(?,?,?,?,?,?,?,0)');
//             const info = stmt.run(req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description);
//             res.json({id: info.lastInsertRowid});
//         }
//     } catch(error) {
//         res.status(500).json({error: error});
//     }
// });

// // Part A - task 3 Recommend a point of interest
// PoiRouter.post('/POI/:id/recommend', (req, res) => {
//     try {
//         const stmt = db.prepare('UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?');
//         const info = stmt.run(req.params.id);
//         if(info.changes == 1) {
//             res.json({success: 1});
//         } else {
//             res.status(404).json({error: "No Point of interest with that ID"});
//         }
//     } catch(error) {
//         throw error;
//     }
// });

export default PoiRouter;