import { UserInputError } from "apollo-server-micro"
import { mutationField, nonNull, stringArg } from "nexus"
import prisma from "../../../lib/prisma"
import { hashPwd } from "../auth/hashPassword"

export const registerMutation = mutationField("register", {
  type: "User",
  args: {
    name: stringArg(),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args) => {
    const userExists = await prisma.user.findFirst({
      where: { email: args.email },
    })

    if (userExists) {
      throw new UserInputError("User with this email already exists")
    }

    const hashedPwd = hashPwd(args.password)

    const user = await prisma.user.create({
      data: { email: args.email, name: args.name, password: hashedPwd },
    })

    return user
  },
})
