import { Row, Col } from "react-grid-system"
import React from "react"
import Layout from "../components/Layout"
import { LoginForm } from "../components/login/LoginForm"

function LoginPage() {
  return (
    <Layout>
      <Row>
        <Col sm={6} md={4} offset={{ sm: 3, md: 4 }}>
          <LoginForm />
        </Col>
      </Row>
    </Layout>
  )
}

export default LoginPage
