import { config } from '../config.js';
import Mongoose from 'mongoose';

let db;
export async function connectDB() {
    return Mongoose.connect(config.db.host)
}

// 몽고디비는 스키마가 없음
// 비정형 형태, 규칙 따로 x

export function getUsers() {
    return db.collection('users');
}

export function getTweets() {
    return db.collection('Tweets');
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function () {
        return this._id.toString();
    })
    schema.set('toJSON', { vrituals: true });
    schema.set('toObject', { vrituals: true });
}