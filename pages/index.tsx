import Layout, { ContentWrapper } from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useApprovedServersQuery } from "../generated/gql-client"
import { Button, HTMLTable, Icon, Tag, Tooltip } from "@blueprintjs/core"
import { Col, Container, Row } from "react-grid-system"
import { DateTime } from "luxon"
import styled from "styled-components"

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
        shortcut
        name
      }
      rates {
        xp
        sp
        adena
        drop
        spoil
      }
      openingAt
      createdAt
    }
  }
`
const StyledServerNameTd = styled.td``

const StyledTr = styled.tr``

const StyledTable = styled(HTMLTable)`
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
  const { loading, error, data } = useApprovedServersQuery({
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <ContentWrapper>
      <Container>
        <h2>
          <Icon
            icon="calendar"
            style={{ verticalAlign: "baseline", marginRight: 8 }}
            color="gray"
          />
          Newest servers
        </h2>
        <main>
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
                        {server.rates && (
                          <Row gutterWidth={6}>
                            {["XP", "SP", "Adena", "Drop", "Spoil"].map(
                              rate => (
                                <Col key={rate}>
                                  <div
                                    style={{ fontSize: 11, fontWeight: "bold" }}
                                  >
                                    {rate}
                                  </div>
                                  <Tag minimal>
                                    {server.rates![rate.toLowerCase()]}x
                                  </Tag>
                                </Col>
                              )
                            )}
                          </Row>
                        )}
                      </td>
                      <td>
                        <Tooltip
                          content={DateTime.fromISO(server.openingAt).toFormat(
                            "DDD TTT"
                          )}
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
        </main>
      </Container>
    </ContentWrapper>
  )
}

export default Homepage
