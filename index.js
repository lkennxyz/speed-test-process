#!~/usr/bin/env node -r esm -r dotenv

import getSpeed from 'fast-speed-test';
import MongoClient from 'mongodb';
import assert from 'assert';

async function fast() {
  const mbps = await getSpeed(10)/125000;
  console.log(`${mbps} mbps`);
  return mbps;
}

async function dbInsert() {
  const uri = process.env.MONGO_URI;
  const db = process.env.MONGO_DB;
  const dbCollection = process.env.MONGO_COLLECTION;
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  try {
  await client.connect();
  const speed = await fast();
  const collection = await client.db(db).collection(dbCollection);
  const date = new Date();
  const insert = await collection.insertOne({ mbps: speed, time: date, day: date.getDay(), hour: date.getHours() });
  assert.equal(1, insert.insertedCount);
  } catch (err) {
    console.error(err);
  }
  client.close();
}

(async () => {
  await dbInsert();
  process.exit(0);
})();

