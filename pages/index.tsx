import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useApprovedServersQuery } from "../generated/gql-client"
import { Button, HTMLTable } from "@blueprintjs/core"
import { Col, Row } from "react-grid-system"

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
    <Layout>
      <div className="page">
        <h1>Server list</h1>
        <main>
          <HTMLTable bordered condensed>
            <thead>
              <tr>
                <th>Server</th>
                <th>Chronicle</th>
                <th>Rates</th>
                <th>Grand Opening</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.approvedServers?.map(
                server =>
                  server && (
                    <tr key={server?.id}>
                      <td>
                        <b>{server.name}</b>
                      </td>
                      <td>{server.chronicle?.shortcut}</td>
                      <td>
                        {server.rates && (
                          <Row gutterWidth={6}>
                            {["XP", "SP", "Adena", "Drop", "Spoil"].map(
                              rate => (
                                <Col key={rate}>
                                  <div style={{ fontSize: 12 }}>{rate}</div>
                                  {server.rates![rate.toLowerCase()]}x
                                </Col>
                              )
                            )}
                          </Row>
                        )}
                      </td>
                      <td>
                        {server.openingAt &&
                          new Date(server.openingAt).toLocaleString()}
                      </td>
                      <td>
                        <Link
                          href="/detail/[id]"
                          as={`/detail/${server.id}`}
                          passHref
                        >
                          <Button minimal small>
                            Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </HTMLTable>
        </main>
      </div>
    </Layout>
  )
}

export default Homepage
