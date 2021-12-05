import { createHmac } from "crypto"

export const hashPwd = (plainPassword: string) => {
  if (!process.env.SECRET) {
    throw new Error("Missing secret to hash password")
  }
  return createHmac("sha256", process.env.SECRET)
    .update(plainPassword)
    .digest("hex")
}
