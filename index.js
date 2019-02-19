import getSpeed from 'fast-speed-test';
import MongoClient from 'mongodb';
import assert from 'assert';

async function fast() {
  const mbps = await getSpeed(10)/125000;
  console.log(`${mbps} mbps`);
  return mbps;
}

async function dbInsert() {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    const uri = process.env.MONGO_URI;
    const db = process.env.MONGO_DB;
    const collection = process.env.MONGO_COLLECTION;
    const speed = await fast();

    await client.connect();
    const collection = client.db(db).collection(collection);
    const insert = await collection.insertOne({ mbps: speed, time: DateTime.Now() });
    assert.equal(1, insert);
  } catch (err) {
    console.error(err.stack);
  }
  client.close();
}

(async () => {
  await dbInsert();
  process.exit(0);
})();

