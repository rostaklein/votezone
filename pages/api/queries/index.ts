import { UserInputError } from "apollo-server-micro"
import { nonNull, nullable, objectType, stringArg } from "nexus"
import prisma from "../../../lib/prisma"

export { Me } from "./me"

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("feed", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: true },
        })
      },
    })

    t.list.field("chronicles", {
      type: "Chronicle",
      resolve: (_parent, _args) => {
        return prisma.chronicle.findMany()
      },
    })
  },
})
