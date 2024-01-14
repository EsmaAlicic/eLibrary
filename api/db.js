import mysql from "mysql2"

export const db = mysql.createConnection({
    host:"ptfelibrary.mysql.database.azure.com",
    user:"ptfadmin",
    password:"a1~2345678",
    //require_secure_transport: "off",
    //sslmode:"off",
    database:"test"
})