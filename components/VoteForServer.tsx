import {
  Button,
  Classes,
  FormGroup,
  Icon,
  Spinner,
  Tag,
} from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { Col, Row } from "react-grid-system"
import { useAppState } from "./context"
import styled from "styled-components"
import gql from "graphql-tag"
import {
  useVoteForServerMutation,
  useVoteStatusQuery,
} from "../generated/gql-client"
import { DateTime, Duration } from "luxon"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useInterval } from "./hooks/useInterval"

gql`
  query VoteStatus {
    voteStatus {
      votedAlready
      lastVotedAt
      ip
      server {
        id
      }
    }
  }
`

gql`
  mutation VoteForServer($server: ID!) {
    vote(server: $server) {
      id
      ip
      server {
        id
        name
      }
    }
  }
`

const Wrapper = styled(FormGroup)`
  text-shadow: 0 0 20px white, 0 0 5px white;
  text-align: center;
`

type Props = {
  serverId?: string | null
}

export const VoteForServer: React.FC<Props> = ({ serverId }) => {
  const {
    data,
    loading,
    refetch: refetchVoteStatus,
  } = useVoteStatusQuery({
    fetchPolicy: "cache-and-network",
  })
  const [registerVote] = useVoteForServerMutation()
  const [voteAgainIn, setVoteAgainIn] = useState<Duration>()
  const [votedAlready, setVotedAlready] = useState<boolean>(
    data?.voteStatus?.votedAlready ?? false
  )

  const getVoteAgainIn = useCallback(() => {
    return DateTime.fromISO(data?.voteStatus?.lastVotedAt)
      .plus({ hours: 12 })
      .diffNow(["hours", "minutes", "seconds"])
  }, [data?.voteStatus?.lastVotedAt])

  useInterval(
    () => {
      if (getVoteAgainIn().toMillis() <= 0) {
        setVotedAlready(false)
      }
      setVoteAgainIn(getVoteAgainIn())
    },
    votedAlready ? 1000 : null
  )

  const label = useMemo(() => {
    if (!voteAgainIn) {
      return null
    }
    return (
      <>
        You can vote again in <Icon icon="time" style={{ marginRight: 6 }} />
        <b>
          {voteAgainIn.hours} hours, {Math.ceil(voteAgainIn.minutes)} minutes,{" "}
          {Math.ceil(voteAgainIn.seconds)} seconds
        </b>
      </>
    )
  }, [voteAgainIn])

  useEffect(() => {
    setVoteAgainIn(getVoteAgainIn())
    setVotedAlready(data?.voteStatus?.votedAlready ?? false)
  }, [data?.voteStatus?.votedAlready, getVoteAgainIn])

  if (!serverId || loading) {
    return <Spinner />
  }

  const buttonClickHandler = () => {
    registerVote({
      variables: {
        server: serverId,
      },
      onCompleted: () => {
        refetchVoteStatus()
      },
    })
  }

  if (!votedAlready) {
    return (
      <Wrapper label="You can vote every 12 hours!">
        <Button
          large
          intent="success"
          icon="thumbs-up"
          onClick={buttonClickHandler}
        >
          Vote for this server
        </Button>
      </Wrapper>
    )
  }

  const votedForCurrent = data?.voteStatus?.server?.id === serverId

  return (
    <Wrapper label={label}>
      <Button
        large
        intent="success"
        icon={votedForCurrent ? "thumbs-up" : "thumbs-down"}
        disabled
        style={{ backgroundColor: "rgb(179 179 179)" }}
      >
        {votedForCurrent
          ? "Already voted for this server"
          : "Already voted for different server"}
      </Button>
    </Wrapper>
  )
}
