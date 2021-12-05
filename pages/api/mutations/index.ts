import { stringArg, nonNull, extendType } from "nexus"
import prisma from "../../../lib/prisma"
import { AuthPayload } from "../types/AuthPayload"
import { loginMutation } from "./login"
import { registerMutation } from "./register"

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nullable.field("deletePost", {
      type: "Post",
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.delete({
          where: { id: postId ?? undefined },
        })
      },
    })

    t.field("createDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail ?? undefined },
            },
          },
        })
      },
    })

    t.nullable.field("publish", {
      type: "Post",
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.update({
          where: { id: postId ?? undefined },
          data: { published: true },
        })
      },
    })
  },
})

export const AuthMutations = [registerMutation, loginMutation, AuthPayload]
