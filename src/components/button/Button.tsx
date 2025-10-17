import { Link } from "react-router"

interface ButtonProps {
  text: string
  link: string
  onClick?: () => void | Promise<void>
}
export default function Button(props: ButtonProps) {
  return (
    <Link to={props.link} onClick={props.onClick}>
      {props.text}
    </Link>
  )
}
