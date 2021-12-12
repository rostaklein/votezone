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
          },
        })
      },
    })
  },
})
