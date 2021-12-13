import { Col } from "react-grid-system"
import React from "react"
import { ContentWrapper } from "../components/Layout"
import { LoginForm } from "../components/login/LoginForm"
import { useAppState } from "../components/context"

function ProfilePage() {
  const { currentUser } = useAppState()
  if (!currentUser) {
    return (
      <ContentWrapper centerContent>
        <h1>You are not logged in.</h1>
      </ContentWrapper>
    )
  }
  return (
    <ContentWrapper centerContent>
      <h1>Hello {currentUser.name}</h1>
      <p>ID: {currentUser.id}</p>
      <p>Email: {currentUser.email}</p>
    </ContentWrapper>
  )
}

export default ProfilePage
