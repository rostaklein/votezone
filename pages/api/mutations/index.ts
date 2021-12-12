import { loginMutation } from "./login"
import { registerMutation } from "./register"
import { CreateServerInputType, ServerMutations } from "./servers/create"

export const Mutations = [
  registerMutation,
  loginMutation,
  ServerMutations,
  CreateServerInputType,
]
