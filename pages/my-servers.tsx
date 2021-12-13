import React from "react"
import { ContentWrapper } from "../components/Layout"
import { useAppState } from "../components/context"
import { useMeQuery } from "../generated/gql-client"
import { Classes, Spinner } from "@blueprintjs/core"

function MyServersPage() {
  const { currentUser } = useAppState()
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" })
  if (!currentUser) {
    return (
      <ContentWrapper centerContent>
        <h1>You are not logged in.</h1>
      </ContentWrapper>
    )
  }
  return (
    <ContentWrapper>
      <h1>My Severs</h1>
      {loading ? (
        <div className={Classes.SKELETON}>
          <Spinner />
        </div>
      ) : (
        data?.me?.addedServers?.map(server => (
          <p key={server?.id}>{JSON.stringify(server)}</p>
        ))
      )}
    </ContentWrapper>
  )
}

export default MyServersPage
