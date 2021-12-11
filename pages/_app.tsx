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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_API_URL,
})

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

type Props = {
  me: ApolloQueryResult<MeQuery> | null
}

const MyApp = ({ Component, pageProps, me }: AppProps & Props) => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <AppContextProvider me={me?.data.me ?? null}>
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<Props> => {
  const { req } = appContext.ctx

  const cookies = cookie.parse(req?.headers["cookie"] ?? "")

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

  return { me: me }
}

export default MyApp
