import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Server = objectType({
  name: "Server",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("description")
    t.field("chronicle", {
      type: "Chronicle",
      resolve: parent =>
        prisma.server
          .findUnique({ where: { id: parent.id ?? undefined } })
          .chronicle(),
    })
  },
})
