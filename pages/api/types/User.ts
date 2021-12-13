import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("email")
    t.list.field("addedServers", {
      type: "Server",
      resolve: parent =>
        prisma.user
          .findFirst({ where: { id: parent.id ?? undefined } })
          .servers({
            orderBy: {
              createdAt: "desc",
            },
          }),
    })
  },
})
