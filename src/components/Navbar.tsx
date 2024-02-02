import { Link } from "react-router-dom";
import { PAGE_LIST } from '../utils/CONSTANT'

import "./navbar.module.scss"

const Navbar = () => {
  return (
    <nav>
      <ul>
        {PAGE_LIST.map((page) => {
          return <li key={"nav-" + page.label}>
            <Link to={page.url}>{page.label}</Link>
          </li>
        })}
      </ul>
    </nav>
  )
}

export default Navbar