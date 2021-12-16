import React, { useState } from "react"
import { ContentWrapper } from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { Button } from "@blueprintjs/core"
import { useSignUpMutation } from "../generated/gql-client"
import { Col, Row } from "react-grid-system"
import { StyledFormInput } from "../components/sharedStyles"

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
    <ContentWrapper centerContent>
      <Col xs={10} md={6}>
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
          <StyledFormInput
            autoFocus
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            className="mb-1"
            leftIcon="user"
            value={name}
          />
          <StyledFormInput
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
            leftIcon="envelope"
            value={email}
          />
          <StyledFormInput
            onChange={e => setPwd(e.target.value)}
            placeholder="Password"
            type="password"
            leftIcon="lock"
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
    </ContentWrapper>
  )
}

export default Register
