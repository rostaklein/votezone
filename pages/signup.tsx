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

function Signup(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")

  const [signup] = useSignUpMutation()

  return (
    <Layout>
      <div>
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
          <h1>Signup user</h1>
          <InputGroup
            autoFocus
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
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
              <Button intent="primary" text="Signup" type="submit" fill />
            </Col>
            <Col sm={6}>
              <Button onClick={() => Router.push("/")} minimal fill>
                or Cancel
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }

        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Signup
