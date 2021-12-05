import { ApolloError } from "apollo-server-micro"
import { mutationField, nonNull, stringArg } from "nexus"
import prisma from "../../../lib/prisma"
import { hashPwd } from "../auth/hashPassword"
import { issueToken } from "../auth/tokens"

export const loginMutation = mutationField("login", {
  type: "AuthPayload",
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args) => {
    const user = await prisma.user.findFirst({ where: { email: args.email } })

    if (!user) {
      throw new ApolloError("User not found", "USER_NOT_FOUND")
    }

    const hashedPwd = hashPwd(args.password)

    if (user.password !== hashedPwd) {
      throw new ApolloError("Password doesnt match", "WRONG_PASSWORD")
    }

    return {
      user,
      token: issueToken({ id: user.id }),
    }
  },
})
