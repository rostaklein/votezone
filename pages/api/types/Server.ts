import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const ServerRates = objectType({
  name: "ServerRates",
  definition(t) {
    t.int("xp")
    t.int("sp")
    t.int("adena")
    t.int("drop")
    t.int("spoil")
  },
})

export const Server = objectType({
  name: "Server",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("description")
    t.date("createdAt")
    t.date("openingAt")
    t.field("addedBy", {
      type: "User",
      resolve: parent =>
        prisma.server
          .findUnique({ where: { id: parent.id ?? undefined } })
          .addedBy(),
    })
    t.field("chronicle", {
      type: "Chronicle",
      resolve: parent =>
        prisma.server
          .findUnique({ where: { id: parent.id ?? undefined } })
          .chronicle(),
    })
    t.field("rates", {
      type: "ServerRates",
      resolve: parent =>
        prisma.server
          .findUnique({ where: { id: parent.id ?? undefined } })
          .rates(),
    })
  },
})
