import { NavLink } from "react-router"

interface BtnCategoryProps {
  text: string
  link: string
  onClick: () => void | Promise<void>
}

export default function BtnCategory(props: BtnCategoryProps) {
  return (
    <NavLink to={props.link} onClick={props.onClick}>
      {props.text}
    </NavLink>
  )
}
