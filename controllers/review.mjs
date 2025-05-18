//Part F task 12 implemeting a review system
import reviewDao from "../dao/review.mjs";
import POIDao from "../dao/POI.mjs";

class ReviewController {
    constructor(db) {
        this.dao = new reviewDao(db, "poi_reviews");
        this.dao2 = new POIDao(db, "pointsofinterest")
    }

    addReview(req,res) {
        try {
            const poiId = this.dao2.findPoibyId(req.body.poi_id);
            if(poiId == null){
                res.status(404).json({error: "No Point of interest with that Id"});
            } else {
                if (req.body.review == null ){
                    res.status(400).json({ error: "Error Blank fields"});
                } else {
                    const Id = this.dao.reviewPoi(req.body.poi_id, req.body.review);
                    res.json({id: Id});
                }
            }
            } catch(e) {
                throw e;
            }
    }

    findReviewById(req, res) {
        try {
            const review = this.dao.findReviewById(req.params.poi_id);
            if(review == null) {
                res.status(404).json({error: "No point of interest with that ID"});
            } else {
                res.json(review);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
}

export default ReviewController;