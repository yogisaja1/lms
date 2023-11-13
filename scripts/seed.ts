const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  // Ketika tidak ada error
  try {
    await database.category.createMany({
      data: [
        { name: "Music" },
        { name: "Photography" },
        { name: "Fitness" },
        { name: "Accounting" },
        { name: "Computer Science" },
        { name: "Film & Video" },
        { name: "Engineering" },
      ],
    });
    console.log("Seeded categories success");
    // Ketika error
  } catch (e) {
    console.log("Error seeding the database categories", e);
    // ketika semua yang di lakukan fungsi di atas selesai
  } finally {
    await database.$disconnect();
  }
}

main();
