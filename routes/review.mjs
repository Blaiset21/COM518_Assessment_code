//Part F task 12 implemeting a review system
import express from 'express';
const reviewRouter = express.Router();

import db from '../db.mjs';
import ReviewController from '../controllers/review.mjs';

const rCOntroller = new ReviewController(db);

reviewRouter.post('/review/create', rCOntroller.addReview.bind(rCOntroller));

reviewRouter.get('/review/find/:id', rCOntroller.findReviewById.bind(rCOntroller));

export default reviewRouter;