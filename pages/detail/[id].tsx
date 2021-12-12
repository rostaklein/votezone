import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import {
  useDeleteServerMutation,
  useServerQuery,
} from "../../generated/gql-client"

gql`
  query Server($serverId: ID!) {
    server(id: $serverId) {
      id
      chronicle {
        name
      }
      addedBy {
        name
      }
      description
      createdAt
      name
    }
  }
`

gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(id: $serverId) {
      id
    }
  }
`

function ServerDetail() {
  const serverId = useRouter().query.id as string
  const { loading, error, data } = useServerQuery({
    variables: { serverId },
  })

  const [deleteServer] = useDeleteServerMutation()

  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const authorName = data?.server?.addedBy?.name ?? "Unknown author"
  return (
    <Layout>
      <h2>{data?.server?.name}</h2>
      <p>By {authorName}</p>
      <p>Chronicle: {data?.server?.chronicle?.name}</p>
      <p>{data?.server?.description}</p>
      <button
        onClick={async e => {
          await deleteServer({
            variables: {
              serverId,
            },
          })
          Router.push("/")
        }}
      >
        Delete
      </button>
    </Layout>
  )
}

export default ServerDetail
