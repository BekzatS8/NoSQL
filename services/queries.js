const connectDB = require("../config/db");

async function runQueries() {
  const db = await connectDB();
  const apartments = db.collection("apartments");

  // 1️⃣ Фильтрация по городу и цене (< 150000)
  console.log("🔎 Квартиры в Алматы дешевле 150000:");
  const filtered = await apartments.find({ 
    "location.city": "Алматы", 
    price: { $lt: 150000 } 
  }).toArray();
  console.log(filtered);

  // 2️⃣ Поиск квартир с Wi-Fi и Балконом
  console.log("\n🔎 Квартиры с Wi-Fi и Балконом:");
  const withAmenities = await apartments.find({ 
    amenities: { $all: ["Wi-Fi", "Балкон"] } 
  }).toArray();
  console.log(withAmenities);

  // 3️⃣ Сортировка по цене (по возрастанию)
  console.log("\n📊 Квартиры, отсортированные по цене:");
  const sorted = await apartments.find().sort({ price: 1 }).toArray();
  console.log(sorted);

  // 4️⃣ Обновление – повысить цену всех квартир в Астане на 10%
  console.log("\n🛠 Повышаем цену в Астане на 10%...");
  await apartments.updateMany(
    { "location.city": "Астана" },
    { $mul: { price: 1.1 } }
  );
  console.log("✅ Цены обновлены!");

  // 5️⃣ Удаление квартир без Wi-Fi
  console.log("\n🗑 Удаляем квартиры без Wi-Fi...");
  const deleted = await apartments.deleteMany({ amenities: { $not: { $all: ["Wi-Fi"] } } });
  console.log(`✅ Удалено квартир: ${deleted.deletedCount}`);

  process.exit();
}

// Запускаем скрипт
runQueries();
