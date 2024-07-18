const mysql = require('mysql2/promise')

const db = mysql.createPool({
    database : "todo",
    password : "password123",
    host : "localhost",
    user : "root"

})

const test = async ()=>{
    try {
        const connection = await db.getConnection();
        console.log("Connected to the database");
        connection.release();
    } catch (error) {
        console.log("Database error " , error);
    }
}

test()

module.exports = db;