import { loginMutation } from "./login"
import { registerMutation } from "./register"
import { ServerMutations } from "./servers/create"

export const Mutations = [registerMutation, loginMutation, ServerMutations]
