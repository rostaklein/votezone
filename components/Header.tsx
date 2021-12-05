import { Button } from "@blueprintjs/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAppState } from "./context"
import Logout from "./Logout"

// function isActive(pathname) {
//   return (
//     typeof document !== "undefined" && document.location.pathname === pathname
//   )
// }

const Header = () => {
  const router = useRouter()
  const { currentUser } = useAppState()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Blog
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>Drafts</a>
        </Link>
      </div>
      <div className="right">
        {currentUser?.name ? (
          <>
            <h4>
              Welcome {currentUser.name} <Logout />
            </h4>
            <Link href="/create" passHref>
              <Button intent="primary">+ Create draft </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup" passHref>
              <Button outlined={isActive("/signup")}>Sign up</Button>
            </Link>{" "}
            <Link href="/login" passHref>
              <Button outlined={isActive("/login")}>Log In</Button>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }
      `}</style>
    </nav>
  )
}

export default Header
