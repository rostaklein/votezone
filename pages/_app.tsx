import {
  ApolloClient,
  ApolloProvider,
  ApolloQueryResult,
  gql,
  InMemoryCache,
} from "@apollo/client"
import cookie from "cookie"
import { AppContext, AppProps } from "next/app"
import { MeQuery } from "../generated/gql-client"
import { AppContextProvider } from "../components/context"
import { GlobalStyle } from "../components/globalStyles"
import Head from "next/head"
import Layout from "../components/Layout"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "same-origin",
})

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      addedServers {
        id
        name
        createdAt
      }
    }
  }
`

type Props = {
  me: ApolloQueryResult<MeQuery> | null
  ip?: string
}

const MyApp = ({ Component, pageProps, me, ip }: AppProps & Props) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>votezone</title>
        <meta
          property="og:title"
          content="Lineage 2 Toplist Server | VOTEZONE"
          key="title"
        />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>
      <GlobalStyle />
      <AppContextProvider me={me?.data.me ?? null} ip={ip}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<Props> => {
  const { req } = appContext.ctx

  const cookies = cookie.parse(req?.headers["cookie"] ?? "")

  const ip = (req?.headers["x-real-ip"] ?? req?.socket.remoteAddress) as
    | string
    | undefined

  const authHeader = cookies["auth-token"]

  const me = await client
    .query<MeQuery>({
      query: ME_QUERY,
      context: { headers: { Authorization: `Bearer ${authHeader}` } },
    })
    .catch(err => {
      console.error("Could not get current user", err)
      return null
    })

  return { me: me, ip }
}

export default MyApp
