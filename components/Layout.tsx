import styled from "styled-components"
import Header from "./Header"

const Wrapper = styled.div`
  padding: 0 24px;
`

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Layout: React.FC = props => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Header />
      </ContentWrapper>
      <ContentWrapper>{props.children}</ContentWrapper>
    </Wrapper>
  )
}

export default Layout
