import { Button } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { Col, Row } from "react-grid-system"
import { useAppState } from "./context"
import Logout from "./Logout"

const Header = () => {
  const router = useRouter()
  const { currentUser } = useAppState()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  return (
    <nav style={{ marginTop: 16 }}>
      <Row>
        <Col sm={8}>
          <Link href="/" passHref>
            <Button outlined>Home</Button>
          </Link>{" "}
          <Link href="/drafts" passHref>
            <Button outlined>Drafts</Button>
          </Link>
        </Col>
        <Col sm={4} style={{ textAlign: "right" }}>
          {currentUser?.name ? (
            <>
              <h4>
                Welcome {currentUser.name} <Logout />
              </h4>
              <Link href="/create" passHref>
                <Button intent="primary">+ Create draft </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <Button outlined={isActive("/register")}>Register</Button>
              </Link>{" "}
              <Link href="/login" passHref>
                <Button outlined={isActive("/login")}>Log In</Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
    </nav>
  )
}

export default Header
