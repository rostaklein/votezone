import { ApolloError } from "apollo-server-micro"
import { DateTime } from "luxon"
import { idArg, mutationField, nonNull } from "nexus"
import prisma from "../../../lib/prisma"

const getLastVote = async (ip: string) => {
  const twelveHoursAgo = DateTime.now().minus({ hours: 12 }).toJSDate()
  const vote = await prisma.vote.findFirst({
    where: { ip, createdAt: { gte: twelveHoursAgo } },
  })

  return vote
}

export const voteMutation = mutationField("vote", {
  type: "Vote",
  args: {
    server: nonNull(idArg()),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.getCurrentUser()

    if (typeof ctx.ip !== "string") {
      throw new ApolloError("Could not detect clients IP.", "INVALID_VOTE")
    }

    if (await getLastVote(ctx.ip)) {
      throw new ApolloError("You already voted from this IP", "VOTED_ALREADY")
    }

    const vote = await prisma.vote.create({
      data: {
        server: {
          connect: {
            id: args.server,
          },
        },
        votedBy: {
          connect: {
            id: user.id,
          },
        },
        ip: ctx.ip,
      },
    })

    return vote
  },
})
