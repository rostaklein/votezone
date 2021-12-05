import * as jwt from "jsonwebtoken"

export type UserDetails = {
  id: string
}

export const issueToken = (userDetails: UserDetails): string => {
  if (!process.env.CLIENT_SECRET) {
    throw new Error("No client secret provided in ENV.")
  }
  return jwt.sign(userDetails, process.env.CLIENT_SECRET, {
    expiresIn: 43200, // expires in 12 hours
  })
}

export const verifyToken = (token: string | undefined): Promise<UserDetails> =>
  new Promise((resolve, reject) => {
    if (!process.env.CLIENT_SECRET) {
      throw new Error("No client secret provided in ENV.")
    }
    if (!token) {
      throw new Error("No token provided")
    }
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return reject(err)
      }

      const userDetails = decoded as UserDetails
      resolve(userDetails)
    })
  })
