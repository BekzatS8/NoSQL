const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // Адрес MongoDB
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Подключение к MongoDB успешно!");
    return client.db("Endterm"); // Название БД
  } catch (error) {
    console.error("❌ Ошибка подключения:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
