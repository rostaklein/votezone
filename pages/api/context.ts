import { UserDetails, verifyToken } from "./auth/tokens"
import prisma from "../../lib/prisma"
import { PrismaClient } from "@prisma/client"
import { MicroRequest } from "apollo-server-micro/dist/types"
import cookie from "cookie"

export type Context = {
  prisma: PrismaClient
  getCurrentUser: () => Promise<UserDetails>
  ip: string | string[] | undefined
  request: MicroRequest
}

export const createContext = async (
  request: MicroRequest
): Promise<Context> => {
  const tokenFromAuth = request.headers.authorization?.replace("Bearer ", "")
  const parsedCookies = cookie.parse(request.headers.cookie ?? "")
  const tokenFromCookies = parsedCookies["auth-token"]

  const ip = request.headers["x-real-ip"] ?? request.socket.remoteAddress

  return {
    prisma,
    getCurrentUser: () => verifyToken(tokenFromAuth ?? tokenFromCookies),
    ip,
    request,
  }
}
