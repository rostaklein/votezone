import Layout, { ContentWrapper } from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import {
  useDeleteServerMutation,
  useServerQuery,
} from "../../generated/gql-client"
import { useAppState } from "../../components/context"
import { Button, Classes, Tag } from "@blueprintjs/core"
import Link from "next/link"
import { Row, Col } from "react-grid-system"
import Image from "next/image"
import styled from "styled-components"
import { Rates } from "../../components/Rates"
import { VoteForServer } from "../../components/VoteForServer"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

gql`
  query Server($serverId: ID!) {
    server(id: $serverId) {
      id
      chronicle {
        id
        name
      }
      addedBy {
        id
        name
      }
      rates {
        ...Rates
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

const DetailWrapper = styled.div`
  flex: 1;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`
const OverImageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  &:after {
    content: "";
    height: 70%;
    background: linear-gradient(0, #000000b0, transparent);
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
`
const OverImageContentWrapper = styled(ContentWrapper)`
  padding-top: 16px;
  padding-bottom: 24px;
  min-height: 0;
  align-items: start;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`

const ServerNameWrapper = styled.div`
  justify-self: end;
  > h1 {
    margin-bottom: 0;
    color: white;
    text-shadow: 0 0 10px black;
  }
`

function ServerDetail() {
  const serverId = useRouter().query.id as string
  const { currentUser } = useAppState()
  const { loading, data } = useServerQuery({
    variables: { serverId },
    fetchPolicy: "cache-first",
  })

  const [deleteServer] = useDeleteServerMutation()

  const authorName = data?.server?.addedBy?.name ?? "Unknown author"

  const loadingComponent = {
    className: loading ? Classes.SKELETON : "",
    children: "loading",
    style: {
      display: "block",
    },
  }
  return (
    <DetailWrapper>
      <ImageWrapper>
        <Image
          src="https://i.imgur.com/l7a7Nh2.jpg"
          layout="fill"
          alt="Server Cover Image"
          quality="100"
          objectFit="cover"
        />
        <OverImageWrapper>
          <OverImageContentWrapper as="div">
            <Button minimal onClick={() => Router.back()} icon="arrow-left">
              Back
            </Button>
            <div style={{ alignSelf: "center" }}>
              <GoogleReCaptchaProvider reCaptchaKey="6Le0gqUdAAAAAB2_wBy2Q8IkMQlQTS1HLh5qEnN_">
                <VoteForServer serverId={data?.server?.id} />
              </GoogleReCaptchaProvider>
            </div>
            <ServerNameWrapper>
              <h1 {...loadingComponent}>{data?.server?.name}</h1>
            </ServerNameWrapper>
          </OverImageContentWrapper>
        </OverImageWrapper>
      </ImageWrapper>
      <ContentWrapper style={{ paddingTop: 16 }}>
        <Row>
          <Col sm={4}>
            <p {...loadingComponent}>
              Chronicle: <Tag>{data?.server?.chronicle?.name}</Tag>
            </p>
          </Col>
          <Col sm={8}>
            <Rates rates={data?.server?.rates} displayIcons />
          </Col>
        </Row>

        <p {...loadingComponent}>Added by: {authorName}</p>
        <p {...loadingComponent}>{data?.server?.description}</p>
        <div>
          {currentUser?.id === data?.server?.addedBy?.id && (
            <Button
              icon="trash"
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
            </Button>
          )}
        </div>
      </ContentWrapper>
    </DetailWrapper>
  )
}

export default ServerDetail
