import { Hidden } from "react-grid-system"
import styled from "styled-components"
import Header from "./Header"
import { Menu } from "./Menu"

const Wrapper = styled.div`
  padding: 0 12px;
  @media only screen and (min-width: 768px) {
    padding: 0 24px;
  }
`

const TopHeaderWrapper = styled.div`
  background-color: #1e1e1e;
  padding: 4px 12px;
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

export const ContentWrapper = styled.main<Props>`
  padding: 0 12px 24px 12px;

  overflow: hidden;
  position: relative;
  flex: 1;
  @media only screen and (min-width: 768px) {
    min-height: 400px;
    padding: 0 24px 32px 24px;
  }

  display: flex;
  flex-direction: column;
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
          <Menu />
          {props.children}
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
