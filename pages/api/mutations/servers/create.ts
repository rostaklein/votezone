import { ApolloError } from "apollo-server-micro"
import { nonNull, extendType, idArg, inputObjectType } from "nexus"
import prisma from "../../../../lib/prisma"

export const CreateServerInputType = inputObjectType({
  name: "CreateServerInput",
  definition(t) {
    t.nonNull.string("name")
    t.nonNull.string("description")
    t.date("openingAt")
    t.nonNull.id("chronicle")
    t.nonNull.int("xp")
    t.nonNull.int("sp")
    t.nonNull.int("drop")
    t.nonNull.int("spoil")
    t.nonNull.int("adena")
  },
})

export const ServerMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createServer", {
      type: "Server",
      args: {
        input: nonNull("CreateServerInput"),
      },
      resolve: async (_, { input }, ctx) => {
        const user = await ctx.getCurrentUser()

        const { name, description, chronicle, openingAt, ...rates } = input
        return prisma.server.create({
          data: {
            name,
            description,
            openingAt,
            rates: {
              create: rates,
            },
            chronicle: { connect: { id: chronicle } },
            addedBy: { connect: { id: user.id } },
            approved: true,
          },
        })
      },
    })
    t.field("deleteServer", {
      type: "Server",
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.getCurrentUser()

        const server = await prisma.server.findUnique({
          where: { id: args.id },
        })

        if (!server) {
          throw new ApolloError("Server not found", "NOT_FOUND")
        }

        if (server.addedById !== user.id) {
          throw new ApolloError(
            "You cant remove someone elses server.",
            "UNAUTHORIZED"
          )
        }

        return prisma.server.delete({
          where: { id: args.id },
        })
      },
    })
  },
})
