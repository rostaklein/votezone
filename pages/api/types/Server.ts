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
    t.nonNull.string("id")
    t.string("name")
    t.string("description")
    t.date("createdAt")
    t.date("openingAt")
    t.int("voteCount", {
      resolve: parent =>
        prisma.vote
          .aggregate({
            _count: {
              id: true,
            },
            where: {
              serverId: parent.id,
            },
          })
          .then(value => value._count.id),
    })
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
