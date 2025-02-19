const connectDB = require("../config/db");

async function seedDatabase() {
  const db = await connectDB();
  const apartments = db.collection("apartments");

  // Очистка коллекции перед добавлением новых данных
  await apartments.deleteMany({});

  // Примерные данные
  const data = [
    { title: "Уютквартира", price: 500, rooms: 2, location: "Центр" },
    { title: "Квартира у моря", price: 700, rooms: 3, location: "Берег" },
    { title: "Студия в центре", price: 400, rooms: 1, location: "Центр" },
    { title: "Просторные апартаменты", price: 1200, rooms: 4, location: "Элитный район" },
    { title: "Квартира на окраине", price: 300, rooms: 2, location: "Пригород" },
    { title: "Пентхаус с видом на город", price: 2500, rooms: 5, location: "Центр" },
    { title: "Квартира возле парка", price: 650, rooms: 3, location: "Зелёная зона" },
    { title: "Апартаменты в новом ЖК", price: 900, rooms: 3, location: "Новый район" },
    { title: "Двухкомнатная в историческом центре", price: 850, rooms: 2, location: "Старый город" },
    { title: "Квартира в бизнес-квартале", price: 1800, rooms: 4, location: "Бизнес-центр" },
    { title: "Квартира в районе университетов", price: 550, rooms: 2, location: "Студенческий район" },
    { title: "Апартаменты премиум-класса", price: 3000, rooms: 6, location: "Элитный район" },
    { title: "Лофт в индустриальном стиле", price: 1100, rooms: 3, location: "Креативный кластер" },
    { title: "Квартира с террасой", price: 1600, rooms: 4, location: "Район с красивым видом" },
    { title: "Небольшая студия", price: 350, rooms: 1, location: "Пригород" },
    { title: "Таунхаус у озера", price: 2000, rooms: 5, location: "Живописное место" },
    { title: "Квартира для семьи", price: 750, rooms: 3, location: "Спокойный район" },
  ];
  
  module.exports = apartments;
  

  // Вставляем данные в MongoDB
  const result = await apartments.insertMany(data);
  console.log(`✅ Добавлено ${result.insertedCount} записей в коллекцию apartments.`);
  
  process.exit();
}

// Запускаем скрипт
seedDatabase();
