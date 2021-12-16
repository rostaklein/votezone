import { Col } from "react-grid-system"
import React from "react"
import { ContentWrapper } from "../components/Layout"
import { LoginForm } from "../components/login/LoginForm"

function LoginPage() {
  return (
    <ContentWrapper centerContent>
      <Col xs={10} md={6}>
        <LoginForm />
      </Col>
    </ContentWrapper>
  )
}

export default LoginPage
