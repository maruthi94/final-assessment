const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connect = async () => {
    mongod ??= await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

module.exports = { connect, clearDatabase, closeDatabase };
