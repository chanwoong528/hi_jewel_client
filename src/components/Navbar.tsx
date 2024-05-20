import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import { ImInstagram } from "react-icons/im";

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { GET_user } from "@/http/fetchApi/userApi";
import { PATCH_stats, StatType } from "@/http/fetchApi/statsApi";
import useUserStore from "../store/userStore";

import usePathname from "@/hooks/usePathname";
import { formatDateYYYYMMDD } from "@/utils/utilsFunction";

import { PAGE_LIST } from '../utils/CONSTANT'
import logo from "../assets/image/logo.png"


import "./navbar.module.scss"

const Navbar = () => {
  const navigation = useNavigate();
  const pathname = usePathname();
  const { updateUser, resetUser } = useUserStore();

  useEffect(() => {
    const fetchGetUser = () => {
      GET_user().then((result) => {
        updateUser(result.data)
      }).catch(() => {
        if (pathname === "/admin") {
          navigation("/login")
        }
        resetUser();
      })
    }
    fetchGetUser();
  }, [pathname])



  if (isMobileOnly) {
    return (
      <NavigationMenu className="justify-between max-w-full py-2 z-50 border-b-2 border-gray-400">
        <Button asChild variant="ghost">
          <Link to={"/"}>
            <img
              className="max-w-40"
              src={logo} alt="HI_JEWEL"
            />
          </Link>
        </Button>
        <NavigationMenuList >
          <NavigationMenuItem >
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="list-none">
              <ul className="flex-col">
                {PAGE_LIST.filter(page => !page.adminRequired && !!page.show).map((page) => {
                  return <li key={"nav-" + page.label}>
                    <Button variant="ghost">
                      <Link to={page.url}>{page.label}</Link>
                    </Button>
                  </li>
                })}
                <li>
                  <Button
                    asChild
                    variant="link"
                    onClick={() =>
                      PATCH_stats({
                        date: formatDateYYYYMMDD(),
                        type: StatType.instaClick,
                        productId: null
                      })
                    }>
                    <a
                      className="flex items-center"
                      href="https://www.instagram.com/hi_jewel_official?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
                      target="_blank"
                    >
                      <ImInstagram size={"1.2rem"} />
                      <span className="ml-1">INSTA(hi_jewel_official)</span>
                    </a>
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>)
  }


  return (
    <nav className="max-w-[1240px] px-2 py-4 mb-4 border-b-2 border-gray-400">
      <Button
        asChild variant="ghost">
        <Link to={"/"}>
          <img
            className="max-w-40"
            src={logo} alt="HI_JEWEL"
          />

        </Link>
      </Button>
      <ul>

        {PAGE_LIST.filter(page => !page.adminRequired && page.loginRequired && !!page.show).map((page) => {
          return <li key={"nav-" + page.label}>
            <Button asChild variant="ghost">
              <Link to={page.url}>{page.label}</Link>
            </Button>
          </li>
        })}
        <li>
          <Button
            asChild
            variant="link"
            onClick={() =>
              PATCH_stats({
                date: formatDateYYYYMMDD(),
                type: StatType.instaClick,
                productId: null
              })
            }>
            <a
              className="flex items-center"
              href="https://www.instagram.com/hi_jewel_official?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
              target="_blank"
            >
              <ImInstagram size={"1.2rem"} />
              <span className="ml-1">INSTA(hi_jewel_official)</span>
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar