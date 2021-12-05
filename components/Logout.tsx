import { Button } from "@blueprintjs/core"
import Cookies from "js-cookie"
import { useAppDispatch } from "./context"

const Logout: React.FC = props => {
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    dispatch({ type: "SET_CURRENT_USER", user: null })
    Cookies.remove("auth-token")
  }

  return (
    <Button intent="none" minimal onClick={logOutHandler}>
      Logout
    </Button>
  )
}

export default Logout
