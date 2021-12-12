import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Admin",
    email: "admin",
    password: "admin",
  },
]
const chronicleData: Prisma.ChronicleCreateInput[] = [
  {
    name: "Prelude",
    shortcut: "C0",
  },
  {
    name: "Chronicle 1: Harbingers of War",
    shortcut: "C1",
  },
  {
    name: "Chronicle 2: Age of Splendor",
    shortcut: "C2",
  },
  {
    name: "Chronicle 3: Rise of Darkness",
    shortcut: "C3",
  },
  {
    name: "Chronicle 4: Scions of Destiny",
    shortcut: "C4",
  },
  {
    name: "Chronicle 5: Oath of Blood",
    shortcut: "C5",
  },
  {
    name: "Interlude",
    shortcut: "IL",
  },
  {
    name: "The Kamael",
    shortcut: "CT1",
  },
  {
    name: "Hellbound",
    shortcut: "CT1.5",
  },
  {
    name: "Gracia Part 1",
    shortcut: "CT2.1",
  },
  {
    name: "Gracia Part 2",
    shortcut: "CT2.2",
  },
  {
    name: "Gracia Final",
    shortcut: "CT2.3",
  },
  {
    name: "Gracia Epilogue",
    shortcut: "CT2.4",
  },
  {
    name: "Freya",
    shortcut: "CT2.5",
  },
  {
    name: "High Five",
    shortcut: "H5",
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    for (const chronicle of chronicleData) {
      const user = await prisma.chronicle.create({
        data: chronicle,
      })
      console.log(`Created chronicle ${chronicle.name} with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
