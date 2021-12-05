import { UserDetails, verifyToken } from "./auth/tokens"
import prisma from "../../lib/prisma"
import { PrismaClient } from "@prisma/client"
import { MicroRequest } from "apollo-server-micro/dist/types"

export type Context = {
  prisma: PrismaClient
  getCurrentUser: () => Promise<UserDetails>
}

export const createContext = async (
  request: MicroRequest
): Promise<Context> => {
  const token = request.headers.authorization?.replace("Bearer ", "")

  return { prisma, getCurrentUser: () => verifyToken(token) }
}
