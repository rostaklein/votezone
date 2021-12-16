import { ContentWrapper } from "../components/Layout"
import gql from "graphql-tag"
import { Icon, Spinner } from "@blueprintjs/core"
import styled from "styled-components"
import { ServersTable } from "../components/ServersTable"
import { useUpcomingServersQuery } from "../generated/gql-client"

gql`
  query UpcomingServers {
    upcomingServers {
      ...ServersTableData
    }
  }
`

const StyledMain = styled.main`
  flex: 1;
  overflow: auto;
`

const UpcomingServersPage = () => {
  const { loading, data } = useUpcomingServersQuery({
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
                icon="calendar"
                style={{ verticalAlign: "baseline", marginRight: 8 }}
                color="gray"
              />
              Upcoming servers
            </h2>
            {data?.upcomingServers && (
              <ServersTable
                servers={data.upcomingServers}
                lastColumn="opening"
              />
            )}
          </StyledMain>
        </>
      )}
    </ContentWrapper>
  )
}

export default UpcomingServersPage
