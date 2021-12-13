import { Menu as BlueprintMenu, MenuDivider, MenuItem } from "@blueprintjs/core"
import Link from "next/link"
import styled from "styled-components"

const StyledMenu = styled(BlueprintMenu)`
  background: rgb(255 255 255 / 42%);
  border-right: solid 1px #dedede;
  box-shadow: inset -5px 0 7px #dcdcdc80;
  padding: 8px 12px;
  margin-right: 4px;
`

export const Menu: React.FC = () => {
  return (
    <StyledMenu>
      <MenuDivider title="Servers" />
      <Link href="/" passHref>
        <MenuItem icon="chart" text="Top Rated" />
      </Link>
      <MenuDivider />
      <MenuItem icon="calendar" text="Upcoming Servers" />
      <MenuItem icon="filter" text="Find Server" />
      <Link href="/create" passHref>
        <MenuItem icon="new-link" text="Add Server" />
      </Link>
      <MenuDivider title="Users" />
      <Link href="/register" passHref>
        <MenuItem icon="new-person" text="Register" />
      </Link>
      <Link href="/login" passHref>
        <MenuItem icon="log-in" text="Log In" />
      </Link>
    </StyledMenu>
  )
}
