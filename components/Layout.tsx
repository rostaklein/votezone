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

const ContentWrapper = styled.div`
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

const BodyWrapper = styled(ContentWrapper)`
  background: #ededed94;
  border-radius: 6px;
  border: solid 1px #dedede;
  padding: 0 24px 24px 24px;
`

const Layout: React.FC = props => {
  return (
    <>
      <TopHeaderWrapper>
        <ContentWrapper>
          The honest vote portal without thousands flashing GIFs
        </ContentWrapper>
      </TopHeaderWrapper>
      <Wrapper>
        <ContentWrapper>
          <Header />
        </ContentWrapper>
        <BodyWrapper>{props.children}</BodyWrapper>
      </Wrapper>
      <Footer>
        Made with love in 🇨🇿 <span>|</span> © VOTEZONE{" "}
        {new Date().getFullYear()}
      </Footer>
    </>
  )
}

export default Layout
