import React, { useState } from "react"
import Layout from "../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { Button, InputGroup } from "@blueprintjs/core"
import { useSignUpMutation } from "../generated/gql-client"
import { Col, Container, Row } from "react-grid-system"

gql`
  mutation SignUp($name: String, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`

function Register(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")

  const [signup] = useSignUpMutation()

  return (
    <Layout>
      <Row>
        <Col sm={6} md={4} offset={{ sm: 3, md: 4 }}>
          <form
            onSubmit={async e => {
              e.preventDefault()

              await signup({
                variables: {
                  name: name,
                  email: email,
                  password: pwd,
                },
              })
              Router.push("/")
            }}
          >
            <h1>Register</h1>
            <InputGroup
              autoFocus
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              type="text"
              className="mb-1"
              value={name}
            />
            <InputGroup
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              type="text"
              value={email}
            />
            <InputGroup
              onChange={e => setPwd(e.target.value)}
              placeholder="Password"
              type="password"
              value={pwd}
            />
            <Row>
              <Col sm={6}>
                <Button intent="primary" text="Register" type="submit" fill />
              </Col>
              <Col sm={6}>
                <Button onClick={() => Router.push("/")} minimal fill>
                  or Cancel
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Layout>
  )
}

export default Register
