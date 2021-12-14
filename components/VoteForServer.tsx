import { Button, Classes, FormGroup, Spinner, Tag } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { Col, Row } from "react-grid-system"
import { useAppState } from "./context"
import styled from "styled-components"

const Wrapper = styled(FormGroup)`
  text-shadow: 0 0 20px white, 0 0 5px white;
`

type Props = {
  serverId?: string | null
}

export const VoteForServer: React.FC<Props> = ({ serverId }) => {
  //   const router = useRouter()
  //   const { currentUser, ip } = useAppState()

  if (!serverId) {
    return <Spinner />
  }

  return (
    <Wrapper label="You can vote every 12 hours!">
      <Button large intent="success" icon="thumbs-up">
        Vote for this server
      </Button>
    </Wrapper>
  )
}
