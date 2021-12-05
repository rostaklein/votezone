import * as Path from "path"
import { ApolloServer } from "apollo-server-micro"
import { DateTimeResolver } from "graphql-scalars"
import { NextApiHandler } from "next"
import { asNexusMethod, makeSchema, objectType } from "nexus"
import path from "path"
import cors from "micro-cors"
import prisma from "../../lib/prisma"
import { User } from "./types/User"
import { AuthMutations, Mutation } from "./mutations"
import { Query, Me } from "./queries"
import { MicroRequest } from "apollo-server-micro/dist/types"
import { createContext } from "./context"

export const GQLDate = asNexusMethod(DateTimeResolver, "date")

const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id")
    t.string("title")
    t.nullable.string("content")
    t.boolean("published")
    t.nullable.field("author", {
      type: "User",
      resolve: parent =>
        prisma.post
          .findUnique({
            where: { id: parent.id ?? undefined },
          })
          .author(),
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, User, GQLDate, Me, ...AuthMutations],
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
  contextType: {
    module: Path.join(__dirname, "./context.ts"),
    alias: "Context",
    export: "Context",
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({
  schema,
  context: (params: { req: MicroRequest }) => createContext(params.req),
})

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    })
  }

  return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === "OPTIONS") {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
