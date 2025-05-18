//Part F task 12 implemeting a review system
class reviewDao {
    constructor(db, table) {
        this.db = db;
        this.table = table;
	
    }

    reviewPoi(poi_id, review) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table}(poi_id, review)VALUES(?,?)`);
        const info = stmt.run(poi_id, review);
        return info.lastInsertRowid;
    }

    
    findReviewById(poi_id) {   
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE poi_id=?`);
        const rows = stmt.all(poi_id);
        if (rows.length == 0) {
            return null;
        } else {
            return rows[0];
        }
    }
}

export default reviewDao;