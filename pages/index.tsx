import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useApprovedServersQuery } from "../generated/gql-client"

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
          {data?.approvedServers?.map(
            server =>
              server && (
                <Link
                  key={server?.id}
                  href="/detail/[id]"
                  as={`/detail/${server.id}`}
                >
                  <a>
                    <h2>{server.name}</h2>
                    <small>
                      By {server.addedBy?.name} | {server.chronicle?.shortcut}
                    </small>
                  </a>
                </Link>
              )
          )}
        </main>
      </div>
    </Layout>
  )
}

export default Homepage
