import { ApolloError } from "apollo-server-micro"
import { MicroRequest } from "apollo-server-micro/dist/types"
import axios from "axios"

type RecaptchaResponse = {
  success: boolean
  hostname: string
  score: number
  action: string
}

export const verifyCaptcha = async (req: MicroRequest): Promise<void> => {
  if (process.env.SKIP_RECAPTCHA === "true") {
    return
  }
  try {
    const captchaToken = req.headers["x-recaptcha-token"]
    if (!process.env.RECAPTCHA_KEY) {
      throw new Error("Recaptcha secret key not set")
    }
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${captchaToken}`
    const { data } = await axios.get<RecaptchaResponse>(verificationUrl)

    if (!data.success) {
      throw new Error("Captcha response didnt succeed.")
    }
  } catch (err) {
    console.error("err", err)
    throw new ApolloError("Recaptcha verification failed.", "CAPTCHA_FAILED")
  }
}
