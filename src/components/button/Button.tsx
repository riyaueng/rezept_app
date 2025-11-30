import { Link } from "react-router"

interface ButtonProps {
  text: string
  link: string
  style?: string
  type?: string
  onClick?: () => void | Promise<void>
}

/* button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #ffdb63;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #ffdb63;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
} */

export default function Button(props: ButtonProps) {
  return (
    <Link
      type={props.type}
      to={props.link}
      onClick={props.onClick}
      className={`${props.style} bg-orange-primary text-blue-white font-buttons text-sm tracking-wider rounded-tl-none rounded-full border-solid border-[1px] border-transparent py-3 px-6`}>
      {props.text}
    </Link>
  )
}
