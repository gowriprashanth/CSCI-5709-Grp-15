/**
 * @author Darshit Dhameliya
 */
const { MongoClient } = require("mongodb")

const uri = process.env.DATABASE_URL

const client = new MongoClient(uri);

client.connect();
const db = client.db("Group15DB");

module.exports = {
    db
}


