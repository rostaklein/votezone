import { createHmac } from "crypto"

export const hashPwd = (plainPassword: string) => {
  return createHmac("sha256", process.env.SECRET)
    .update(plainPassword)
    .digest("hex")
}
