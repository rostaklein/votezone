import {
  Button,
  Drawer,
  DrawerSize,
  Menu as BlueprintMenu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import Router from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppState } from "./context"

const StyledMenu = styled(BlueprintMenu)`
  background: rgb(255 255 255 / 42%);
  border-right: solid 1px #dedede;
  box-shadow: inset -5px 0 7px #dcdcdc80;
  padding: 8px 12px;
`

const MenuItems: React.FC = () => {
  const { currentUser } = useAppState()
  const dispatch = useAppDispatch()
  const logOut = () => {
    Router.push("/login")
    dispatch({
      type: "SET_CURRENT_USER",
      user: null,
    })
    Cookies.remove("auth-token")
  }
  return (
    <>
      <MenuDivider title="Servers" />
      <Link href="/" passHref>
        <MenuItem icon="chart" text="Top Rated" />
      </Link>
      <MenuDivider />
      <Link href="/upcoming" passHref>
        <MenuItem icon="calendar" text="Upcoming Servers" />
      </Link>
      <MenuItem icon="filter" text="Find Server" />
      <Link href="/create" passHref>
        <MenuItem icon="new-link" text="Add Server" />
      </Link>
      {currentUser ? (
        <>
          <MenuDivider title={currentUser.name} />
          <Link href="/profile" passHref>
            <MenuItem icon="user" text="Profile"></MenuItem>
          </Link>
          <Link href="/my-servers" passHref>
            <MenuItem icon="list-detail-view" text="My Servers"></MenuItem>
          </Link>
          <MenuItem icon="log-out" text="Log Out" onClick={logOut}></MenuItem>
        </>
      ) : (
        <>
          <MenuDivider title="Users" />
          <Link href="/register" passHref>
            <MenuItem icon="new-person" text="Register" />
          </Link>
          <Link href="/login" passHref>
            <MenuItem icon="log-in" text="Log In" />
          </Link>
        </>
      )}
    </>
  )
}

export const DesktopMenu: React.FC = () => {
  return (
    <StyledMenu>
      <MenuItems />
    </StyledMenu>
  )
}

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        icon="menu"
        large
        style={{ marginTop: -18, float: "right" }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        style={{ width: "auto" }}
      >
        <BlueprintMenu
          onClick={() => setIsOpen(false)}
          large
          style={{ paddingLeft: 12, paddingRight: 24 }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              src="/votezone_logo.svg"
              alt="Votezone logo"
              height={80}
              width={160}
              layout="fixed"
            />
          </div>
          <MenuItems />
        </BlueprintMenu>
      </Drawer>
    </>
  )
}
