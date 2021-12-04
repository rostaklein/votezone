import Grid from "hedron"
import React, { useState } from "react"
import Layout from "../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { Button, InputGroup } from "@blueprintjs/core"
import { useSignUpMutation } from "../generated/gql-client"

gql`
  mutation SignUp($name: String, $email: String!) {
    signupUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

function Signup(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [signup] = useSignUpMutation()

  return (
    <Layout>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()
            console.log("submit", name, email)

            await signup({
              variables: {
                name: name,
                email: email,
              },
            })
            Router.push("/")
          }}
        >
          <h1>Signup user</h1>
          <Grid.Provider>
            <Grid.Bounds direction="vertical">
              <Grid.Box>
                <InputGroup
                  autoFocus
                  onChange={e => setName(e.target.value)}
                  placeholder="Name"
                  type="text"
                  value={name}
                />
              </Grid.Box>
              <Grid.Box>
                <InputGroup
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  type="text"
                  value={email}
                />
              </Grid.Box>
              <Grid.Bounds>
                <Grid.Box width="half">
                  <Button intent="primary" text="Signup" type="submit" fill />
                </Grid.Box>
                <Grid.Box width="half">
                  <Button onClick={() => Router.push("/")} minimal fill>
                    or Cancel
                  </Button>
                </Grid.Box>
              </Grid.Bounds>
            </Grid.Bounds>
          </Grid.Provider>
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
