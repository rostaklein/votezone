import { Row, Col } from "react-grid-system"
import React from "react"
import Layout from "../components/Layout"
import { LoginForm } from "../components/login/LoginForm"

function LoginPage() {
  return (
    <Layout centerContent>
      <Col sm={8} md={6}>
        <LoginForm />
      </Col>
    </Layout>
  )
}

export default LoginPage
