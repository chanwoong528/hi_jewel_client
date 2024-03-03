import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";

import Cookies from 'js-cookie';

import { useGetUser } from "@/http/service/queries";
import { useClearUser } from "@/http/service/mutations";

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

const Navbar = () => {


  if (!Cookies.get('access_token') && !Cookies.get('refresh_token')) useClearUser();
  const userQuery = useGetUser();
  if (userQuery.isLoading) return <div>loading...</div>

  // if (userQuery.isStale) userQuery.refetch();

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
                userQuery.data?.data.role === "admin" ? <li>
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
    <nav>
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
          !!(userQuery.data?.data.role === "admin") ? <li>
            <Button asChild variant="ghost">
              <Link to={"/admin"}>ADMIN</Link>
            </Button>
          </li> : null
        }
        {
          !userQuery.data?.data.id ? <li>
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