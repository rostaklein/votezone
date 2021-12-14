import { queryField } from "nexus"

export const Me = queryField("me", {
  type: "User",
  resolve: async (_, __, ctx) => {
    try {
      const userContext = await ctx.getCurrentUser()

      const user = await ctx.prisma.user.findFirst({
        where: { id: userContext.id },
      })

      if (!user) {
        throw new Error("User not found")
      }
      return user
    } catch (err) {
      return null
    }
  },
})
