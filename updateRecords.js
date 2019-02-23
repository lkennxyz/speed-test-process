import MongoClient from 'mongodb';
import assert from 'assert';

(async () => {
  const uri = process.env.MONGO_URI;
  const db = process.env.MONGO_DB;
  const dbCollection = process.env.MONGO_COLLECTION;
  const client = await new MongoClient(uri, { useNewUrlParse: true });
  try {
    await client.connect();
    const collection = await client.db(db).collection(dbCollection);
    const data = await collection
      .find({})
      .sort({ "time": 1 })
      .toArray();
    data.forEach(async(el) => {
      console.log(el);
      const date = new Date(Number(el.time));
      const mod = await collection.updateOne(
        {_id: el._id},
        {$set: {
          day: date.getDay(),
          hour: date.getHours(),
        }},
        {upsert: true}
      );
      assert.equal(mod.modifiedCount, 1);
    });
  } catch (err) {
    console.error(err);
  }
  client.close();
  process.exit(0);
})();