import { Button, Tag } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { Col, Row } from "react-grid-system"
import { useAppState } from "./context"
import styled from "styled-components"

const StyledNav = styled.nav`
  margin: 32px 0;
`

const VotedWrapper = styled.div`
  text-align: right;
`

const Header = () => {
  const router = useRouter()
  const { currentUser } = useAppState()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  return (
    <StyledNav>
      <Row align="center">
        <Col xs={12} sm={6}>
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
        <Col xs={12} sm={6}>
          <VotedWrapper>
            Hello <b>Anonymous</b> from <Tag minimal>256.12.18.45</Tag>.
            <br />
            You have <Tag intent="warning">not</Tag> voted today yet.
          </VotedWrapper>
        </Col>
      </Row>
    </StyledNav>
  )
}

export default Header
