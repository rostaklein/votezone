import { ApolloError } from "apollo-server-micro"
import { stringArg, nonNull, extendType, idArg } from "nexus"
import prisma from "../../../../lib/prisma"

export const ServerMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createServer", {
      type: "Server",
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        chronicle: nonNull(idArg()),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.getCurrentUser()
        return prisma.server.create({
          data: {
            name: args.name,
            description: args.description,
            chronicle: { connect: { id: args.chronicle } },
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
