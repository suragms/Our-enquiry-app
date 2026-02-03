import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DATABASE_URL;
if (!uri) {
    throw new Error('DATABASE_URL is not defined in .env');
}

let client: MongoClient;
let dbInstance: any = null;

export async function getCollection(name: string) {
    if (!dbInstance) {
        client = new MongoClient(uri!);
        await client.connect();
        dbInstance = client.db();
    }
    return dbInstance.collection(name);
}

export { ObjectId };
