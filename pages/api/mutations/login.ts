import { UserInputError } from "apollo-server-micro"
import { mutationField, nonNull, stringArg } from "nexus"
import prisma from "../../../lib/prisma"
import { hashPwd } from "./auth/hashPassword"

export const loginMutation = mutationField("login", {
  type: "User",
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args) => {
    const user = await prisma.user.findFirst({ where: { email: args.email } })
    console.log({ user })
    if (!user) {
      throw new UserInputError("User not found")
    }

    const hashedPwd = hashPwd(args.password)

    if (user.password !== hashedPwd) {
      throw new UserInputError("Password doesnt match")
    }

    return user
  },
})
