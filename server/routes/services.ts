import express from 'express';
import { getCollection, ObjectId } from '../mongodb';

const router = express.Router();

const mapId = (doc: any) => {
    if (!doc) return doc;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
};

// GET all services
router.get('/', async (_req, res) => {
    try {
        const collection = await getCollection('Service');
        const services = await collection.find({}).sort({ displayOrder: 1 }).toArray();
        res.json(services.map(mapId));
    } catch (error) {
        console.error('Failed to fetch services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// POST new service
router.post('/', async (req, res) => {
    try {
        const collection = await getCollection('Service');
        const { name, icon, description, link, isComingSoon, displayOrder } = req.body;

        const newService = {
            name,
            icon,
            description,
            link,
            isComingSoon: !!isComingSoon,
            displayOrder: parseInt(displayOrder) || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await collection.insertOne(newService);
        res.status(201).json({ id: result.insertedId.toString(), ...newService });
    } catch (error) {
        console.error('Failed to create service:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// PUT update service
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection('Service');
        const { name, icon, description, link, isComingSoon, displayOrder } = req.body;

        const updateData = {
            name,
            icon,
            description,
            link,
            isComingSoon: !!isComingSoon,
            displayOrder: parseInt(displayOrder) || 0,
            updatedAt: new Date()
        };

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        res.json({ id, ...updateData });
    } catch (error) {
        console.error('Failed to update service:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection('Service');
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to delete service:', error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

// PATCH reorder services
router.patch('/reorder', async (req, res) => {
    try {
        const { orders } = req.body;
        const collection = await getCollection('Service');

        for (const item of orders) {
            await collection.updateOne(
                { _id: new ObjectId(item.id) },
                { $set: { displayOrder: item.displayOrder } }
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Failed to reorder services:', error);
        res.status(500).json({ error: 'Failed to reorder services' });
    }
});

export default router;
