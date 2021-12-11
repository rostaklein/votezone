import Cookies from "js-cookie"
import { Container, Row, Col } from "react-grid-system"
import React, { useState } from "react"
import Layout from "../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { Formik, FormikErrors, useFormik } from "formik"
import { Button, InputGroup } from "@blueprintjs/core"
import { useLoginMutation, useSignUpMutation } from "../generated/gql-client"
import { ApolloError } from "@apollo/client"
import { useAppDispatch } from "../components/context"

gql`
  mutation Login($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      user {
        id
        name
        email
      }
      token
    }
  }
`

type FormValues = {
  username: string
  password: string
}

function Login(props) {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const { errors, handleSubmit, values, handleChange, setErrors, touched } =
    useFormik<FormValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validate: values => {
        const errors: FormikErrors<FormValues> = {}
        if (!values.password) {
          errors.password = "Password required"
        }
        if (!values.username) {
          errors.username = "Username required"
        }
        return errors
      },
      onSubmit: async ({ username, password }) => {
        try {
          const result = await login({
            variables: { loginEmail: username, loginPassword: password },
          })
          if (result.data?.login) {
            dispatch({
              type: "SET_CURRENT_USER",
              user: result.data.login.user,
            })
            if (result.data.login.token) {
              Cookies.set("auth-token", result.data.login.token)
            }
          }
        } catch (err) {
          if (err instanceof ApolloError) {
            if (err.graphQLErrors[0].extensions?.code === "USER_NOT_FOUND") {
              setErrors({
                username: "User not found",
              })
            }
            if (err.graphQLErrors[0].extensions?.code === "WRONG_PASSWORD") {
              setErrors({
                password: "Invalid password",
              })
            }
          }
        }
      },
    })

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <InputGroup
          autoFocus
          name="username"
          onChange={handleChange}
          placeholder="Name"
          type="text"
          value={values.username}
        />

        <InputGroup
          onChange={handleChange}
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
        />
        {touched.password && Object.keys(errors).length > 0 && (
          <div>{errors.password || errors.username}</div>
        )}
        <Row>
          <Col md={6}>
            <Button intent="primary" text="Log In" type="submit" fill />
          </Col>
          <Col md={6}>
            <Button onClick={() => Router.push("/")} minimal fill>
              or Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </Layout>
  )
}

export default Login
