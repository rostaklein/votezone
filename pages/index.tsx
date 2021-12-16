import { ContentWrapper } from "../components/Layout"
import gql from "graphql-tag"
import { useMostVotedServersQuery } from "../generated/gql-client"
import { Icon, Spinner } from "@blueprintjs/core"
import styled from "styled-components"
import { ServersTable } from "../components/ServersTable"

gql`
  query MostVotedServers {
    mostVotedServers {
      ...ServersTableData
    }
  }
`

const StyledMain = styled.main`
  flex: 1;
  overflow: auto;
`

const MostVotedServersPage = () => {
  const { loading, data } = useMostVotedServersQuery({
    fetchPolicy: "cache-and-network",
  })

  return (
    <ContentWrapper centerContent={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <StyledMain>
            <h2 style={{ position: "sticky", left: 0 }}>
              <Icon
                icon="thumbs-up"
                style={{ verticalAlign: "baseline", marginRight: 8 }}
                color="gray"
              />
              Top Rated Servers
            </h2>
            {data?.mostVotedServers && (
              <ServersTable
                servers={data.mostVotedServers}
                lastColumn="votes"
              />
            )}
          </StyledMain>
        </>
      )}
    </ContentWrapper>
  )
}

export default MostVotedServersPage
