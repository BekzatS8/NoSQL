const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
    await client.connect();
    db = client.db('Endterm');
    console.log('✅ База данных подключена');
}
connectDB();

// Получить все квартиры с фильтрацией и сортировкой
app.get('/apartments', async (req, res) => {
    const { minPrice, maxPrice, rooms, sortBy } = req.query;
    let filter = {};
    if (minPrice || maxPrice) filter.price = { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity };
    if (rooms) filter.rooms = Number(rooms);
    
    const apartments = await db.collection('apartments')
        .find(filter)
        .sort(sortBy ? { price: sortBy === 'asc' ? 1 : -1 } : {})
        .toArray();
    res.json(apartments);
});

// Добавить квартиру
app.post('/apartments', async (req, res) => {
    await db.collection('apartments').insertOne(req.body);
    res.json({ message: 'Квартира добавлена' });
});

// Обновить квартиру
app.put('/apartments/:id', async (req, res) => {
    await db.collection('apartments').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json({ message: 'Квартира обновлена' });
});

// Удалить квартиру
app.delete('/apartments/:id', async (req, res) => {
    await db.collection('apartments').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Квартира удалена' });
});

// Запуск сервера
app.listen(3000, () => console.log('🚀 Сервер запущен на http://localhost:3000'));