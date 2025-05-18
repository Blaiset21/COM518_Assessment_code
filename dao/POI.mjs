class POIDao {
	constructor(db, table) {
        this.db = db;
        this.table = table;
	
    }

// Part A - task 1 look up all Points of interest in a region
    findPoibyRegion(region) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE region=?`);
        const rows = stmt.all(region);
        return rows;
    }

    findPoibyId(id) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE id=?`);
        const rows = stmt.all(id);
        if (rows.length == 0) {
            return null;
        } else {
            return rows[0];
        }
    }

// // Part A - task 2 Add a point of interest
    addPoi(name, type, country, region, lon, lat, description) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table}(name,type,country,region,lon,lat,description,recommendations) VALUES(?,?,?,?,?,?,?,0)`);
        const info = stmt.run(name, type, country, region, lon, lat, description);
        return info.lastInsertRowid;
    }

// // Part A - task 3 Recommend a point of interest
    recommendPoi(id) {
        const stmt = this.db.prepare(`UPDATE ${this.table} SET recommendations=recommendations+1 WHERE id=?`);
        const info = stmt.run(id);
        if(info.changes == 1) {
            return info;
        } else {
            return null;
        }
    }
}

export default POIDao;