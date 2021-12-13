import React, { useReducer, useContext } from "react"
import { MeQuery, MeQueryResult } from "../../generated/gql-client"

export type ActionTypes = "SET_CURRENT_USER"

type ActionBase = {
  type: ActionTypes
}

interface SetCurrentUser extends ActionBase {
  type: "SET_CURRENT_USER"
  user: MeQuery["me"] | null
}

export type Action = SetCurrentUser

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      return {
        ...state,
        currentUser: action.user,
      }
    }
    default:
      return state
  }
}

export type AppState = {
  currentUser: MeQuery["me"] | null
  ip?: string
}

type Context = {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppContext = React.createContext<Context | undefined>(undefined)

export const defaultState: AppState = {
  currentUser: null,
  ip: undefined,
}

type Props = {
  me: MeQuery["me"] | null
  ip?: string
}

export const AppContextProvider: React.FC<Props> = ({ children, me, ip }) => {
  const [state, dispatch] = useReducer(reducer, { currentUser: me, ip })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("App context not defined while accessing it")
  }

  return context
}

export const useAppState = () => useAppContext().state
export const useAppDispatch = () => useAppContext().dispatch
