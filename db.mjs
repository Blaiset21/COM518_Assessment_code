import Database from 'better-sqlite3';
const db = new Database("pointsofinterest.db");//put where you have stored pointsofinterest.db intbetween the "" marks 
export default db;