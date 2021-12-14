import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.string("id")
    t.string("ip")
    t.date("createdAt")
    t.field("votedBy", {
      type: "User",
      resolve: parent =>
        prisma.vote
          .findUnique({ where: { id: parent.id ?? undefined } })
          .votedBy(),
    })
    t.field("server", {
      type: "Server",
      resolve: parent =>
        prisma.vote
          .findUnique({ where: { id: parent.id ?? undefined } })
          .server(),
    })
  },
})
