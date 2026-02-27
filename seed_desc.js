const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://User:user2000@cluster0.ee6ojx1.mongodb.net/hexastack?retryWrites=true&w=majority';
async function updateDescs() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const collection = db.collection('Service');

    await collection.updateOne({ name: 'Custom Business Software & ERP' }, { $set: { description: 'Build tailored systems aligned to real operational workflows.' } });
    await collection.updateOne({ name: 'ERP & Billing System Implementation' }, { $set: { description: 'Deploy scalable billing, inventory, and reporting platforms.' } });
    await collection.updateOne({ name: 'AI Workflow Integration' }, { $set: { description: 'Implement intelligent automation to reduce manual dependency.' } });
    await collection.updateOne({ name: 'SaaS Product Development' }, { $set: { description: 'Design and engineer scalable SaaS platforms.' } });
    await collection.updateOne({ name: 'Cloud Infrastructure & Deployment' }, { $set: { description: 'Secure and scalable hosting architecture.' } });
    await collection.updateOne({ name: 'System Optimization & Digital Audit' }, { $set: { description: 'Analyze inefficiencies and improve digital performance.' } });

    console.log('Descriptions added to DB');
    await client.close();
}
updateDescs().catch(console.dir);
