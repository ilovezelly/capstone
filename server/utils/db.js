import mysql from 'mysql2';
import dotenv from 'dotenv';

const config = dotenv.config();

console.log(config);
// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//connect to the database
db.connect(function(err){
    if(err){
        console.log('connection error')
    }else{
        console.log('MySQL is Connected')
    }
})

export default db;