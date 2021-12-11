import { UserDetails, verifyToken } from "./auth/tokens"
import prisma from "../../lib/prisma"
import { PrismaClient } from "@prisma/client"
import { MicroRequest } from "apollo-server-micro/dist/types"
import cookie from "cookie"

export type Context = {
  prisma: PrismaClient
  getCurrentUser: () => Promise<UserDetails>
}

export const createContext = async (
  request: MicroRequest
): Promise<Context> => {
  const tokenFromAuth = request.headers.authorization?.replace("Bearer ", "")
  const parsedCookies = cookie.parse(request.headers.cookie ?? "")
  const tokenFromCookies = parsedCookies["auth-token"]

  return {
    prisma,
    getCurrentUser: () => verifyToken(tokenFromAuth ?? tokenFromCookies),
  }
}
