import { idArg, nonNull, objectType } from "nexus"
import prisma from "../../../lib/prisma"
import { getLastVote } from "../mutations/vote"

export { Me } from "./me"

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("approvedServers", {
      type: "Server",
      resolve: (_parent, _args) => {
        return prisma.server.findMany({
          where: { approved: true },
          orderBy: {
            createdAt: "desc",
          },
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
          server: {
            id: vote?.serverId,
          },
        }
      },
    })
  },
})
