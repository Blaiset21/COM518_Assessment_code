import POIDao from "../dao/POI.mjs";

class POIController {
    constructor(db) {
        this.dao = new POIDao(db, "pointsofinterest");
    }
    // Part A - task 1 look up all Points of interest in a region
    findPoiByRegion(req,res) {
        try{
            const pois = this.dao.findPoibyRegion(req.params.region);
            res.json(pois);
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

        
    // Part A - task 2 Add a point of interest
    // Part C - task 7 Adding simple error checking
    addPoi(req,res) {
            try {
                    if (req.body.name == null || req.body.type == null || req.body.country == null || req.body.region == null|| req.body.lon == null|| req.body.lat== null || req.body.description ==null){
        			    res.status(400).json({ error: "Error Blank fields"});
        		    } else if (req.body.name == "" || req.body.type == "" || req.body.country == "" || req.body.region == ""|| req.body.lon == ""|| req.body.lat== ""  || req.body.description == ""){
        			    res.status(400).json({ error: "Error Blank fields"});
        		    } else {
                        const PoiId = this.dao.addPoi(req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description);
                        res.json({id: PoiId});
                    }
                } catch(e) {
                    throw e;
                }
        }
    // Part A - task 3 Recommend a point of interest
    recommendPoi(req, res) {
        try{
            const poi = this.dao.recommendPoi(req.params.id);
            if(poi == null) {
                res.status(404).json({error: "Point of interest"});
            } else {
                res.json(poi);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
}

export default POIController;