import { Button } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { Col, Row } from "react-grid-system"
import { useAppState } from "./context"
import Logout from "./Logout"
import styled from "styled-components"

const AuthButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
  > button {
    margin-left: 8px;
  }
`

const Header = () => {
  const router = useRouter()
  const { currentUser } = useAppState()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  return (
    <nav style={{ marginTop: 16 }}>
      <Row>
        <Col>
          <Link href="/" passHref>
            <a>
              <Image
                src="/votezone_logo.svg"
                alt="Votezone logo"
                height={80}
                width={160}
                layout="fixed"
              />
            </a>
          </Link>
        </Col>
        <Col>
          <AuthButtonsWrapper>
            {currentUser?.name ? (
              <>
                <h4>
                  Welcome {currentUser.name} <Logout />
                </h4>
                <Link href="/create" passHref>
                  <Button intent="primary">Add new server</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/register" passHref>
                  <Button outlined={isActive("/register")}>Register</Button>
                </Link>
                <Link href="/login" passHref>
                  <Button outlined={isActive("/login")} icon="log-in">
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </AuthButtonsWrapper>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/" passHref>
            <Button outlined>Home</Button>
          </Link>{" "}
          <Link href="/drafts" passHref>
            <Button outlined>Drafts</Button>
          </Link>
        </Col>
      </Row>
    </nav>
  )
}

export default Header
