import { MongoClient, Db, Collection } from 'mongodb';



export const createClientConnection = async (uri : string): Promise<MongoClient> => {
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to server');
    } catch (err) {}
    return client;
};

export const closeClientConnection = async (client: MongoClient) => {
    try {
        client.close();
    } catch (err) {}
};

export const getDb = (client: MongoClient): Db => {
    return client.db(process.env.ENVIRONMENT);
};

export const getCollection = (db: Db, collection: string): Collection<any> => {
    try {
        return db.collection(collection);
    } catch (err) {}
};
