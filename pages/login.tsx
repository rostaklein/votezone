import Cookies from "js-cookie"
import Grid from "hedron"
import React, { useState } from "react"
import Layout from "../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { Formik, FormikErrors, useFormik } from "formik"
import { Button, InputGroup } from "@blueprintjs/core"
import { useLoginMutation, useSignUpMutation } from "../generated/gql-client"
import { ApolloError } from "@apollo/client"
import { useAppDispatch } from "./context"

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
        <Grid.Provider>
          <Grid.Bounds direction="vertical">
            <Grid.Box>
              <InputGroup
                autoFocus
                name="username"
                onChange={handleChange}
                placeholder="Name"
                type="text"
                value={values.username}
              />
            </Grid.Box>
            <Grid.Box>
              <InputGroup
                onChange={handleChange}
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
              />
            </Grid.Box>
            {touched.password && Object.keys(errors).length > 0 && (
              <Grid.Box>{errors.password || errors.username}</Grid.Box>
            )}
            <Grid.Bounds>
              <Grid.Box width="half">
                <Button intent="primary" text="Log In" type="submit" fill />
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
    </Layout>
  )
}

export default Login
