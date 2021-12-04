import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("email")
    t.list.field("posts", {
      type: "Post",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .posts(),
    })
  },
})
