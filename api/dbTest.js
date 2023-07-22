import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://martian:phobos@localhost:27017/mars-college';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('mars-college');
    const collection = database.collection('foobars');

    // insert a document
    const doc = { name: 'foobar', createdAt: new Date() };
    const result = await collection.insertOne(doc);

    console.log(`Inserted document with _id: ${result.insertedId}`);

    // retrieve the document
    const insertedId = result.insertedId;
    const docFromDb = await collection.findOne({ _id: insertedId });

    console.log('Document retrieved from the database:', docFromDb);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

