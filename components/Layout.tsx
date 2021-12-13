import { Classes, Icon, Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import Link from "next/link"
import { Container, Hidden, Row } from "react-grid-system"
import styled from "styled-components"
import Header from "./Header"

const Wrapper = styled.div`
  padding: 0 24px;
`

const TopHeaderWrapper = styled.div`
  background-color: #1e1e1e;
  padding: 4px 0;
  color: #787878;
  font-size: 13px;
`

const WidthWrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`

const Footer = styled.footer`
  padding: 0 24px;
  margin: 24px auto;
  text-align: center;
  color: #787878;
  font-size: 13px;
  > span {
    color: #adadad;
    margin: 0 6px;
  }
`

const BodyWrapper = styled(WidthWrapper)`
  background: #ededed94;
  border-radius: 6px;
  border: solid 1px #dedede;
  display: flex;
  box-shadow: 0 5px 10px #dbdbdb;
`

const StyledMenu = styled(Menu)`
  background: transparent;
  border-right: solid 1px #dedede;
  box-shadow: inset -5px 0 7px #dcdcdc80;
  padding: 8px 12px;
  margin-right: 4px;
`

const ContentWrapper = styled.main<Props>`
  padding: 0 24px 32px 24px;
  flex: 1;
  @media only screen and (min-width: 768px) {
    min-height: 400px;
  }

  display: flex;
  align-items: ${({ centerContent }) => centerContent && "center"};
  justify-content: ${({ centerContent }) => centerContent && "center"};
`

type Props = {
  centerContent?: boolean
}

const Layout: React.FC<Props> = props => {
  return (
    <>
      <TopHeaderWrapper>
        <WidthWrapper>
          The honest vote portal without thousands flashing GIFs
        </WidthWrapper>
      </TopHeaderWrapper>
      <Wrapper>
        <WidthWrapper>
          <Header />
        </WidthWrapper>
        <BodyWrapper>
          <Hidden sm xs>
            <StyledMenu>
              <MenuDivider title="Servers" />
              <Link href="/" passHref>
                <MenuItem icon="chart" text="Top Rated" />
              </Link>
              <MenuDivider />
              <MenuItem icon="calendar" text="Upcoming Servers" />
              <MenuItem icon="filter" text="Find Server" />
              <Link href="/create" passHref>
                <MenuItem icon="new-link" text="Add Server" />
              </Link>
              <MenuDivider title="Users" />
              <Link href="/register" passHref>
                <MenuItem icon="new-person" text="Register" />
              </Link>
              <Link href="/login" passHref>
                <MenuItem icon="log-in" text="Log In" />
              </Link>
            </StyledMenu>
          </Hidden>
          <ContentWrapper {...props}>{props.children}</ContentWrapper>
        </BodyWrapper>
      </Wrapper>
      <Footer>
        Made with love in 🇨🇿 <span>|</span> © VOTEZONE{" "}
        {new Date().getFullYear()}
      </Footer>
    </>
  )
}

export default Layout
