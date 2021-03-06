import { objectType } from "nexus"

export const VoteStatus = objectType({
  name: "VoteStatus",
  definition(t) {
    t.string("ip")
    t.boolean("votedAlready")
    t.date("lastVotedAt")
    t.field("server", { type: "Server" })
  },
})
