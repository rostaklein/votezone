import { idArg, nonNull, objectType } from "nexus"
import prisma from "../../../lib/prisma"
import { getLastVote } from "../mutations/vote"

export { Me } from "./me"

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.nonNull.field("upcomingServers", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: true, openingAt: { not: null, gte: new Date() } },
          orderBy: {
            openingAt: "asc",
          },
          take: 10,
        })
      },
    })
    t.list.nonNull.field("mostVotedServers", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: true },
          orderBy: {
            Vote: {
              _count: "desc",
            },
          },
          take: 10,
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

    t.field("voteStatus", {
      type: "VoteStatus",
      resolve: async (_, __, ctx) => {
        if (typeof ctx.ip !== "string") {
          return null
        }

        const vote = await getLastVote(ctx.ip)

        return {
          ip: ctx.ip,
          lastVotedAt: vote?.createdAt,
          votedAlready: Boolean(vote),
          server: vote
            ? {
                id: vote.serverId,
              }
            : null,
        }
      },
    })
  },
})
