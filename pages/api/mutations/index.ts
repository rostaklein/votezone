import { loginMutation } from "./login"
import { registerMutation } from "./register"
import { CreateServerInputType, ServerMutations } from "./servers/create"
import { voteMutation } from "./vote"

export const Mutations = [
  registerMutation,
  loginMutation,
  ServerMutations,
  CreateServerInputType,
  voteMutation,
]
