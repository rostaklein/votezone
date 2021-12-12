import { UserInputError } from "apollo-server-micro"
import { idArg, nonNull, nullable, objectType, stringArg } from "nexus"
import prisma from "../../../lib/prisma"

export { Me } from "./me"

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("approvedServers", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: true },
        })
      },
    })
    t.list.field("unapprovedServers", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: false },
        })
      },
    })

    t.list.field("chronicles", {
      type: "Chronicle",
      resolve: (_parent, _args) => {
        return prisma.chronicle.findMany()
      },
    })

    t.field("server", {
      type: "Server",
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_parent, args) => {
        return prisma.server.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
