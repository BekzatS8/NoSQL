const connectDB = require("../config/db");

async function runAggregation() {
  const db = await connectDB();
  const apartments = db.collection("apartments");


  // ТОП-3 самых дорогих квартир
  console.log("\n🏠 ТОП-3 дорогих квартир:");
  const topExpensive = await apartments.aggregate([
    { $sort: { price: -1 } },
    { $limit: 3 }
  ]).toArray();
  console.log(topExpensive);

  console.log("\n💰 Средняя цена по районам:");
  const avgPriceByLocation = await db.collection('apartments').aggregate([
      { $group: { _id: "$location", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
      { $sort: { avgPrice: -1 } }
  ]).toArray();
  console.log(avgPriceByLocation);

  console.log("\n🏡 Количество квартир в ценовых диапазонах:");
        const priceRanges = await db.collection('apartments').aggregate([
            { $bucket: {
                groupBy: "$price",
                boundaries: [0, 500, 1000, 2000, 3000],
                default: "3000+",
                output: { count: { $sum: 1 } }
            }}
        ]).toArray();
        console.log(priceRanges);

  // Тренды цен по количеству комнат
  console.log("\n📈 Средняя цена по количеству комнат:");
  const priceByRooms = await apartments.aggregate([
    { $group: { _id: "$rooms", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray();
  console.log(priceByRooms);

  process.exit();
}

// Запускаем скрипт
runAggregation();
