import { Link, useNavigate } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import useUserStore from "../store/userStore";

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { PAGE_LIST } from '../utils/CONSTANT'

import "./navbar.module.scss"
import { useEffect } from "react";
import { GET_user } from "@/http/fetchApi/userApi";

import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigation = useNavigate();
  const { userInfo, updateUser, resetUser } = useUserStore();

  useEffect(() => {
    const fetchGetUser = () => {
      GET_user().then((result) => {
        updateUser(result.data)
      }).catch(() => {
        if (location.pathname === "/admin") {
          navigation("/login")
        }
        resetUser();
      })
    }
    fetchGetUser();
  }, [location.pathname === "/admin"])



  if (isMobileOnly) {
    return (
      <NavigationMenu className="justify-between max-w-full">
        <Button asChild variant="ghost">
          <Link to={"/"}>HI Jewel</Link>
        </Button>
        <NavigationMenuList >
          <NavigationMenuItem >
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="list-none">

              {PAGE_LIST.filter(page => !page.adminRequired).map((page) => {
                return <li key={"nav-" + page.label}>
                  <Button asChild variant="ghost">
                    <Link to={page.url}>{page.label}</Link>
                  </Button>
                </li>
              })}
              {
                userInfo.userRole === "admin" ? <li>
                  <Button asChild variant="ghost">
                    <Link to={"/admin"}>Admin</Link>
                  </Button>
                </li> : null
              }
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>)
  }


  return (
    <nav className="max-w-[1200px]">
      <Button asChild variant="ghost">
        <Link to={"/"}>HI Jewel</Link>
      </Button>
      <ul>

        {PAGE_LIST.filter(page => !page.adminRequired && page.loginRequired).map((page) => {
          return <li key={"nav-" + page.label}>
            <Button asChild variant="ghost">
              <Link to={page.url}>{page.label}</Link>
            </Button>
          </li>
        })}
        {
          !!(userInfo.userRole === "admin") ? <li>
            <Button asChild variant="ghost">
              <Link to={"/admin"}>ADMIN</Link>
            </Button>
          </li> : null
        }
        {
          !userInfo.userId ? <li>
            <Button asChild variant="ghost">
              <Link to={"/login"}>LOGIN</Link>
            </Button>
          </li> : null
        }
      </ul>
    </nav>
  )
}

export default Navbar