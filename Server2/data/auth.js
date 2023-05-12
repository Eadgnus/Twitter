import SQ from 'sequelize'
// import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;
import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb'

const objectID = MongoDb.objectId;




export async function searchID(username) {
    return getUsers().findOne({ username }).then(data => {
        console.log(data)
    })
}

export async function findById(id) {
    return null
}

export async function createUser(user) {
    return getUsers().insertOne(user)
        .then((result) => result.ops[0]._id.toString());
}

export async function login(user) {
    return null
}