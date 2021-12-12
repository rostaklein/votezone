import React, { useState } from "react"
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useCreateServerMutation } from "../generated/gql-client"

gql`
  mutation CreateServer($name: String!, $chronicle: ID!, $description: String) {
    createServer(
      name: $name
      chronicle: $chronicle
      description: $description
    ) {
      name
      description
      chronicle {
        name
      }
    }
  }
`

function CreateServer(props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [createDraft, { loading, error, data }] = useCreateServerMutation()

  return (
    <Layout>
      <form
        onSubmit={async e => {
          e.preventDefault()

          await createDraft({
            variables: {
              name: title,
              description: content,
              chronicle: "61b60df081e2da64ed048ac2",
            },
            onCompleted: data => {
              if (data.createServer?.__typename === "Server") {
                Router.push("/")
              }
            },
          })
        }}
      >
        <h1>Add Server</h1>
        <input
          autoFocus
          onChange={e => setTitle(e.target.value)}
          placeholder="Server Name"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={e => setContent(e.target.value)}
          placeholder="Description"
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Create" />
        <a className="back" href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </Layout>
  )
}

export default CreateServer
