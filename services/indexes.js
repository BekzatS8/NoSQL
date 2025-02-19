const connectDB = require("../config/db");

async function manageIndexes() {
  const db = await connectDB();
  const apartments = db.collection("apartments");

  // 1️⃣ Удаляем старые индексы
  console.log("🗑 Удаляем старые индексы...");
  await apartments.dropIndexes();

  // 2️⃣ Создаём новые индексы
  console.log("🚀 Создаём индексы...");
  await apartments.createIndex({ "location.city": 1, price: -1 });
  await apartments.createIndex({ amenities: 1 });
  await apartments.createIndex({ title: "text" });

  console.log("✅ Индексы созданы!");

  // 3️⃣ Проверяем эффективность индексов
  console.log("\n📊 Анализ выполнения запроса (поиск по городу и цене):");
  const explain = await apartments.find({  
    rooms: { $gte: 2 }  
  }).explain("executionStats");
  
  console.log(JSON.stringify(explain.executionStats, null, 2));

  process.exit();
}

// Запускаем скрипт
manageIndexes();
