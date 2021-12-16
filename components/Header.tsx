import { Button, Classes, Spinner, Tag } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { Col, Container, Row, Visible } from "react-grid-system"
import { useAppState } from "./context"
import styled from "styled-components"
import { useVoteStatusQuery } from "../generated/gql-client"
import { useMemo } from "react"
import { MobileMenu } from "./Menu"

const StyledNav = styled.nav`
  margin: 32px 0;
  padding: 0 16px;
`

const VotedWrapper = styled.div`
  text-align: right;
  @media only screen and (max-width: 572px) {
    text-align: center;
  }
`

const Header = () => {
  const { data, loading } = useVoteStatusQuery({ fetchPolicy: "cache-first" })
  const { currentUser, ip } = useAppState()

  const status = useMemo(() => {
    if (loading) {
      return (
        <Tag intent="success" icon="tick" className={Classes.SKELETON}>
          not
        </Tag>
      )
    }

    if (data?.voteStatus?.votedAlready) {
      return (
        <Tag intent="success" icon="tick">
          already
        </Tag>
      )
    }

    return <Tag intent="warning">not</Tag>
  }, [data?.voteStatus?.votedAlready, loading])

  return (
    <StyledNav>
      <Row align="center">
        <Col xs={8} sm={6}>
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
        <Visible xs>
          <Col xs={4}>
            <MobileMenu />
          </Col>
        </Visible>
        <Col xs={12} sm={6}>
          <VotedWrapper>
            Hello <b>{currentUser?.name ? currentUser?.name : "Anonymous"}</b>{" "}
            from <Tag minimal>{ip}</Tag>.
            <br />
            You have {status} voted today yet.
          </VotedWrapper>
        </Col>
      </Row>
    </StyledNav>
  )
}

export default Header
