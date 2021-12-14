import { ContentWrapper } from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import {
  ServersTableDataFragment,
  useApprovedServersQuery,
} from "../generated/gql-client"
import {
  Button,
  HTMLTable,
  Icon,
  Spinner,
  Tag,
  Tooltip,
} from "@blueprintjs/core"
import { DateTime } from "luxon"
import styled from "styled-components"
import { Rates } from "../components/Rates"
import { useMemo } from "react"

gql`
  fragment ServersTableData on Server {
    id
    name
    description
    addedBy {
      name
    }
    chronicle {
      id
      shortcut
      name
    }
    rates {
      ...Rates
    }
    openingAt
    voteCount
    createdAt
  }
`

const StyledServerNameTd = styled.td``

const StyledTr = styled.tr``

const StyledTable = styled(HTMLTable)`
  width: 100%;
  min-width: 600px;
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

type Props = {
  servers?: Array<ServersTableDataFragment | undefined | null>
  lastColumn: "opening" | "votes"
}

export const ServersTable: React.FC<Props> = ({ servers, lastColumn }) => {
  const lastColumnComponents = useMemo(() => {
    if (lastColumn === "opening") {
      return {
        heading: <>Grand Opening</>,
        component: (server: ServersTableDataFragment) => (
          <Tooltip
            content={DateTime.fromISO(server.openingAt).toFormat("DDD TTT")}
            placement="right"
          >
            <span style={{ fontSize: 12 }}>
              {server.openingAt &&
                DateTime.fromISO(server.openingAt).toRelativeCalendar()}
            </span>
          </Tooltip>
        ),
      }
    }
    if (lastColumn === "votes") {
      return {
        heading: <>Votes</>,
        component: (server: ServersTableDataFragment) => (
          <>{server.voteCount}</>
        ),
      }
    }
  }, [])
  return (
    <StyledTable bordered condensed>
      <thead>
        <StyledTr>
          <th></th>
          <StyledServerNameTd as="th">Server</StyledServerNameTd>
          <th>Rates</th>
          <th>{lastColumnComponents?.heading}</th>
        </StyledTr>
      </thead>
      <tbody>
        {servers?.map(
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
                      <Tag minimal title={server.chronicle?.name ?? undefined}>
                        {server.chronicle?.shortcut}
                      </Tag>
                    </Button>
                  </Link>
                </StyledServerNameTd>
                <td>{server.rates && <Rates rates={server.rates} />}</td>
                <td>{lastColumnComponents?.component(server)}</td>
              </StyledTr>
            )
        )}
      </tbody>
    </StyledTable>
  )
}

export default ServersTable
