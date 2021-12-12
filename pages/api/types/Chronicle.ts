import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Chronicle = objectType({
  name: "Chronicle",
  definition(t) {
    t.string("id")
    t.string("name")
    t.string("shortcut")
  },
})
