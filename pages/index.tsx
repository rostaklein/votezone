import { ContentWrapper } from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useApprovedServersQuery } from "../generated/gql-client"
import {
  Button,
  HTMLTable,
  Icon,
  Spinner,
  Tag,
  Tooltip,
} from "@blueprintjs/core"
import { DateTime } from "luxon"
import styled from "styled-components"
import { Rates } from "../components/Rates"

gql`
  query ApprovedServers {
    approvedServers {
      id
      name
      description
      addedBy {
        name
      }
      chronicle {
        id
        shortcut
        name
      }
      rates {
        ...Rates
      }
      openingAt
      createdAt
    }
  }
`
const StyledMain = styled.main`
  flex: 1;
  overflow: auto;
`
const StyledServerNameTd = styled.td``

const StyledTr = styled.tr``

const StyledTable = styled(HTMLTable)`
  width: 100%;
  min-width: 600px;
  ${StyledTr} {
    td {
      vertical-align: middle;
    }
    > ${StyledServerNameTd} {
      max-width: 180px;
      vertical-align: middle;
      button {
        padding-top: 6px;
        padding-bottom: 6px;
      }
    }
  }
`

const Homepage = () => {
  const { loading, data } = useApprovedServersQuery({
    fetchPolicy: "cache-and-network",
  })

  return (
    <ContentWrapper centerContent={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <StyledMain>
            <h2>
              <Icon
                icon="calendar"
                style={{ verticalAlign: "baseline", marginRight: 8 }}
                color="gray"
              />
              Newest servers
            </h2>
            <StyledTable bordered condensed>
              <thead>
                <StyledTr>
                  <th></th>
                  <StyledServerNameTd as="th">Server</StyledServerNameTd>
                  <th>Rates</th>
                  <th>Grand Opening</th>
                </StyledTr>
              </thead>
              <tbody>
                {data?.approvedServers?.map(
                  (server, i) =>
                    server && (
                      <StyledTr key={server?.id}>
                        <td>{i + 1}.</td>
                        <StyledServerNameTd>
                          <Link
                            href="/detail/[id]"
                            as={`/detail/${server.id}`}
                            passHref
                          >
                            <Button minimal small>
                              <b>{server.name}</b>{" "}
                              <Tag
                                minimal
                                title={server.chronicle?.name ?? undefined}
                              >
                                {server.chronicle?.shortcut}
                              </Tag>
                            </Button>
                          </Link>
                        </StyledServerNameTd>
                        <td>
                          {server.rates && <Rates rates={server.rates} />}
                        </td>
                        <td>
                          <Tooltip
                            content={DateTime.fromISO(
                              server.openingAt
                            ).toFormat("DDD TTT")}
                            placement="right"
                          >
                            <span style={{ fontSize: 12 }}>
                              {server.openingAt &&
                                DateTime.fromISO(
                                  server.openingAt
                                ).toRelativeCalendar()}
                            </span>
                          </Tooltip>
                        </td>
                      </StyledTr>
                    )
                )}
              </tbody>
            </StyledTable>
          </StyledMain>
        </>
      )}
    </ContentWrapper>
  )
}

export default Homepage
